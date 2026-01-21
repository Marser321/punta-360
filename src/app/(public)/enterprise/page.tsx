"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Building2,
    Sparkles,
    Zap,
    Users,
    BarChart3,
    Globe,
    Bot,
    ArrowRight,
    Check,
    Star,
    Rocket,
    Shield,
    Headphones,
    Code,
    MessageSquare,
    TrendingUp,
    Camera,
    Video,
    Target,
    Award,
    Clock,
    DollarSign,
    Play,
    ChevronRight
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { ImageComparison } from "@/components/ui/image-comparison"
import { ParallaxSection } from "@/components/ui/parallax-section"

// Pricing plans - REENFOCADOS para agentes nuevos
const plans = [
    {
        id: "solo",
        name: "Agente Solo",
        description: "Para agentes independientes que quieren destacar",
        price: 99,
        period: "/mes",
        properties: "Hasta 5 propiedades",
        highlight: "Perfecto para empezar",
        features: [
            "1 Tour 360° incluido/mes",
            "Fotografía profesional básica",
            "Página de agente personal",
            "Leads directos a tu WhatsApp",
            "Soporte por email",
        ],
        cta: "Empezar Gratis 14 Días",
        popular: false,
        gradient: "from-cyan-500 to-blue-600",
        iconBg: "bg-cyan-500/20",
    },
    {
        id: "growth",
        name: "Agencia Growth",
        description: "Para equipos pequeños con grandes ambiciones",
        price: 399,
        period: "/mes",
        properties: "Hasta 25 propiedades",
        highlight: "Más vendido",
        features: [
            "Todo en Agente Solo, más:",
            "Tours 360° ilimitados",
            "Video Drone 4K (2/mes)",
            "Pack Redes Sociales",
            "Dashboard de equipo (5 usuarios)",
            "IA Lead Scoring",
            "Integración WhatsApp Business",
            "Soporte prioritario 24/7",
        ],
        cta: "Probar 14 Días Gratis",
        popular: true,
        gradient: "from-amber-400 to-orange-500",
        iconBg: "bg-amber-500/20",
    },
    {
        id: "scale",
        name: "Scale",
        description: "Para inmobiliarias que van en serio",
        price: 899,
        period: "/mes",
        properties: "Propiedades ilimitadas",
        highlight: "Todo incluido",
        features: [
            "Todo en Growth, más:",
            "Video Drone ilimitado",
            "Automatizaciones IA avanzadas",
            "API para integrar tu CRM",
            "Usuarios ilimitados",
            "Account Manager dedicado",
            "Reportes personalizados",
            "Prioridad en producción",
        ],
        cta: "Hablar con Ventas",
        popular: false,
        gradient: "from-purple-500 to-pink-500",
        iconBg: "bg-purple-500/20",
    }
]

// Testimonios de agentes reales
const testimonials = [
    {
        name: "Carolina Méndez",
        role: "Agente Independiente",
        location: "Montevideo",
        quote: "Pasé de 2 ventas al año a 8. Los tours 360° hicieron toda la diferencia con clientes de Argentina.",
        avatar: "CM",
        metric: "4x más ventas"
    },
    {
        name: "Martín Rodríguez",
        role: "Fundador, MR Propiedades",
        location: "Punta del Este",
        quote: "Empecé solo con el plan básico. Hoy tenemos 3 agentes y cerramos el mejor año de nuestra historia.",
        avatar: "MR",
        metric: "$2.3M en 2025"
    },
    {
        name: "Lucía Ferreira",
        role: "Nueva en el rubro",
        location: "Maldonado",
        quote: "Sin experiencia previa, logré mi primera venta en 60 días gracias al contenido profesional.",
        avatar: "LF",
        metric: "Primera venta en 60 días"
    },
]

