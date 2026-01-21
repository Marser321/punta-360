"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Upload, X, Image as ImageIcon, Loader2, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedImage {
    id?: string
    url: string
    thumbnail_url?: string
    title?: string
    position: number
    file?: File
    uploading?: boolean
    progress?: number
}

interface ImageUploaderProps {
    propertyId: string
    assetType: "image" | "360_url"
    existingImages?: UploadedImage[]
    onImagesChange: (images: UploadedImage[]) => void
    maxImages?: number
    acceptHint?: string
}

export function ImageUploader({
    propertyId,
    assetType,
    existingImages = [],
    onImagesChange,
    maxImages = 20,
    acceptHint = "JPG, PNG, WebP hasta 50MB"
}: ImageUploaderProps) {
    const [images, setImages] = useState<UploadedImage[]>(existingImages)
    const [uploading, setUploading] = useState(false)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length > maxImages) {
            toast.error(`Máximo ${maxImages} imágenes permitidas`)
            return
        }

        // Create preview items
        const newImages: UploadedImage[] = acceptedFiles.map((file, index) => ({
            url: URL.createObjectURL(file),
            position: images.length + index,
            file,
            uploading: true,
            progress: 0
        }))

        const updatedImages = [...images, ...newImages]
        setImages(updatedImages)
        onImagesChange(updatedImages)

        // Upload each file
        setUploading(true)
        for (let i = 0; i < newImages.length; i++) {
            const image = newImages[i]
            const file = image.file!
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const folder = assetType === "360_url" ? "360" : "gallery"
            const filePath = `${propertyId}/${folder}/${fileName}`

            try {
                const { error: uploadError } = await supabase.storage
                    .from('property-media')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false
                    })

                if (uploadError) throw uploadError

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('property-media')
                    .getPublicUrl(filePath)

                // Insert into media_assets
                const { data: insertedAsset, error: dbError } = await supabase
                    .from('media_assets')
                    .insert({
                        property_id: propertyId,
                        asset_type: assetType,
                        url: publicUrl,
                        position: image.position,
                        is_featured: image.position === 0
                    })
                    .select()
                    .single()

                if (dbError) throw dbError

                // Update local state
                setImages(prev => prev.map(img =>
                    img.url === image.url
                        ? { ...img, id: insertedAsset.id, url: publicUrl, uploading: false }
                        : img
                ))
            } catch (error: any) {
                console.error('Upload error:', error)
                toast.error(`Error subiendo ${file.name}: ${error.message}`)
                // Remove failed upload from list
                setImages(prev => prev.filter(img => img.url !== image.url))
            }
        }
        setUploading(false)
        toast.success(`${newImages.length} imagen(es) subida(s)`)
    }, [images, propertyId, assetType, maxImages, onImagesChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
        },
        maxSize: 52428800, // 50MB
        disabled: uploading
    })

    const removeImage = async (imageToRemove: UploadedImage) => {
        if (imageToRemove.id) {
            // Delete from DB
            await supabase.from('media_assets').delete().eq('id', imageToRemove.id)
            // Try to delete from storage (extract path from URL)
            const urlParts = imageToRemove.url.split('/property-media/')
            if (urlParts[1]) {
                await supabase.storage.from('property-media').remove([urlParts[1]])
            }
        }
        const updatedImages = images.filter(img => img.url !== imageToRemove.url)
        setImages(updatedImages)
        onImagesChange(updatedImages)
        toast.success("Imagen eliminada")
    }

    const moveImage = (fromIndex: number, toIndex: number) => {
        const newImages = [...images]
        const [removed] = newImages.splice(fromIndex, 1)
        newImages.splice(toIndex, 0, removed)
        // Update positions
        const reorderedImages = newImages.map((img, idx) => ({ ...img, position: idx }))
        setImages(reorderedImages)
        onImagesChange(reorderedImages)
    }

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
                    isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-white/20 hover:border-white/40 hover:bg-white/5",
                    uploading && "opacity-50 cursor-not-allowed"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3">
                    {uploading ? (
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    ) : (
                        <Upload className="w-10 h-10 text-white/50" />
                    )}
                    <div>
                        <p className="text-white font-medium">
                            {isDragActive ? "Suelta las imágenes aquí" : "Arrastra imágenes o haz clic"}
                        </p>
                        <p className="text-white/50 text-sm">{acceptHint}</p>
                    </div>
                </div>
            </div>

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {images.map((image, index) => (
                        <div
                            key={image.url}
                            className={cn(
                                "relative group aspect-square rounded-xl overflow-hidden border border-white/10",
                                index === 0 && "ring-2 ring-amber-500"
                            )}
                        >
                            <img
                                src={image.url}
                                alt={image.title || `Imagen ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Uploading overlay */}
                            {image.uploading && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-white hover:bg-white/20"
                                    onClick={(e) => { e.stopPropagation(); removeImage(image) }}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Position badge */}
                            {index === 0 && (
                                <div className="absolute top-2 left-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                                    Portada
                                </div>
                            )}

                            {/* Drag handle */}
                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="w-5 h-5 text-white/70" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Counter */}
            <div className="flex justify-between items-center text-sm text-white/50">
                <span>{images.length} de {maxImages} imágenes</span>
                {images.length > 0 && (
                    <span className="text-amber-400">Primera imagen = Portada</span>
                )}
            </div>
        </div>
    )
}
