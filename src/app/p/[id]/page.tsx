"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    MapPin,
    Bed,
    Bath,
    Square,
    Calendar,
    Share2,
    Heart,
    MessageCircle,
    ArrowLeft,
    Phone,
    Check,
    X,
    View
} from "lucide-react"
import { Viewer360 } from "@/components/property/viewer-360"

// Mock Data for Fallback
const MOCK_PROPERTY = {
    id: "mock-1",
    title: "Villa Manantiales Exclusiva",
    description: "Esta impresionante propiedad ofrece lo último en lujo y privacidad. Con vistas panorámicas al océano y acabados de primera clase, es el refugio perfecto para quienes buscan exclusividad. Incluye piscina climatizada, cine en casa y acceso directo a la playa.",
    address: "Calle Los Eucaliptos 234, Manantiales",
    price: 3100000,
    specs: { beds: 6, baths: 5, m2: 600 },
    year: 2024,
    features: ["Piscina Infinity", "Cine Privado", "Gimnasio", "Smart Home", "Seguridad 24/7", "Cava de Vinos"],
    agent: {
        name: "Alejandro Silva",
        role: "Senior Broker",
        phone: "+598 99 123 456",
        image: "AS"
    },
    images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
        "https://images.unsplash.com/photo-1600596542815-60c37c663045?w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
    ]
}