// Problemas que resolvemos
const painPoints = [
    {
        problem: "Competir con las grandes inmobiliarias",
        solution: "Marketing de nivel Hollywood accesible",
        icon: Target,
    },
    {
        problem: "Conseguir los primeros clientes",
        solution: "Generación de leads automatizada",
        icon: Users,
    },
    {
        problem: "Contenido caro y de baja calidad",
        solution: "Producciones premium a precio justo",
        icon: Camera,
    },
    {
        problem: "Perder tiempo en tareas repetitivas",
        solution: "Automatizaciones con IA",
        icon: Bot,
    },
]

// Comparación antes/después
const comparison = [
    { before: "Fotos con celular", after: "Sesión profesional HDR" },
    { before: "Links de Google Maps", after: "Tour 360° inmersivo" },
    { before: "Videos caseros", after: "Drone cinematográfico 4K" },
    { before: "Responder manualmente", after: "IA que califica leads" },
    { before: "Portales genéricos", after: "Tu marca personal" },
]

export default function EnterprisePage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        message: ""
    })
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("¡Solicitud enviada!", {
            description: "Te contactaremos en las próximas 24 horas."
        })
        setFormData({ name: "", email: "", phone: "", experience: "", message: "" })
    }

    return (
        <div className="min-h-screen bg-black overflow-hidden">
            {/* === HERO SECTION === */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.15
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-black" />

                    {/* Animated Gradient Orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[128px]"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[128px]"
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 80, 0],
                            scale: [1.2, 1, 1.2],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px]"
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -60, 0],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-20">
                    <motion.div
                        className="max-w-5xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Badge className="mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-500/30 text-base px-6 py-2">
                                <Rocket className="w-4 h-4 mr-2" />
                                Para Agentes que Quieren Crecer
                            </Badge>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Vende como
                            <br />
                            <span className="relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500">
                                    los Grandes
                                </span>
                                {/* Underline effect */}
                                <motion.span
                                    className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                />
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            El mismo marketing que usan las inmobiliarias de lujo,
                            <br className="hidden md:block" />
                            <span className="text-white font-semibold"> ahora accesible para agentes independientes.</span>
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-black font-bold text-lg px-10 py-7 rounded-full shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105"
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Empieza Gratis 14 Días
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7 rounded-full group"
                                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Ver Demo
                            </Button>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-8 text-white/50 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-black flex items-center justify-center text-xs font-bold text-white">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span>+150 agentes activos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                <span>4.9/5 rating</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-400" />
                                <span>Sin permanencia</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* === PAIN POINTS SECTION === */}
            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
                className="py-24"
                overlayClass="bg-gradient-to-b from-black to-slate-950 opacity-90"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
                            El Problema
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            ¿Te suena <span className="text-red-400">familiar</span>?
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {painPoints.map((item, i) => (
                            <motion.div
                                key={item.problem}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-gradient-to-b from-white/5 to-white/[0.02] border-white/10 backdrop-blur-xl h-full group hover:border-green-500/30 transition-all">
                                    <CardContent className="p-6">
                                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/10 transition-colors">
                                            <item.icon className="w-7 h-7 text-red-400 group-hover:text-green-400 transition-colors" />
                                        </div>
                                        <p className="text-white/50 text-sm mb-2 line-through group-hover:opacity-50 transition-opacity">
                                            {item.problem}
                                        </p>
                                        <p className="text-white font-semibold group-hover:text-green-400 transition-colors">
                                            {item.solution}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ParallaxSection>

            {/* === BEFORE/AFTER COMPARISON === */}
            <section id="demo" className="py-24 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.1
                        }}
                    />
                    <div className="absolute inset-0 bg-slate-950/95" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                            La Transformación
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            De Amateur a <span className="text-cyan-400">Profesional</span>
                        </h2>
                    </motion.div>



                    <div className="max-w-6xl mx-auto space-y-20">
                        {/* 1. Main Visual Comparison (Photography) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-end px-2 gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                                        <Camera className="w-6 h-6 text-amber-400" />
                                        El Poder de la Primera Impresión
                                    </h3>
                                    <p className="text-white/60 max-w-xl">
                                        El **70% de los compradores** descarta una propiedad solo por la foto de portada.
                                        No dejes que una mala iluminación te cueste una venta.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10 px-3 py-1">
                                        <TrendingUp className="w-3 h-3 mr-2" />
                                        +32% Velocidad de Venta
                                    </Badge>
                                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 px-3 py-1">
                                        <Users className="w-3 h-3 mr-2" />
                                        +50% Más Clics
                                    </Badge>
                                </div>
                            </div>

                            <ImageComparison
                                image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600&h=900"
                                beforeLabel="Foto Celular (Amateur)"
                                afterLabel="HDR Profesional (Enterprise)"
                            />
                        </motion.div>

                        {/* 2. Secondary Comparisons Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* 360 Tours */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <div className="px-2">
                                    <h4 className="text-lg font-bold text-white mb-1">Experiencia Inmersiva vs Estática</h4>
                                    <p className="text-sm text-white/50">Los tours 360° mantienen al cliente **300% más tiempo** en tu anuncio.</p>
                                </div>
                                <Card className="bg-gradient-to-br from-white/10 to-transparent border-white/10 overflow-hidden h-64 group hover:border-cyan-500/50 transition-all relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1628151016020-562a98e59275?w=800')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Globe className="w-8 h-8 text-cyan-400 animate-pulse" />
                                        </div>
                                        <p className="text-white font-bold text-xl mb-2">Tour Virtual 360°</p>
                                        <Button size="sm" variant="ghost" className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10">
                                            Ver Demo Interactiva <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Comparison Tag */}
                                    <div className="absolute top-4 left-4 bg-red-500/20 border border-red-500/30 text-red-300 px-2 py-0.5 rounded text-xs font-bold line-through opacity-70 group-hover:opacity-0 transition-opacity">
                                        Solo Fotos Planas
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Drone Video */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <div className="px-2">
                                    <h4 className="text-lg font-bold text-white mb-1">Contexto vs Detalle</h4>
                                    <p className="text-sm text-white/50">El video aéreo vende el **estilo de vida** y el entorno, no solo la casa.</p>
                                </div>
                                <Card className="bg-gradient-to-bl from-white/10 to-transparent border-white/10 overflow-hidden h-64 group hover:border-purple-500/50 transition-all relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576669801777-255e4bfbec65?w=800')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Video className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <p className="text-white font-bold text-xl mb-2">Cinematografía 4K</p>
                                        <Button size="sm" variant="ghost" className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10">
                                            Ver Ejemplo Real <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Comparison Tag */}
                                    <div className="absolute top-4 left-4 bg-red-500/20 border border-red-500/30 text-red-300 px-2 py-0.5 rounded text-xs font-bold line-through opacity-70 group-hover:opacity-0 transition-opacity">
                                        Videos de Celular
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS === */}
            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920"
                className="py-24"
                overlayClass="bg-gradient-to-b from-slate-950 to-black opacity-90"
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                            <Star className="w-3 h-3 mr-1 fill-amber-400" />
                            Historias Reales
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Agentes como <span className="text-amber-400">Tú</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/10 backdrop-blur-xl overflow-hidden">
                                    <CardContent className="p-8 md:p-12">
                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                            <div className="shrink-0">
                                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl font-bold text-black">
                                                    {testimonials[activeTestimonial].avatar}
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <p className="text-xl md:text-2xl text-white/90 mb-6 italic leading-relaxed">
                                                    &quot;{testimonials[activeTestimonial].quote}&quot;
                                                </p>
                                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                                    <div>
                                                        <p className="font-bold text-white">{testimonials[activeTestimonial].name}</p>
                                                        <p className="text-white/50 text-sm">{testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}</p>
                                                    </div>
                                                    <Badge className="md:ml-auto bg-green-500/20 text-green-400 border-green-500/30">
                                                        {testimonials[activeTestimonial].metric}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </AnimatePresence>

                        {/* Testimonial Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTestimonial(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? 'bg-amber-400 w-8' : 'bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            {/* === PRICING SECTION === */}
            <section id="pricing" className="py-24 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.08
                        }}
                    />
                    <div className="absolute inset-0 bg-black/95" />
                </div>
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="mb-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30">
                            <Zap className="w-3 h-3 mr-1" />
                            Planes que Crecen Contigo
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Elige tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">Camino</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Prueba gratis 14 días. Sin tarjeta. Cancela cuando quieras.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className={plan.popular ? 'md:-mt-4 md:mb-4' : ''}
                            >
                                <Card className={`relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border-white/10 h-full overflow-hidden ${plan.popular ? 'border-2 border-amber-500/50 shadow-2xl shadow-amber-500/20' : ''}`}>
                                    {/* Popular Badge */}
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0">
                                            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-xs px-4 py-1 rounded-bl-xl">
                                                {plan.highlight}
                                            </div>
                                        </div>
                                    )}

                                    {/* Gradient Top Bar */}
                                    <div className={`h-1 bg-gradient-to-r ${plan.gradient}`} />

                                    <CardHeader className="pt-8 pb-4">
                                        <div className={`w-14 h-14 rounded-2xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                                            <Rocket className={`w-7 h-7 text-white`} />
                                        </div>
                                        <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                                        <p className="text-white/60 text-sm">{plan.description}</p>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        {/* Price */}
                                        <div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-5xl font-black text-white">USD ${plan.price}</span>
                                                <span className="text-white/50">{plan.period}</span>
                                            </div>
                                            <p className="text-white/40 text-sm mt-1">{plan.properties}</p>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-3">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                                    <span className="text-white/80 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA */}
                                        <Button
                                            className={`w-full rounded-full font-bold py-6 ${plan.popular
                                                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:shadow-lg hover:shadow-amber-500/30'
                                                : 'bg-white/10 text-white hover:bg-white/20'}`}
                                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            {plan.cta}
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Guarantee */}
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="text-white/70">Garantía de devolución 30 días • Sin preguntas</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === CONTACT FORM === */}
            <section id="contact" className="py-24 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.1
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 to-black" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                                <Headphones className="w-3 h-3 mr-1" />
                                Empezar
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                ¿Listo para <span className="text-green-400">Despegar</span>?
                            </h2>
                            <p className="text-white/60">
                                Cuéntanos un poco sobre ti y te contactamos para activar tu prueba gratuita.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border-white/10">
                                <CardContent className="p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-white">Tu Nombre</Label>
                                                <Input
                                                    placeholder="Juan Pérez"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-white">Email</Label>
                                                <Input
                                                    type="email"
                                                    placeholder="juan@email.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-white">WhatsApp</Label>
                                                <Input
                                                    placeholder="+598 99 123 456"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-white">¿Cuánta experiencia tienes?</Label>
                                                <Input
                                                    placeholder="Ej: 2 años / Recién empezando"
                                                    value={formData.experience}
                                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white">¿Cuál es tu mayor desafío hoy?</Label>
                                            <Textarea
                                                placeholder="Conseguir más clientes, fotos profesionales, destacar de la competencia..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-green-400 to-cyan-500 text-black font-bold rounded-full py-7 text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all"
                                        >
                                            Quiero mi Prueba Gratis
                                            <Rocket className="ml-2 w-5 h-5" />
                                        </Button>
                                        <p className="text-center text-white/40 text-sm">
                                            Sin tarjeta de crédito • Respuesta en menos de 24 horas
                                        </p>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* === FINAL CTA === */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black" />
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Tu próxima venta espera un <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">marketing profesional</span>
                    </h2>
                    <p className="text-white/60 mb-10 text-lg max-w-2xl mx-auto">
                        No dejes que la competencia te gane por tener mejor contenido. Únete a los agentes que ya están transformando el mercado.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-white text-black font-bold rounded-full hover:bg-white/90 px-10 py-7 text-lg shadow-xl shadow-white/5"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Empezar Ahora
                        </Button>
                        <Link href="/owners">
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg">
                                Soy Propietario
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
