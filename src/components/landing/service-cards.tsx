"use client"

import { motion } from "framer-motion"
import {
    Camera,
    Video,
    Plane,
    Image as ImageIcon,
    Sparkles,
    ArrowRight,
    CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
    {
        id: "pack_full",
        title: "Pack Punta Lujo 360°",
        subtitle: "El más completo",
        description: "Tour Virtual Matterport + Drone 4K + 20 Fotos HDR + 2 Reels para redes",
        icon: Sparkles,
        price: "USD 890",
        popular: true,
        features: [
            "Recorrido inmersivo 360° profesional",
            "Video aéreo cinematográfico 4K",
            "Fotografía HDR de interiores y exteriores",
            "2 Reels verticales para Instagram/TikTok",
            "Entrega en 48 horas"
        ],
        color: "from-amber-400 to-yellow-500",
        glow: "shadow-amber-500/25"
    },
    {
        id: "virtual_tour",
        title: "Tour Virtual 360°",
        subtitle: "Experiencia inmersiva",
        description: "Recorrido interactivo para portales web y redes sociales",
        icon: Camera,
        price: "USD 350",
        popular: false,
        features: [
            "Captura profesional 360°",
            "Navegación interactiva",
            "Hotspots informativos",
            "Embed para tu web",
            "Entrega en 24 horas"
        ],
        color: "from-cyan-400 to-blue-500",
        glow: "shadow-cyan-500/25"
    },
    {
        id: "drone_only",
        title: "Producción Drone",
        subtitle: "Vista aérea premium",
        description: "Video y fotografía aérea cinematográfica 4K",
        icon: Plane,
        price: "USD 290",
        popular: false,
        features: [
            "Video aéreo 4K de 2 minutos",
            "5 fotografías aéreas HDR",
            "Tomas orbitales y reveal",
            "Música licenciada incluida",
            "Entrega en 24 horas"
        ],
        color: "from-purple-400 to-indigo-500",
        glow: "shadow-purple-500/25"
    },
    {
        id: "social_media",
        title: "Pack Social Media",
        subtitle: "Contenido viral",
        description: "Contenido optimizado para máximo engagement en redes",
        icon: Video,
        price: "USD 450",
        popular: false,
        features: [
            "3 Reels verticales editados",
            "10 fotos para feed",
            "Stories templates",
            "Música trending incluida",
            "Entrega en 72 horas"
        ],
        color: "from-pink-400 to-rose-500",
        glow: "shadow-pink-500/25"
    }
]

export function ServiceCards() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
                <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                >
                    {/* Popular Badge */}
                    {service.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                            <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-bold">
                                ⭐ MÁS POPULAR
                            </span>
                        </div>
                    )}

                    <div className={`h-full bg-white/5 backdrop-blur-md border rounded-3xl overflow-hidden transition-all duration-500 ${service.popular
                            ? 'border-amber-500/50 hover:border-amber-400'
                            : 'border-white/10 hover:border-white/30'
                        } hover:bg-white/10 hover:shadow-2xl hover:${service.glow} hover:-translate-y-2`}>

                        {/* Gradient Overlay on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                        <div className="relative p-6 flex flex-col h-full">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <service.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{service.subtitle}</p>
                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${service.color}`}>
                                    {service.price}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-2 mb-6 flex-grow">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${service.popular ? 'text-amber-400' : 'text-white/40'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link href="/services/new">
                                <Button
                                    className={`w-full ${service.popular
                                            ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600'
                                            : 'bg-white/10 hover:bg-white/20 text-white'
                                        }`}
                                >
                                    Contratar
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
