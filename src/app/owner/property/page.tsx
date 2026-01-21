"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Eye,
    Heart,
    Share2,
    Edit,
    Camera,
    MapPin,
    Bed,
    Bath,
    Square,
    Calendar,
    TrendingUp,
    ExternalLink,
    X,
    Sparkles
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Viewer360 } from "@/components/property/viewer-360"
import { toast } from "sonner"
import { InvestmentConcierge } from "@/components/property/investment-concierge"
import { VirtualStagingSlider } from "@/components/property/virtual-staging-slider"

// Mock property data
const myProperty = {
    id: "prop-123",
    title: "Residencia Frente al Mar",
    address: "Rambla Brava 1234, Punta del Este",
    description: "Espectacular residencia de lujo con vista panorámica al océano Atlántico. Acabados de primera categoría, piscina infinity y acceso directo a la playa.",
    price: 1250000,
    status: "active",
    type: "Casa",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    yearBuilt: 2021,
    daysOnMarket: 12,
    views: 2847,
    likes: 156,
    shares: 42,
    images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1600596542815-60c37c663045?w=800",
    ]
}

export default function OwnerPropertyPage() {
    const [mainImage, setMainImage] = useState(myProperty.images[0])
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [is360Open, setIs360Open] = useState(false)

    const handleShare = () => {
        const url = typeof window !== 'undefined' ? `${window.location.origin}/p/${myProperty.id}` : ''
        navigator.clipboard.writeText(url)
        toast.success("Enlace copiado al portapapeles", {
            description: "Ya puedes compartirlo con posibles interesados."
        })
    }

    const handleEditRequest = () => {
        toast.info("Solicitud de Edición", {
            description: "Para cambios en la estructura o precio, contacta a tu agente asignado o solicita un servicio multimedia."
        })
    }

    // Demo 360 scenes
    const demo360Scenes = [{
        id: 'living',
        imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000',
        name: 'Living Room',
        hotspots: [{ position: [50, 0, -30] as [number, number, number], label: 'Cocina', type: 'info' as const }]
    }]

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <Badge className={`mb-2 ${myProperty.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'} border-0`}>
                        <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                        {myProperty.status === 'active' ? 'En Vivo' : 'En Revisión'}
                    </Badge>
                    <h1 className="text-3xl font-bold text-white">{myProperty.title}</h1>
                    <p className="text-white/60 flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4" />
                        {myProperty.address}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/p/${myProperty.id}`} target="_blank">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver Pública
                        </Button>
                    </Link>
                    <Button
                        onClick={handleEditRequest}
                        className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                    </Button>
                </div>
            </motion.div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Vistas", value: myProperty.views.toLocaleString(), icon: Eye, bgColor: "bg-cyan-500/20", textColor: "text-cyan-400" },
                    { label: "Likes", value: myProperty.likes, icon: Heart, bgColor: "bg-pink-500/20", textColor: "text-pink-400" },
                    { label: "Compartidos", value: myProperty.shares, icon: Share2, bgColor: "bg-purple-500/20", textColor: "text-purple-400" },
                    { label: "Días Activo", value: myProperty.daysOnMarket, icon: Calendar, bgColor: "bg-amber-500/20", textColor: "text-amber-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-white/60 text-sm">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Image Gallery */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
                        <div className="relative group">
                            <img
                                src={mainImage}
                                alt={myProperty.title}
                                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=800";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                    onClick={() => setIsGalleryOpen(true)}
                                    className="bg-black/50 backdrop-blur-md hover:bg-black/70 text-white rounded-full px-6 py-6"
                                >
                                    <Eye className="w-6 h-6 mr-2" />
                                    Ver Todas las Fotos
                                </Button>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                                <div>
                                    <p className="text-4xl font-bold text-white shadow-2xl">
                                        USD ${myProperty.price.toLocaleString()}
                                    </p>
                                </div>
                                <Button onClick={() => setIs360Open(true)} size="sm" variant="secondary" className="pointer-events-auto bg-white/20 backdrop-blur-md text-white hover:bg-white/30">
                                    <Camera className="w-4 h-4 mr-2" />
                                    Ver Tour 360°
                                </Button>
                            </div>
                        </div>
                        {/* Thumbnail Grid */}
                        <div className="p-4 grid grid-cols-5 gap-3">
                            {myProperty.images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`relative rounded-lg overflow-hidden cursor-pointer h-20 border-2 transition-all ${mainImage === img ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-transparent hover:border-white/30'}`}
                                >
                                    <div className={`absolute inset-0 bg-black/20 ${mainImage === img ? 'hidden' : 'block hover:bg-transparent'} transition-colors`} />
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=200";
                                        }}
                                    />
                                </div>
                            ))}
                            {/* View All Button Thumbnail */}
                            <div
                                onClick={() => setIsGalleryOpen(true)}
                                className="relative rounded-lg overflow-hidden cursor-pointer h-20 border-2 border-transparent bg-white/5 hover:bg-white/10 flex items-center justify-center group"
                            >
                                <div className="text-center">
                                    <p className="text-white font-bold text-lg group-hover:scale-110 transition-transform">+{myProperty.images.length}</p>
                                    <p className="text-white/50 text-[10px]">Ver todas</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Property Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
                        <CardHeader>
                            <CardTitle className="text-white">Detalles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Specs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Bed className="w-5 h-5 text-amber-400" />
                                    <div>
                                        <p className="text-white font-bold">{myProperty.bedrooms}</p>
                                        <p className="text-white/60 text-xs">Dormitorios</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Bath className="w-5 h-5 text-cyan-400" />
                                    <div>
                                        <p className="text-white font-bold">{myProperty.bathrooms}</p>
                                        <p className="text-white/60 text-xs">Baños</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Square className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <p className="text-white font-bold">{myProperty.area} m²</p>
                                        <p className="text-white/60 text-xs">Superficie</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Calendar className="w-5 h-5 text-green-400" />
                                    <div>
                                        <p className="text-white font-bold">{myProperty.yearBuilt}</p>
                                        <p className="text-white/60 text-xs">Año</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <p className="text-white/60 text-xs uppercase mb-2">Descripción</p>
                                <p className="text-white/80 text-sm leading-relaxed">{myProperty.description}</p>
                            </div>

                            {/* Performance */}
                            <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 rounded-xl p-4 border border-amber-500/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-amber-400" />
                                    <p className="text-amber-400 font-medium text-sm">Rendimiento</p>
                                </div>
                                <p className="text-white/70 text-sm">
                                    Tu propiedad está en el <strong className="text-white">top 10%</strong> de vistas esta semana.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2 pt-2">
                                <Link href="/owner/services" className="block">
                                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold">
                                        <Camera className="w-4 h-4 mr-2" />
                                        Mejorar con Marketing
                                    </Button>
                                </Link>
                                <Button
                                    onClick={handleShare}
                                    variant="outline"
                                    className="w-full border-white/20 text-white hover:bg-white/10"
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Compartir Enlace
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* AI Innovation Sections for Owners */}
            <div className="grid lg:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                <div className="lg:col-span-2 space-y-12">
                    {/* Virtual Staging */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                                <span className="text-amber-500">AI</span> Virtual Staging
                            </h2>
                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3">Exclusivo Premium</Badge>
                        </div>
                        <VirtualStagingSlider />
                    </motion.div>

                    {/* Investment Concierge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                            <span className="text-amber-500">Punta</span> Intelligence
                        </h2>
                        <InvestmentConcierge price={myProperty.price.toString()} />
                    </motion.div>
                </div>

                {/* AI Context Card */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20 backdrop-blur-xl">
                        <CardContent className="p-8">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                                <Sparkles className="w-6 h-6 text-black" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">
                                Herramientas de Venta de Nueva Generación
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed mb-6">
                                Hemos activado estas funciones exclusivas para tu propiedad. Utilizan nuestra **IA propietaria** para reducir el tiempo de venta hasta en un 40%.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] font-bold">1</div>
                                    <p className="text-xs text-white/60">**Staging:** Los compradores visualizan el potencial real.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] font-bold">2</div>
                                    <p className="text-xs text-white/60">**Intelligence:** Argumentos financieros para el inversor.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Gallery Lightbox */}
            {isGalleryOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setIsGalleryOpen(false)}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white hover:bg-white/20"
                        onClick={() => setIsGalleryOpen(false)}
                    >
                        <span className="text-2xl">×</span>
                    </Button>

                    <div className="max-w-6xl w-full max-h-[90vh] grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="md:col-span-3 mb-4">
                            <h2 className="text-2xl font-bold text-white mb-1">Galería de Fotos</h2>
                            <p className="text-white/60 text-sm">{myProperty.images.length} fotos disponibles</p>
                        </div>
                        {myProperty.images.map((img, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={i}
                                className={`rounded-xl overflow-hidden aspect-video relative group ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : ''}`}
                            >
                                <img src={img} alt={`Photo ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* 360 Viewer Modal */}
            <AnimatePresence>
                {is360Open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black"
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
