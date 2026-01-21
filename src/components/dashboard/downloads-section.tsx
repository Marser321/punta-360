"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    Download,
    FileImage,
    FileVideo,
    FolderOpen,
    Eye,
    Calendar,
    CheckCircle2,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface DownloadableFile {
    id: string
    name: string
    type: 'image' | 'video' | 'folder'
    size: string
    property: string
    date: string
    thumbnail?: string
    downloadUrl: string
}

// Mock data for demo
const mockFiles: DownloadableFile[] = [
    {
        id: "1",
        name: "Pack Completo - Villa Sol y Mar",
        type: "folder",
        size: "2.4 GB",
        property: "Villa Sol y Mar",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        downloadUrl: "#"
    },
    {
        id: "2",
        name: "Tour360_VillaSolYMar.zip",
        type: "folder",
        size: "890 MB",
        property: "Villa Sol y Mar",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=100&fit=crop",
        downloadUrl: "#"
    },
    {
        id: "3",
        name: "Drone_Aereo_4K.mp4",
        type: "video",
        size: "1.2 GB",
        property: "Villa Sol y Mar",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1600596542815-60c37c663045?w=100&h=100&fit=crop",
        downloadUrl: "#"
    },
    {
        id: "4",
        name: "Fotos_HDR_20.zip",
        type: "image",
        size: "340 MB",
        property: "Villa Sol y Mar",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop",
        downloadUrl: "#"
    }
]

const fileTypeConfig = {
    image: { icon: FileImage, color: "text-blue-500" },
    video: { icon: FileVideo, color: "text-purple-500" },
    folder: { icon: FolderOpen, color: "text-amber-500" }
}

export function DownloadsSection() {
    const [files, setFiles] = useState<DownloadableFile[]>(mockFiles)
    const [downloadingId, setDownloadingId] = useState<string | null>(null)

    const handleDownload = async (file: DownloadableFile) => {
        setDownloadingId(file.id)

        // Simulate download delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // In real implementation, would trigger actual download from Supabase Storage
        setDownloadingId(null)

        // Show success toast
        const { toast } = await import("sonner")
        toast.success(`Descargando ${file.name}`)
    }

    if (files.length === 0) {
        return (
            <Card className="glass-card border-none rounded-2xl">
                <CardContent className="py-12 text-center">
                    <Download className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No hay material disponible para descargar</p>
                    <p className="text-sm text-muted-foreground/60 mt-2">
                        Los archivos aparecerán aquí cuando tus pedidos estén completados
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="glass-card border-none rounded-2xl overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-green-500" />
                    Material Listo para Descargar
                    <Badge className="ml-2 bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30" variant="outline">
                        {files.length} archivos
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {files.map((file, index) => {
                        const typeConfig = fileTypeConfig[file.type]
                        const FileIcon = typeConfig.icon

                        return (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                            >
                                {/* Thumbnail or Icon */}
                                <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                                    {file.thumbnail ? (
                                        <img
                                            src={file.thumbnail}
                                            alt={file.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FileIcon className={`h-7 w-7 ${typeConfig.color}`} />
                                    )}
                                </div>

                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground truncate">{file.name}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-muted-foreground">{file.size}</span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(file.date), "d MMM yyyy", { locale: es })}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => handleDownload(file)}
                                        disabled={downloadingId === file.id}
                                        className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600"
                                    >
                                        {downloadingId === file.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Download className="h-4 w-4 mr-1" />
                                                Descargar
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Download All Button */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <Button variant="outline" className="w-full">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Descargar Todo ({files.reduce((acc, f) => acc + parseFloat(f.size), 0).toFixed(1)} GB)
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
