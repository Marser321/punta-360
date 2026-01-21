"use client"

import { motion } from "framer-motion"
import Link from "next/link"
// ... imports
import { Logo } from "@/components/ui/logo"


import {
    Camera,
    Play,
    Building2,
    Users,
    ArrowRight,
    Sparkles,
    Video,
    Image as ImageIcon,
    Plane,
    Star,
    CheckCircle2,
    Phone,
    TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ServiceCards } from "@/components/landing/service-cards"
import { StatsSection } from "@/components/landing/stats-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-slate-950 overflow-hidden">
            {/* === HERO SECTION WITH VIDEO BACKGROUND === */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        poster="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2560"
                    >
                        <source
                            src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=165&oauth2_token_id=57447761"
                            type="video/mp4"
                        />
                    </video>

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10" />
                </div>

                {/* Navigation */}
                <nav className="absolute top-0 left-0 right-0 z-20 p-6">
                    <div className="container mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                            <Logo size="md" />
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/marketplace" className="text-white/70 hover:text-white transition-colors">
                                Propiedades
                            </Link>
                            <Link href="/ai-solutions" className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1">
                                <Sparkles className="w-4 h-4" />
                                Soluciones AI
                            </Link>
                            <Link href="#servicios" className="text-white/70 hover:text-white transition-colors">
                                Servicios
                            </Link>
                            <Link href="#contacto" className="text-white/70 hover:text-white transition-colors">
                                Contacto
                            </Link>
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm">
                            <Sparkles className="h-4 w-4" />
                            La plataforma inmobiliaria #1 de Punta del Este
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                            El futuro del
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                                Real Estate Premium
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                            Conectamos propietarios con compradores exclusivos y ofrecemos
                            servicios de producción multimedia de élite para inmobiliarias.
                        </p>

                        {/* Dual CTA */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/marketplace">
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 text-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 shadow-lg shadow-amber-500/25"
                                    >
                                        <Building2 className="mr-2 h-5 w-5" />
                                        Buscar Propiedad
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/dashboard">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                                    >
                                        <Camera className="mr-2 h-5 w-5" />
                                        Soy Inmobiliaria
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* === SERVICES SECTION === */}
            <section id="servicios" className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Servicios para <span className="text-amber-400">Inmobiliarias</span>
                        </h2>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">
                            Producción multimedia premium que convierte listados en ventas.
                            El &quot;Uber&quot; de la fotografía inmobiliaria en Uruguay.
                        </p>
                    </motion.div>

                    <ServiceCards />
                </div>
            </section>

            {/* === STATS SECTION === */}
            <StatsSection />

            {/* === AI INNOVATION SECTION === */}
            <section className="py-24 relative bg-slate-950 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -mr-64 -mt-32" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-8"
                        >
                            <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                                Próxima Generación
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter">
                                Inteligencia <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-600">
                                    de Inversión de Élite
                                </span>
                            </h2>
                            <p className="text-xl text-white/50 leading-relaxed font-light">
                                Punta360 utiliza redes neuronales para analizar el ROI real, historial de rentas y proyecciones de valor para inversores que exigen precisión ante todo.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "Virtual Staging IA",
                                        desc: "Visualización instantánea de espacios con múltiples estilos arquitectónicos.",
                                        icon: Sparkles,
                                        color: "text-purple-400"
                                    },
                                    {
                                        title: "Punta Intelligence",
                                        desc: "Análisis financiero proactivo con proyección de ROI y Yield en tiempo real.",
                                        icon: TrendingUp,
                                        color: "text-cyan-400"
                                    },
                                    {
                                        title: "Creative Studio",
                                        desc: "Generación automática de contenido para redes sociales (Reels/TikTok).",
                                        icon: Video,
                                        color: "text-amber-400"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                        <div className={`mt-1 h-8 w-8 rounded-lg bg-black/40 flex items-center justify-center ${item.color}`}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold group-hover:text-amber-400 transition-colors">{item.title}</h4>
                                            <p className="text-white/40 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Interactive Visual Element */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="flex-1 relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="relative glass-card border-white/10 p-4 rounded-[3rem] bg-black/40 backdrop-blur-3xl overflow-hidden aspect-square flex items-center justify-center">
                                <img
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
                                    alt="IA Visualization"
                                    className="w-full h-full object-cover rounded-[2.5rem] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center animate-pulse">
                                        <Sparkles className="w-10 h-10 text-amber-500" />
                                    </div>
                                    <p className="mt-4 text-white font-black tracking-widest text-sm uppercase">Analizando Potencial...</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS === */}
            <TestimonialsSection />

            {/* === CTA FINAL === */}
            <section id="contacto" className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-950" />

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px]" />

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            ¿Listo para <span className="text-amber-400">transformar</span> tu negocio?
                        </h2>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">
                            Únete a las inmobiliarias más exitosas de Punta del Este
                            que ya confían en Punta360.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/dashboard">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 text-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600"
                                >
                                    Comenzar Ahora
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10"
                            >
                                <Phone className="mr-2 h-5 w-5" />
                                Agendar Demo
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === FOOTER === */}
            <footer className="py-12 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <Logo size="md" />
                        </div>

                        <p className="text-sm text-white/40">
                            © 2026 Punta360 Real Estate Technology. Todos los derechos reservados.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                                Términos
                            </Link>
                            <Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                                Privacidad
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
