"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Sparkles,
    Upload,
    Image as ImageIcon,
    Video,
    Type,
    Music,
    Download,
    Share2,
    ChevronRight,
    Search,
    Play,
    Pause,
    RefreshCw,
    CheckCircle2,
    Instagram,
    Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const mockProperties = [
    {
        id: 1,
        title: "Villa Sol y Mar",
        location: "La Barra",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400",
        price: "USD 850.000"
    },
    {
        id: 2,
        title: "Apartamento Mansa",
        location: "Punta del Este",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400",
        price: "USD 450.000"
    },
    {
        id: 3,
        title: "Chacra Marítima",
        location: "José Ignacio",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400",
        price: "USD 2.150.000"
    }
]

export default function CreativeStudioPage() {
    const [selectedProperty, setSelectedProperty] = useState(mockProperties[0])
    const [isGenerating, setIsGenerating] = useState(false)
    const [agencyLogo, setAgencyLogo] = useState<string | null>(null)
    const [prompt, setPrompt] = useState("")
    const [activeFormat, setActiveFormat] = useState("reel")
    const [isPlaying, setIsPlaying] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setAgencyLogo(url)
            toast.success("Logo de agencia cargado correctamente")
        }
    }

    const startGeneration = () => {
        if (!prompt.trim()) {
            toast.error("Por favor, ingresa instrucciones para la IA")
            return
        }
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            toast.success("¡Video generado con éxito!", {
                description: "La IA ha optimizado el contenido para " + (activeFormat === 'reel' ? 'Reels' : 'Post de Feed')
            })
            setIsPlaying(true)
        }, 3000)
    }

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-4">
            {/* Sidebar: Assets & Config */}
            <div className="w-80 flex flex-col gap-4">
                {/* Logo Section */}
                <Card className="glass-card border-none bg-white/5">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Upload className="w-4 h-4 text-amber-500" />
                                Branding
                            </h3>
                            {agencyLogo && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-[10px]"
                                    onClick={() => setAgencyLogo(null)}
                                >
                                    Eliminar
                                </Button>
                            )}
                        </div>

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${agencyLogo ? "border-amber-500/50 bg-amber-500/5" : "border-white/10 hover:border-white/20"
                                }`}
                        >
                            {agencyLogo ? (
                                <img src={agencyLogo} alt="Agency Logo" className="h-12 object-contain" />
                            ) : (
                                <>
                                    <div className="p-2 rounded-full bg-white/5">
                                        <Upload className="w-5 h-5 text-white/40" />
                                    </div>
                                    <p className="text-[10px] text-white/40 text-center">Sube tu logo (PNG/SVG)</p>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleLogoUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Property Picker */}
                <Card className="glass-card border-none bg-white/5 flex-1 overflow-hidden">
                    <CardContent className="p-4 flex flex-col h-full gap-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-purple-500" />
                            Propiedades
                        </h3>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                                placeholder="Buscar propiedad..."
                                className="pl-8 bg-black/20 border-white/5 h-8 text-xs"
                            />
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="space-y-2 pr-4">
                                {mockProperties.map((prop) => (
                                    <button
                                        key={prop.id}
                                        onClick={() => setSelectedProperty(prop)}
                                        className={`w-full p-2 rounded-lg flex items-center gap-3 transition-all text-left ${selectedProperty.id === prop.id
                                            ? "bg-amber-500/20 border border-amber-500/30"
                                            : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >
                                        <img src={prop.image} className="w-12 h-12 rounded bg-stone-900 object-cover" />
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-white truncate">{prop.title}</p>
                                            <p className="text-[10px] text-white/40 truncate">{prop.location}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex flex-col gap-4">
                {/* Format Tabs */}
                <div className="flex items-center justify-between">
                    <Tabs defaultValue="reel" onValueChange={setActiveFormat} className="w-auto">
                        <TabsList className="bg-white/5 border border-white/10 p-1">
                            <TabsTrigger value="reel" className="gap-2 data-[state=active]:bg-amber-500">
                                <Smartphone className="w-4 h-4" />
                                Reel / TikTok
                            </TabsTrigger>
                            <TabsTrigger value="post" className="gap-2 data-[state=active]:bg-amber-500">
                                <Instagram className="w-4 h-4" />
                                Carousel / Post
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="glass bg-white/5 text-xs gap-2"
                            onClick={() => toast.info("Link de previsualización copiado al portapapeles")}
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </Button>
                        <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs gap-2"
                            onClick={() => toast.success("Iniciando descarga del activo generado", {
                                description: "Tu video se guardará en descargas en formato MP4."
                            })}
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </div>
                </div>

                {/* Preview Canvas */}
                <Card className="flex-1 glass-card border-none bg-black/40 relative overflow-hidden flex items-center justify-center">
                    {/* Simulated Phone Frame */}
                    <div className={`relative transition-all duration-500 ${activeFormat === 'reel' ? "aspect-[9/16] h-[90%]" : "aspect-square h-[80%]"
                        } rounded-[2rem] border-8 border-stone-800 shadow-2xl overflow-hidden bg-stone-900`}>

                        {/* Content Area */}
                        <div className="relative w-full h-full">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`${selectedProperty.id}-${activeFormat}`}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: isPlaying ? 1.05 : 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        opacity: { duration: 0.4 },
                                        scale: { duration: 5, repeat: Infinity, repeatType: "reverse" }
                                    }}
                                    src={selectedProperty.image}
                                    className="w-full h-full object-cover grayscale-[0.2]"
                                />
                            </AnimatePresence>

                            {/* UI Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                            {/* AI Watermark */}
                            <div className="absolute top-8 left-6 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span className="text-[10px] font-bold text-white tracking-widest uppercase">Created by Punta360 AI</span>
                            </div>

                            {/* Agency Logo Overlay */}
                            {agencyLogo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-6 right-6"
                                >
                                    <img src={agencyLogo} alt="Logo" className="h-8 object-contain drop-shadow-lg" />
                                </motion.div>
                            )}

                            {/* Property Details Overlay */}
                            <div className="absolute bottom-10 left-6 right-6 space-y-2">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h2 className="text-2xl font-black text-white leading-none uppercase italic">{selectedProperty.title}</h2>
                                    <p className="text-amber-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                        {selectedProperty.location}
                                        <span className="w-1 h-1 rounded-full bg-white/40" />
                                        {selectedProperty.price}
                                    </p>
                                </motion.div>
                                <div className="h-1 w-12 bg-amber-500" />
                            </div>

                            {/* Social Icons (Mock) */}
                            <div className="absolute bottom-10 right-6 flex flex-col gap-4 text-white">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <Play className="w-4 h-4 fill-white text-white" />
                                    </div>
                                    <span className="text-[9px] font-bold">LIVE</span>
                                </div>
                            </div>
                        </div>

                        {/* Loading Overlay */}
                        <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-4"
                                >
                                    <div className="relative">
                                        <RefreshCw className="w-12 h-12 text-amber-500 animate-spin" />
                                        <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-white animate-pulse" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-white font-bold tracking-widest uppercase">AI en acción...</h3>
                                        <p className="text-[10px] text-white/40">Componiendo música y aplicando filtros cinemáticos</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Editor Controls Overlay */}
                    <div className="absolute bottom-8 flex gap-4">
                        <Button
                            onClick={() => setIsPlaying(!isPlaying)}
                            variant="outline"
                            className="rounded-full h-12 w-12 border-white/20 bg-white/10 backdrop-blur-xl text-white hover:bg-white/20"
                        >
                            {isPlaying ? <Pause className="fill-white" /> : <Play className="fill-white" />}
                        </Button>
                    </div>
                </Card>

                {/* AI Console */}
                <div className="h-32 bg-stone-950 rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                    <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white/40 flex items-center gap-2">
                            <Bot className="w-3 h-3" />
                            AI COMMAND CONSOLE
                        </span>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-[9px] border-white/10 text-white/60">LUT: Cinematic</Badge>
                            <Badge variant="outline" className="text-[9px] border-white/10 text-white/60">Music: Minimalist</Badge>
                        </div>
                    </div>
                    <div className="flex-1 p-4 flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <Input
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Escribe instrucciones: 'Haz un Reel de lujo para inversionistas enfocándose en la vista al mar...'"
                                className="bg-transparent border-none text-white placeholder:text-white/20 h-full focus-visible:ring-0 text-lg italic"
                            />
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 flex gap-2">
                                <Music className="w-4 h-4 text-white/20 hover:text-amber-500 cursor-pointer transition-colors" />
                                <Type className="w-4 h-4 text-white/20 hover:text-amber-500 cursor-pointer transition-colors" />
                            </div>
                        </div>
                        <Button
                            onClick={startGeneration}
                            disabled={isGenerating}
                            className="bg-amber-500 hover:bg-amber-600 text-black font-black px-6 h-12 rounded-xl group"
                        >
                            {isGenerating ? "GENERANDO..." : "GENERAR CON IA"}
                            <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Bot({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}