export default function PublicPropertyPage() {
    const params = useParams()
    const id = params?.id

    const [property, setProperty] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [mainImage, setMainImage] = useState("")
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [is360Open, setIs360Open] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    // Demo 360 scene
    const demo360Scenes = [{
        id: 'main',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000',
        name: 'Vista Principal',
        hotspots: []
    }]

    useEffect(() => {
        async function fetchProperty() {
            setLoading(true)
            // Try to fetch from Supabase if it's a UUID
            let data = null

            // Simple check if ID looks like UUID (flexible)
            if (id && typeof id === 'string' && id.length > 10) {
                const result = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (result.data) {
                    // Robust Data Normalization
                    data = {
                        id: result.data.id,
                        title: result.data.title || "Propiedad Sin Título",
                        description: result.data.description || "Sin descripción disponible.",
                        address: result.data.address || "Ubicación Privada",
                        // Ensure numerical values are numbers
                        price: Number(result.data.price) || 0,
                        specs: {
                            beds: Number(result.data.specs?.beds) || 0,
                            baths: Number(result.data.specs?.baths) || 0,
                            m2: Number(result.data.specs?.m2) || 0
                        },
                        year: result.data.year || 2024,
                        // Ensure arrays
                        features: Array.isArray(result.data.features) ? result.data.features : [],
                        images: Array.isArray(result.data.images) && result.data.images.length > 0
                            ? result.data.images
                            : MOCK_PROPERTY.images,
                        // Ensure agent object
                        agent: result.data.agent || MOCK_PROPERTY.agent
                    }
                }
            }

            // If still no data found (e.g. invalid UUID), use Mock fully
            if (!data) {
                data = { ...MOCK_PROPERTY, id: typeof id === 'string' ? id : 'mock' }
            }

            setProperty(data)
            setMainImage(data.images[0])
            setLoading(false)
        }

        fetchProperty()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Navbar Placeholder */}
            <div className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/properties" className="pointer-events-auto">
                    <Button variant="ghost" className="rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white/20">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Volver
                    </Button>
                </Link>
                <div className="pointer-events-auto flex gap-2">
                    <Button
                        size="icon"
                        className={`rounded-full backdrop-blur-md transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-black'}`}
                        onClick={() => setIsLiked(!isLiked)}
                    >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button size="icon" className="rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* === HERO GALLERY === */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={mainImage}
                        src={mainImage}
                        alt={property.title}
                        initial={{ scale: 1.1, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Gallery Thumbnails Overlay */}
                <div className="absolute bottom-8 right-4 md:right-8 z-20 hidden md:flex gap-2 p-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                    {property.images.slice(0, 5).map((img: string, i: number) => (
                        <div
                            key={i}
                            onClick={() => setMainImage(img)}
                            className={`relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer transition-all ${mainImage === img ? 'ring-2 ring-cyan-500 scale-105' : 'opacity-70 hover:opacity-100'}`}
                        >
                            <img
                                src={img}
                                className="w-full h-full object-cover"
                                alt=""
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=200";
                                }}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => setIsGalleryOpen(true)}
                        className="w-20 h-14 rounded-lg bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center text-white backdrop-blur-md transition-colors"
                    >
                        <span className="font-bold">+{property.images.length - 5}</span>
                        <span className="text-[10px]">Ver todas</span>
                    </button>
                </div>

                {/* Mobile Gallery Button */}
                <Button
                    onClick={() => setIsGalleryOpen(true)}
                    className="absolute bottom-4 right-4 md:hidden bg-black/60 backdrop-blur-md text-white border border-white/20"
                >
                    Ver {property.images.length} Fotos
                </Button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Badge className="mb-4 bg-cyan-500 text-white border-0 text-sm py-1 px-3">
                            En Venta
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
                            {property.title}
                        </h1>
                        <p className="text-xl text-white/80 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-cyan-400" />
                            {property.address}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* === CONTENT GRID === */}
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Specs Bar */}
                        <Card className="glass-card border-none bg-slate-900/50 backdrop-blur-xl">
                            <CardContent className="p-6 flex flex-wrap justify-around gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <Bed className="w-6 h-6 text-cyan-400 mb-2" />
                                    <span className="text-2xl font-bold text-white">{property.specs.beds}</span>
                                    <span className="text-white/50 text-sm">Dormitorios</span>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div className="flex flex-col items-center">
                                    <Bath className="w-6 h-6 text-purple-400 mb-2" />
                                    <span className="text-2xl font-bold text-white">{property.specs.baths}</span>
                                    <span className="text-white/50 text-sm">Baños</span>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div className="flex flex-col items-center">
                                    <Square className="w-6 h-6 text-amber-400 mb-2" />
                                    <span className="text-2xl font-bold text-white">{property.specs.m2}</span>
                                    <span className="text-white/50 text-sm">m² Totales</span>
                                </div>
                                <div className="w-px bg-white/10" />
                                <div className="flex flex-col items-center">
                                    <Calendar className="w-6 h-6 text-green-400 mb-2" />
                                    <span className="text-2xl font-bold text-white">{property.year}</span>
                                    <span className="text-white/50 text-sm">Construcción</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">Sobre esta propiedad</h2>
                            <p className="text-white/70 leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Comodidades</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {property.features?.map((feature: string) => (
                                    <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-white/80">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-cyan-400" />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar Agent */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">
                            {/* Price Card */}
                            <Card className="bg-gradient-to-br from-slate-900 to-black border-white/10 shadow-2xl overflow-hidden">
                                <CardContent className="p-8">
                                    <p className="text-white/60 text-sm mb-1">Precio de Venta</p>
                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
                                        USD ${property.price.toLocaleString()}
                                    </div>

                                    <div className="space-y-3">
                                        <a href={`https://wa.me/59899123456?text=Hola, me interesa la propiedad ${property.title}`} target="_blank" rel="noopener noreferrer">
                                            <Button className="w-full h-12 text-lg font-bold bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl shadow-lg shadow-cyan-500/20">
                                                <MessageCircle className="w-5 h-5 mr-2" />
                                                Contactar Agente
                                            </Button>
                                        </a>
                                        <Button onClick={() => setIs360Open(true)} variant="outline" className="w-full h-12 text-lg border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 rounded-xl">
                                            <View className="w-5 h-5 mr-2" />
                                            Ver Tour 360°
                                        </Button>
                                        <a href="tel:+59899123456">
                                            <Button variant="outline" className="w-full h-12 text-lg border-white/10 hover:bg-white/5 text-white rounded-xl">
                                                <Phone className="w-5 h-5 mr-2" />
                                                Llamar Ahora
                                            </Button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Agent Profile */}
                            <Card className="glass-card border-none bg-slate-900/40">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <Avatar className="h-16 w-16 border-2 border-cyan-500/50">
                                        <AvatarFallback className="bg-slate-800 text-white font-bold text-xl">
                                            {property.agent.image}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-white font-bold text-lg">{property.agent.name}</p>
                                        <p className="text-cyan-400 text-sm">{property.agent.role}</p>
                                        <p className="text-white/40 text-xs mt-1">Respuesta rápida</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* === LIGHTBOX MODAL === */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col"
                    >
                        {/* Lightbox Header */}
                        <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10">
                            <div>
                                <h3 className="text-white font-bold text-lg hidden md:block">{property.title}</h3>
                                <p className="text-white/50 text-sm">{property.images.length} fotografías</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10 rounded-full h-12 w-12"
                                onClick={() => setIsGalleryOpen(false)}
                            >
                                <span className="text-3xl">×</span>
                            </Button>
                        </div>

                        {/* Lightbox Scrollable Grid */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                                {property.images.map((img: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`relative group rounded-xl overflow-hidden cursor-pointer ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2 aspect-[4/3]' : 'aspect-video'
                                            }`}
                                        onClick={() => {
                                            // Ideally open a single-image slider view here, 
                                            // but for now scrolling grid is a "Gallery".
                                            setMainImage(img)
                                            setIsGalleryOpen(false) // Or keep open if it was a carousel
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery ${i}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=800";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* === 360 VIEWER MODAL === */}
            <AnimatePresence>
                {is360Open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black"
                    >
                        <Button
                            onClick={() => setIs360Open(false)}
                            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white"
                            size="icon"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                        <Viewer360 scenes={demo360Scenes} className="h-full w-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
