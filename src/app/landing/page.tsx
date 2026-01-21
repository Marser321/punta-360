"use client"

import { motion } from "framer-motion"
import Link from "next/link"
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
    Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-black" />
                            </div>
                            <span className="text-xl font-bold text-white">Punta<span className="text-amber-400">360</span></span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/marketplace" className="text-white/70 hover:text-white transition-colors">
                                Propiedades
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
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-black" />
                            </div>
                            <span className="font-bold text-white">Punta<span className="text-amber-400">360</span></span>
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
