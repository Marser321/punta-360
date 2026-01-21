"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Camera,
    Globe,
    Video,
    Sparkles,
    Check,
    ArrowRight,
    Star,
    Zap
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

const services = [
    {
        id: "360",
        name: "Tour Virtual 360°",
        description: "Recorrido inmersivo que permite a compradores internacionales visitar tu propiedad desde cualquier lugar.",
        price: 450,
        icon: Globe,
        iconBg: "bg-cyan-500/80",
        features: [
            "Captura profesional con cámara 360°",
            "Hasta 10 puntos de interés",
            "Hotspots interactivos",
            "Integración web inmediata"
        ],
        popular: true,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400"
    },
    {
        id: "drone",
        name: "Video Drone 4K",
        description: "Tomas aéreas cinematográficas que muestran la ubicación privilegiada y el entorno de tu propiedad.",
        price: 350,
        icon: Video,
        iconBg: "bg-purple-500/80",
        features: [
            "Vuelo profesional certificado",
            "Edición cinematográfica",
            "Música con licencia",
            "Formato vertical y horizontal"
        ],
        popular: false,
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=400"
    },
    {
        id: "photo",
        name: "Fotografía Premium",
        description: "Sesión fotográfica profesional con iluminación de estudio y edición de alta gama.",
        price: 280,
        icon: Camera,
        iconBg: "bg-amber-500/80",
        features: [
            "30+ fotos editadas",
            "HDR profesional",
            "Retoque de cielos",
            "Fotos de detalles"
        ],
        popular: false,
        image: "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=400"
    },
    {
        id: "reels",
        name: "Pack Redes Sociales",
        description: "Contenido optimizado para Instagram y TikTok que genera engagement y leads cualificados.",
        price: 520,
        icon: Sparkles,
        iconBg: "bg-pink-500/80",
        features: [
            "3 Reels editados",
            "10 Stories destacados",
            "Música trending",
            "Hashtag strategy"
        ],
        popular: false,
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=400"
    }
]

const premiumPack = {
    id: "premium",
    name: "Pack Premium Completo",
    description: "Todo incluido: 360°, Drone, Fotografía y Redes. El paquete más completo para maximizar tu venta.",
    price: 1200,
    originalPrice: 1600,
    discount: 25,
    features: [
        "Tour Virtual 360° completo",
        "Video Drone 4K editado",
        "Sesión de 50+ fotos",
        "Pack Redes Sociales",
        "Prioridad en producción",
        "Revisiones ilimitadas"
    ]
}

export default function OwnerServicesPage() {
    const handleRequestService = (serviceName: string) => {
        toast.success(`Solicitud de "${serviceName}" enviada`, {
            description: "Nuestro equipo te contactará en 24 horas para coordinar."
        })
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Sin Costo Inicial
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Servicios de <span className="text-amber-400">Marketing</span>
                </h1>
                <p className="text-white/60 text-lg">
                    Potencia tu venta con contenido profesional. Cobramos solo cuando vendes.
                </p>
            </motion.div>

            {/* Premium Pack Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="relative overflow-hidden border-2 border-amber-500/50 bg-gradient-to-r from-amber-900/30 via-black/50 to-amber-900/30 backdrop-blur-xl">
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-amber-500 text-black font-bold text-sm px-3 py-1">
                            -{premiumPack.discount}% DESCUENTO
                        </Badge>
                    </div>
                    <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                        <Star className="w-6 h-6 text-black fill-black" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{premiumPack.name}</h3>
                                        <p className="text-amber-400">El más vendido</p>
                                    </div>
                                </div>
                                <p className="text-white/70 text-lg">{premiumPack.description}</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {premiumPack.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-white/80">
                                            <Check className="w-4 h-4 text-amber-400" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center lg:text-right space-y-4">
                                <div>
                                    <p className="text-white/50 line-through text-lg">USD ${premiumPack.originalPrice}</p>
                                    <p className="text-4xl font-bold text-amber-400">USD ${premiumPack.price}</p>
                                    <p className="text-white/60 text-sm">Deducible de comisión</p>
                                </div>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-full shadow-lg shadow-amber-500/30 px-8"
                                    onClick={() => handleRequestService(premiumPack.name)}
                                >
                                    Solicitar Pack Premium
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden hover:border-amber-500/30 transition-all group h-full">
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=400";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                {service.popular && (
                                    <Badge className="absolute top-3 right-3 bg-cyan-500 text-white border-0">
                                        Popular
                                    </Badge>
                                )}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <div className={`w-10 h-10 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                                        <service.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{service.name}</h3>
                                </div>
                            </div>
                            <CardContent className="p-5 space-y-4">
                                <p className="text-white/70">{service.description}</p>
                                <div className="space-y-2">
                                    {service.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-white/60 text-sm">
                                            <Check className="w-4 h-4 text-green-400" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div>
                                        <p className="text-2xl font-bold text-white">USD ${service.price}</p>
                                        <p className="text-white/50 text-xs">Deducible de comisión</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-full"
                                        onClick={() => handleRequestService(service.name)}
                                    >
                                        Solicitar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* FAQ Teaser */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">¿Cómo funciona el modelo &quot;Sin Costo Inicial&quot;?</h3>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Nosotros adelantamos la inversión en marketing. Cuando tu propiedad se venda,
                        el costo de los servicios se deduce de nuestra comisión. Si no vendemos, no pagas nada.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
