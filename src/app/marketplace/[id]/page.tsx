"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    MapPin,
    Bed,
    Bath,
    Maximize,
    Heart,
    Share2,
    ChevronLeft,
    Camera,
    Phone,
    MessageCircle,
    Calendar,
    CheckCircle2,
    Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { AIChat } from "@/components/chat/ai-chat"
import { Viewer360 } from "@/components/property/viewer-360"

// Mock property data
const mockPropertyDetail = {
    id: "1",
    title: "Villa Sol y Mar",
    description: "Espectacular villa contemporánea con vistas panorámicas al océano. Diseño arquitectónico de última generación con acabados premium, piscina infinity y jardines tropicales. Ubicación privilegiada a solo 200 metros de la playa.",
    location: "La Barra, Punta del Este",
    address: "Ruta 10, Km 161",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    lotArea: 1200,
    yearBuilt: 2022,
    images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
        "https://images.unsplash.com/photo-1600596542815-60c37c663045?w=1200",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
    ],
    has360: true,
    panoramaUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=4096",
    features: [
        "Piscina infinity",
        "Cocina gourmet",
        "Sistema domótico",
        "Paneles solares",
        "Jardín tropical",
        "Parrillero cubierto",
        "Estacionamiento 3 autos",
        "Vista al mar"
    ],
    agent: {
        name: "María Fernández",
        phone: "+598 99 123 456",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    }
}

export default function PropertyDetailPage() {
    const params = useParams()
    const [property, setProperty] = useState(mockPropertyDetail)
    const [currentImage, setCurrentImage] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [show360, setShow360] = useState(false)

    useEffect(() => {
        async function checkFavorite() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user || !params.id) return

            const { data } = await supabase
                .from('favorites')
                .select('*')
                .eq('user_id', user.id)
                .eq('property_id', params.id)
                .single()

            if (data) setIsLiked(true)
        }
        checkFavorite()
    }, [params.id])

    const toggleFavorite = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            alert("Debes iniciar sesión para guardar favoritos")
            return
        }

        if (isLiked) {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('property_id', params.id)

            if (!error) setIsLiked(false)
        } else {
            const { error } = await supabase
                .from('favorites')
                .insert({ user_id: user.id, property_id: params.id })

            if (!error) setIsLiked(true)
        }
    }

    useEffect(() => {
        async function fetchProperty() {
            if (params.id) {
                const { data } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (data) {
                    setProperty({
                        ...mockPropertyDetail,
                        ...data,
                        images: data.images || mockPropertyDetail.images, // Fix: mapping cover_image logic was in marketplace list, here it's detail
                        has360: data.has_360_tour || false,
                        panoramaUrl: data.panorama_url || mockPropertyDetail.panoramaUrl
                    })
                }
            }
        }
        fetchProperty()
    }, [params.id])

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Back Button */}
            <div className="fixed top-4 left-4 z-50">
                <Link href="/marketplace">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-black/70"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                </Link>
            </div>

            {/* Action Buttons */}
            <div className="fixed top-4 right-4 z-50 flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-black/70"
                    onClick={toggleFavorite}
                >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-black/70"
                    onClick={() => {
                        const text = `Hola! Mira esta propiedad: ${property.title} - USD ${property.price.toLocaleString()}. Link: ${window.location.href}`
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                    }}
                >
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            {/* Hero Image / 360 Viewer */}
            <div className="relative h-[60vh] md:h-[70vh]">
                {show360 && property.has360 ? (
                    <div className="absolute inset-0">
                        <Viewer360 panoramaUrl={property.panoramaUrl} />
                        <Button
                            onClick={() => setShow360(false)}
                            className="absolute bottom-4 right-4 z-10"
                            variant="outline"
                        >
                            Cerrar 360°
                        </Button>
                    </div>
                ) : (
                    <>
                        <img
                            src={property.images[currentImage]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                        {/* 360 Button */}
                        {property.has360 && (
                            <motion.button
                                onClick={() => setShow360(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-cyan-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/30"
                            >
                                <Camera className="h-5 w-5" />
                                Ver Tour 360°
                            </motion.button>
                        )}

                        {/* Image Indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {property.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImage(i)}
                                    className={`h-2 rounded-full transition-all ${i === currentImage ? 'w-8 bg-white' : 'w-2 bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 -mt-10 container mx-auto px-4 pb-32">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {property.has360 && (
                                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                                                <Camera className="h-3 w-3 mr-1" />
                                                Tour 360°
                                            </Badge>
                                        )}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        {property.title}
                                    </h1>
                                    <p className="text-white/60 flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {property.location}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-amber-400">
                                        USD ${property.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2 text-white">
                                    <Bed className="h-5 w-5 text-white/60" />
                                    <span>{property.bedrooms} Dormitorios</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Bath className="h-5 w-5 text-white/60" />
                                    <span>{property.bathrooms} Baños</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Maximize className="h-5 w-5 text-white/60" />
                                    <span>{property.area}m² construidos</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Descripción</h2>
                            <p className="text-white/70 leading-relaxed">
                                {property.description}
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Características</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {property.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/70">
                                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Gallery Thumbnails */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Galería</h2>
                            <div className="grid grid-cols-4 gap-3">
                                {property.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImage(i)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${i === currentImage ? 'border-amber-500' : 'border-transparent hover:border-white/30'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar - Agent Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-20 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={property.agent.image}
                                    alt={property.agent.name}
                                    className="h-16 w-16 rounded-full object-cover ring-2 ring-amber-500/50"
                                />
                                <div>
                                    <p className="font-semibold text-white">{property.agent.name}</p>
                                    <p className="text-sm text-white/60">Agente Premium</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full h-12 bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600">
                                    <Phone className="h-4 w-4 mr-2" />
                                    Llamar Ahora
                                </Button>
                                <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    WhatsApp
                                </Button>
                                <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Agendar Visita
                                </Button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                <p className="text-xs text-white/40">
                                    Respuesta promedio: 30 minutos
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Floating AI Chat */}
            <AIChat
                propertyTitle={property.title}
                propertyPrice={property.price}
                propertyAddress={property.location}
            />
        </main>
    )
}
