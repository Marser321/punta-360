"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Sparkles,
    Globe,
    Camera,
    Video,
    ArrowRight,
    Play,
    Zap
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function MultimediaBanner() {
    return (
        <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400" />

            {/* Animated Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)'
                }}
            />

            {/* Floating Orbs */}
            <motion.div
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-32 -left-20 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Side - Text */}
                <div className="flex-1 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Badge className="bg-amber-400 text-black font-bold border-0 px-3 py-1 text-sm shadow-lg shadow-amber-400/30">
                            <Zap className="w-3 h-3 mr-1" />
                            PREMIUM EXCLUSIVE
                        </Badge>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        ¿Clientes en el extranjero?
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                            Pack Punta Lujo 360°
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-white/80 text-lg max-w-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Tour virtual inmersivo + Video Drone 4K + Reels virales.
                        <strong className="text-white"> Cierra ventas sin que el cliente viaje.</strong>
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap items-center gap-4 pt-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Globe className="w-4 h-4" />
                            Visibilidad Global
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Camera className="w-4 h-4" />
                            Fotografía Pro
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <Video className="w-4 h-4" />
                            Video 4K
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - CTA & Visual */}
                <motion.div
                    className="flex flex-col items-center gap-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* 3D-ish Preview Card */}
                    <div className="relative group cursor-pointer">
                        <div
                            className="w-48 h-32 md:w-56 md:h-36 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/20"
                            style={{
                                transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=400"
                                alt="Vista 360"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400";
                                }}
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                                    <Play className="w-6 h-6 text-blue-600 ml-1" />
                                </div>
                            </div>
                        </div>
                        {/* Floating Badge */}
                        <motion.div
                            className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs px-3 py-1 rounded-full shadow-lg"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            360°
                        </motion.div>
                    </div>

                    {/* CTA Button */}
                    <Link href="/owner/services">
                        <Button
                            size="lg"
                            className="bg-white text-blue-600 font-bold text-lg px-8 py-6 rounded-full shadow-xl shadow-black/20 hover:bg-amber-100 hover:text-amber-700 transition-all group"
                        >
                            Solicitar Ahora
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Shine Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </motion.div>
    )
}
