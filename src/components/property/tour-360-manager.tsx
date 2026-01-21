"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
    Globe,
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Loader2,
    Navigation,
    Home,
    ChefHat,
    Bed,
    Bath,
    Sofa,
    Trees,
    Car,
    Eye,
    Upload,
    ImageIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Tour360Image {
    id?: string
    url: string
    room_name: string
    position: number
    uploading?: boolean
}

interface Tour360ManagerProps {
    propertyId: string
    existingImages?: Tour360Image[]
    onImagesChange: (images: Tour360Image[]) => void
}

const ROOM_PRESETS = [
    { name: "Sala de Estar", icon: Sofa },
    { name: "Cocina", icon: ChefHat },
    { name: "Dormitorio Principal", icon: Bed },
    { name: "Baño", icon: Bath },
    { name: "Jardín", icon: Trees },
    { name: "Garage", icon: Car },
    { name: "Entrada", icon: Home },
]

export function Tour360Manager({
    propertyId,
    existingImages = [],
    onImagesChange
}: Tour360ManagerProps) {
    const [images, setImages] = useState<Tour360Image[]>(existingImages)
    const [newUrl, setNewUrl] = useState("")
    const [newRoomName, setNewRoomName] = useState("")
    const [adding, setAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState("")

    // File upload state
    const [uploadingFile, setUploadingFile] = useState(false)

    // --- LOGIC FOR URL ADD ---
    const addFromUrl = async () => {
        if (!newUrl || !newRoomName) {
            toast.error("Ingresa URL y nombre de habitación")
            return
        }
        await saveImage(newUrl, newRoomName)
        setNewUrl("")
        setNewRoomName("")
    }

    // --- LOGIC FOR FILE UPLOAD ---
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        // If room name is empty, default to "Habitación 360"
        const roomNameByUser = newRoomName.trim() || `Panorama ${images.length + 1}`

        setUploadingFile(true)
        const file = acceptedFiles[0] // Single file upload logic for now to keep it simple per room

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `360-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `${propertyId}/360/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('property-media')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('property-media')
                .getPublicUrl(filePath)

            await saveImage(publicUrl, roomNameByUser)
            setNewRoomName("") // Clear room name after success
            toast.success("Imagen 360° subida correctamente")

        } catch (error: any) {
            console.error('Upload error:', error)
            toast.error(`Error subiendo imagen: ${error.message}`)
        } finally {
            setUploadingFile(false)
        }
    }, [propertyId, newRoomName, images.length])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
            'image/avif': ['.avif'] // some 360 cams use avif
        },
        maxFiles: 1, // One at a time to associate with room name
        disabled: uploadingFile || adding
    })

    // --- SHARED SAVE LOGIC ---
    const saveImage = async (url: string, name: string) => {
        setAdding(true)
        try {
            const { data: insertedAsset, error } = await supabase
                .from('media_assets')
                .insert({
                    property_id: propertyId,
                    asset_type: '360_url',
                    url: url,
                    room_name: name,
                    position: images.length,
                    is_featured: images.length === 0
                })
                .select()
                .single()

            if (error) throw error

            const newImage: Tour360Image = {
                id: insertedAsset.id,
                url: url,
                room_name: name,
                position: images.length
            }

            const updatedImages = [...images, newImage]
            setImages(updatedImages)
            onImagesChange(updatedImages)
        } catch (error: any) {
            toast.error(error.message)
            throw error // Propagate error if needed
        } finally {
            setAdding(false)
        }
    }

    const removeImage = async (image: Tour360Image) => {
        if (image.id) {
            await supabase.from('media_assets').delete().eq('id', image.id)

            // If it's a stored file, we should try to delete it too
            // Check if URL belongs to our storage
            if (image.url.includes('/property-media/')) {
                const urlParts = image.url.split('/property-media/')
                if (urlParts[1]) {
                    await supabase.storage.from('property-media').remove([urlParts[1]])
                }
            }
        }
        const updatedImages = images.filter(img => img.id !== image.id)
        const reorderedImages = updatedImages.map((img, idx) => ({ ...img, position: idx }))
        setImages(reorderedImages)
        onImagesChange(reorderedImages)
        toast.success("Habitación eliminada")
    }

    const saveRoomName = async (image: Tour360Image) => {
        if (image.id) {
            await supabase.from('media_assets').update({ room_name: editName }).eq('id', image.id)
        }
        setImages(prev => prev.map(img =>
            img.id === image.id ? { ...img, room_name: editName } : img
        ))
        setEditingId(null)
        toast.success("Nombre actualizado")
    }

    return (
        <div className="space-y-6">
            {/* Room List */}
            {images.length > 0 && (
                <div className="grid gap-3">
                    {images.map((image, index) => (
                        <Card
                            key={image.id || index}
                            className="bg-white/5 border-white/10 overflow-hidden"
                        >
                            <div className="flex items-center gap-4 p-4">
                                {/* Thumbnail */}
                                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex-shrink-0 relative group">
                                    <img
                                        src={image.url}
                                        alt={image.room_name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                    <div className="absolute top-1 left-1 bg-cyan-500/80 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
                                        360°
                                    </div>
                                    <a
                                        href={image.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Eye className="w-5 h-5 text-white" />
                                    </a>
                                </div>

                                {/* Room Name */}
                                <div className="flex-1 min-w-0">
                                    {editingId === image.id ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="h-8 glass-input"
                                                autoFocus
                                            />
                                            <Button size="icon" variant="ghost" onClick={() => saveRoomName(image)}>
                                                <Check className="w-4 h-4 text-green-400" />
                                            </Button>
                                            <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                                                <X className="w-4 h-4 text-red-400" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="border-white/20 text-white">
                                                {index + 1}
                                            </Badge>
                                            <span className="font-medium text-white truncate">{image.room_name}</span>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => { setEditingId(image.id!); setEditName(image.room_name) }}
                                            >
                                                <Edit2 className="w-3 h-3 text-white/50" />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-red-400 hover:bg-red-500/20"
                                    onClick={() => removeImage(image)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add New Room Section */}
            <Card className="bg-white/5 border-white/10 border-dashed">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Añadir Habitación al Tour
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 1. Select Room Name (Common for both methods) */}
                    <div>
                        <Label className="text-white/70 text-sm mb-2 block">1. Selecciona o escribe nombre de la habitación</Label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {ROOM_PRESETS.map((preset) => (
                                <Button
                                    key={preset.name}
                                    type="button"
                                    size="sm"
                                    variant={newRoomName === preset.name ? "default" : "outline"}
                                    className={cn(
                                        "rounded-full text-xs",
                                        newRoomName === preset.name
                                            ? "bg-cyan-500 text-black"
                                            : "border-white/20 text-white/70 hover:text-white"
                                    )}
                                    onClick={() => setNewRoomName(preset.name)}
                                >
                                    <preset.icon className="w-3 h-3 mr-1" />
                                    {preset.name}
                                </Button>
                            ))}
                        </div>
                        <Input
                            placeholder="Ej: Sala de Juegos..."
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            className="glass-input"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-2">
                        {/* Option A: Upload File */}
                        <div className="space-y-2">
                            <Label className="text-white/70 text-sm block">A. Subir Imagen 360°</Label>
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all h-32 flex flex-col items-center justify-center gap-2",
                                    isDragActive ? "border-cyan-500 bg-cyan-500/10" : "border-white/20 hover:border-white/40 hover:bg-white/5",
                                    uploadingFile && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <input {...getInputProps()} />
                                {uploadingFile ? (
                                    <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                                ) : (
                                    <Upload className="w-8 h-8 text-white/50" />
                                )}
                                <p className="text-xs text-white/70">
                                    {uploadingFile ? "Subiendo..." : "Arrastra o clic para subir"}
                                </p>
                            </div>
                        </div>

                        {/* Option B: Enter URL */}
                        <div className="space-y-2">
                            <Label className="text-white/70 text-sm block">B. Pegar URL Directa</Label>
                            <div className="flex flex-col gap-2 h-32 justify-end">
                                <Input
                                    placeholder="https://..."
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    className="glass-input"
                                />
                                <Button
                                    type="button"
                                    onClick={addFromUrl}
                                    disabled={adding || !newUrl || !newRoomName}
                                    className="w-full bg-cyan-900/50 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/30"
                                    variant="outline"
                                >
                                    {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
                                    Añadir URL
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tour Summary */}
            {images.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                    <div className="flex items-center gap-3">
                        <Navigation className="w-5 h-5 text-cyan-400" />
                        <span className="text-white font-medium">
                            Tour con {images.length} {images.length === 1 ? 'habitación' : 'habitaciones'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

