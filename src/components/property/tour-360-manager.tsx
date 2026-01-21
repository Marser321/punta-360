"use client"

import { useState, useEffect } from "react"
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
    Eye
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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const addImage = async () => {
        if (!newUrl || !newRoomName) {
            toast.error("Ingresa URL y nombre de habitación")
            return
        }

        setAdding(true)
        try {
            const { data: insertedAsset, error } = await supabase
                .from('media_assets')
                .insert({
                    property_id: propertyId,
                    asset_type: '360_url',
                    url: newUrl,
                    room_name: newRoomName,
                    position: images.length,
                    is_featured: images.length === 0
                })
                .select()
                .single()

            if (error) throw error

            const newImage: Tour360Image = {
                id: insertedAsset.id,
                url: newUrl,
                room_name: newRoomName,
                position: images.length
            }

            const updatedImages = [...images, newImage]
            setImages(updatedImages)
            onImagesChange(updatedImages)
            setNewUrl("")
            setNewRoomName("")
            toast.success(`${newRoomName} añadida al tour`)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setAdding(false)
        }
    }

    const removeImage = async (image: Tour360Image) => {
        if (image.id) {
            await supabase.from('media_assets').delete().eq('id', image.id)
        }
        const updatedImages = images.filter(img => img.id !== image.id)
        // Recalculate positions
        const reorderedImages = updatedImages.map((img, idx) => ({ ...img, position: idx }))
        setImages(reorderedImages)
        onImagesChange(reorderedImages)
        toast.success("Habitación eliminada del tour")
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
                                <div
                                    className="w-24 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex-shrink-0 cursor-pointer relative group"
                                    onClick={() => setPreviewUrl(image.url)}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.room_name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Eye className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="absolute top-1 left-1 bg-cyan-500/80 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
                                        360°
                                    </div>
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
                                    <p className="text-xs text-white/50 truncate mt-1">{image.url}</p>
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

            {/* Add New Room */}
            <Card className="bg-white/5 border-white/10 border-dashed">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Añadir Habitación al Tour
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Room Name Presets */}
                    <div>
                        <Label className="text-white/70 text-sm mb-2 block">Habitación</Label>
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
                            placeholder="O escribe un nombre personalizado..."
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            className="glass-input"
                        />
                    </div>

                    {/* URL Input */}
                    <div>
                        <Label className="text-white/70 text-sm mb-2 block">URL de Imagen 360° (Equirectangular)</Label>
                        <Input
                            placeholder="https://ejemplo.com/panorama-360.jpg"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="glass-input"
                        />
                        <p className="text-xs text-white/40 mt-1">
                            Formatos soportados: Insta360, GoPro, Ricoh Theta, o cualquier imagen equirectangular
                        </p>
                    </div>

                    {/* Quick Examples */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-white/40">Ejemplos:</span>
                        <button
                            type="button"
                            onClick={() => setNewUrl('https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/modern_buildings.jpg')}
                            className="text-xs text-cyan-400 hover:underline"
                        >
                            Modern Building
                        </button>
                        <button
                            type="button"
                            onClick={() => setNewUrl('https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/autumn_field_puresky.jpg')}
                            className="text-xs text-cyan-400 hover:underline"
                        >
                            Campo
                        </button>
                    </div>

                    <Button
                        type="button"
                        onClick={addImage}
                        disabled={adding || !newUrl || !newRoomName}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full"
                    >
                        {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
                        Añadir al Tour 360°
                    </Button>
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
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        Recorrido Conectado
                    </Badge>
                </div>
            )}

            {/* Preview Modal would go here */}
        </div>
    )
}
