"use client"

import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode, Download, Share2 } from "lucide-react"
import { useRef } from "react"

interface PropertyQRProps {
    propertyId: string
    propertyTitle: string
    propertyUrl?: string
}

export function PropertyQR({ propertyId, propertyTitle, propertyUrl }: PropertyQRProps) {
    const qrRef = useRef<HTMLDivElement>(null)

    // Generate URL for the property
    const url = propertyUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${propertyId}`

    const handleDownload = () => {
        const svg = qrRef.current?.querySelector('svg')
        if (!svg) return

        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
            canvas.width = 400
            canvas.height = 400

            // White background
            ctx!.fillStyle = 'white'
            ctx!.fillRect(0, 0, 400, 400)

            // Draw QR
            ctx!.drawImage(img, 50, 50, 300, 300)

            // Add text
            ctx!.fillStyle = 'black'
            ctx!.font = 'bold 16px Inter, sans-serif'
            ctx!.textAlign = 'center'
            ctx!.fillText('Escanea para tour virtual', 200, 380)

            // Download
            const pngUrl = canvas.toDataURL('image/png')
            const downloadLink = document.createElement('a')
            downloadLink.href = pngUrl
            downloadLink.download = `QR-${propertyTitle.replace(/\s+/g, '-')}.png`
            downloadLink.click()
        }

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: propertyTitle,
                text: `Mira esta propiedad: ${propertyTitle}`,
                url: url
            })
        } else {
            navigator.clipboard.writeText(url)
            alert('Link copiado al portapapeles!')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-full glass">
                    <QrCode className="h-4 w-4" />
                    QR Code
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md glass-card border-none">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="gold-text">📱</span> Código QR
                    </DialogTitle>
                    <DialogDescription>
                        Imprime este QR para carteles o tarjetas. Los clientes escanean y ven el tour virtual.
                    </DialogDescription>
                </DialogHeader>

                <motion.div
                    className="flex flex-col items-center p-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                >
                    <div ref={qrRef} className="p-4 bg-white rounded-2xl shadow-lg">
                        <QRCodeSVG
                            value={url}
                            size={200}
                            level="H"
                            includeMargin
                            fgColor="#1a1a1a"
                            bgColor="#ffffff"
                        />
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 text-center">
                        {propertyTitle}
                    </p>

                    <div className="flex gap-3 mt-6">
                        <Button onClick={handleDownload} className="gap-2 rounded-full shadow-lg shadow-primary/20">
                            <Download className="h-4 w-4" />
                            Descargar PNG
                        </Button>
                        <Button onClick={handleShare} variant="outline" className="gap-2 rounded-full glass">
                            <Share2 className="h-4 w-4" />
                            Compartir
                        </Button>
                    </div>
                </motion.div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>💡 Pro Tip:</strong> Imprime el QR en alta calidad y colócalo en carteles de &quot;Se Vende&quot;.
                        Los interesados escanean y acceden al tour 360 sin necesidad de contactar primero.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
