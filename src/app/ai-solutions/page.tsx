"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue } from "framer-motion"
import {
    MessageSquare,
    Cpu,
    Home,
    Calendar,
    Bell,
    Play,
    Pause,
    UserCheck,
    Workflow,
    Puzzle,
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    Zap,
    BarChart3,
    FileText,
    DollarSign,
    Search,
    MapPin,
    Clock,
    Globe,
    Bot,
    Database,
    Layers,
    Users,
    GitBranch,
    Code2,
    Rocket
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AISolutionsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-white/80">IA para Inmobiliarias 2.0</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Automatiza tu <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                                Imperio Inmobiliario
                            </span>
                        </h1>

                        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Deja que la IA maneje los leads, agende visitas y califique clientes mientras tú cierras tratos.
                            Tu oficina de ventas abierta 24/7.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base">
                                Solicitar Demo <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base">
                                Ver Casos de Éxito
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                </div>
            </section>

            {/* Tech Stack Integrations */}
            <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="container px-4 text-center mb-8">
                    <p className="text-white/40 text-sm animate-in fade-in duration-1000 uppercase tracking-widest">Integraciones Nativas & Tech Stack</p>
                </div>

                <div className="relative flex overflow-hidden group">
                    <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
                        {[
                            { name: 'WhatsApp Business', icon: MessageSquare },
                            { name: 'OpenAI GPT-4', icon: Bot },
                            { name: 'Supabase', icon: Database },
                            { name: 'HubSpot', icon: Users },
                            { name: 'Salesforce', icon: BarChart3 },
                            { name: 'Google Cloud', icon: Layers },
                            { name: 'Stripe', icon: DollarSign },
                            { name: 'Next.js 14', icon: Rocket }
                        ].map((tech, i) => (
                            <div key={i} className="flex items-center gap-2 mx-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                                <tech.icon className="w-5 h-5 text-purple-400" />
                                <span className="text-lg font-bold text-white/80">{tech.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap gap-16 items-center">
                        {[
                            { name: 'WhatsApp Business', icon: MessageSquare },
                            { name: 'OpenAI GPT-4', icon: Bot },
                            { name: 'Supabase', icon: Database },
                            { name: 'HubSpot', icon: Users },
                            { name: 'Salesforce', icon: BarChart3 },
                            { name: 'Google Cloud', icon: Layers },
                            { name: 'Stripe', icon: DollarSign },
                            { name: 'Next.js 14', icon: Rocket }
                        ].map((tech, i) => (
                            <div key={`dup-${i}`} className="flex items-center gap-2 mx-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer">
                                <tech.icon className="w-5 h-5 text-purple-400" />
                                <span className="text-lg font-bold text-white/80">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Workflow Demo Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="container px-4">
                    <LiveWorkflowDemo />
                </div>
            </section>

            {/* === NEW FEATURE SHOWCASE: AI TOOLS === */}
            <section className="py-32 bg-slate-950 relative overflow-hidden" id="tools">
                <div className="container px-4 relative z-10">
                    <div className="text-center mb-20">
                        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 mb-4">Innovation Suite</Badge>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                            Herramientas de <span className="text-amber-500">Valor Real</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Creative Studio */}
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all group flex flex-col h-full">
                            <div className="h-16 w-16 rounded-2xl bg-amber-500 flex items-center justify-center mb-8 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">AI Creative Studio</h3>
                            <p className="text-white/50 mb-8 flex-grow">
                                Generación automática de contenido para redes sociales. Sube tu logo y deja que la IA cree Reels y Posts cinematográficos de tus propiedades.
                            </p>
                            <Link href="/dashboard/creative-studio">
                                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl">
                                    Ir al Laboratorio AI
                                </Button>
                            </Link>
                        </div>

                        {/* Staging */}
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group flex flex-col h-full">
                            <div className="h-16 w-16 rounded-2xl bg-purple-500 flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                <Layers className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Virtual Staging IA</h3>
                            <p className="text-white/50 mb-8 flex-grow">
                                Visualización interactiva de espacios. Transforma ambientes vacíos en lujosos sets minimalistas o clásicos instantáneamente.
                            </p>
                            <Link href="/marketplace">
                                <Button variant="outline" className="w-full border-purple-500/30 text-purple-400 font-bold rounded-xl hover:bg-purple-500/10">
                                    Ver Demo en Marketplace
                                </Button>
                            </Link>
                        </div>

                        {/* Intelligence */}
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group flex flex-col h-full">
                            <div className="h-16 w-16 rounded-2xl bg-cyan-500 flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Punta Intelligence</h3>
                            <p className="text-white/50 mb-8 flex-grow">
                                Concierge de inversión. ROI, Yield y proyecciones de plusvalía calculadas por redes neuronales para inversores de élite.
                            </p>
                            <Link href="/marketplace">
                                <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500/10">
                                    Explorar Analíticas
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Horizontal Scroll Features */}
            <HorizontalScrollSection />

            {/* Stats Section */}
            <section className="py-32 relative">
                <div className="container px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedCounter
                            stat={{ value: 24, label: "Horas/día activo", suffix: "/7", icon: Globe }}
                        />
                        <AnimatedCounter
                            stat={{ value: 450, label: "Leads calificados/mes", suffix: "+", icon: UserCheck }}
                            delay={0.2}
                        />
                        <AnimatedCounter
                            stat={{ value: 85, label: "Ahorro en costos", suffix: "%", icon: Zap }}
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Detailed Process Steps */}
            <section className="py-32 bg-black relative">
                <div className="container px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-24">Así construimos tu sistema</h2>

                    <div className="space-y-32">
                        <ProcessStep
                            number="01"
                            title="Diagnóstico Profundo"
                            description="Mapeamos cada interacción de tu negocio. Identificamos dónde se pierden leads, qué procesos consumen más tiempo y dónde la IA puede generar ROI inmediato."
                            details={[
                                "Entrevistas con tu equipo de ventas y operaciones",
                                "Análisis de tu funnel actual y tasas de conversión",
                                "Mapeo de herramientas existentes (CRM, email, etc.)",
                                "Identificación de 'quick wins' para resultados rápidos",
                                "Documentación de flujos ideales vs actuales"
                            ]}
                            tools={[
                                { name: "Miro", icon: Layers },
                                { name: "Notion", icon: FileText },
                                { name: "Loom", icon: Play },
                                { name: "Zoom", icon: Users }
                            ]}
                            floatingApps={[
                                { icon: Layers, label: "Miro", x: "15%", y: "20%", color: "from-yellow-500 to-amber-500", delay: 0.1, size: "lg" },
                                { icon: FileText, label: "Notion", x: "75%", y: "15%", color: "from-slate-400 to-slate-600", delay: 0.2, size: "md" },
                                { icon: Play, label: "Loom", x: "80%", y: "70%", color: "from-purple-500 to-violet-500", delay: 0.3, size: "md" },
                                { icon: Users, label: "Zoom", x: "10%", y: "75%", color: "from-blue-500 to-cyan-500", delay: 0.4, size: "lg" },
                                { icon: BarChart3, label: "Analytics", x: "50%", y: "10%", color: "from-green-500 to-emerald-500", delay: 0.5, size: "sm" },
                                { icon: MessageSquare, label: "Entrevistas", x: "45%", y: "80%", color: "from-pink-500 to-rose-500", delay: 0.6, size: "sm" }
                            ]}
                            accentColor="purple"
                        />

                        <ProcessStep
                            number="02"
                            title="Arquitectura & Diseño"
                            description="Diseñamos la solución técnica completa. Definimos qué modelos de IA usar, cómo conectar tus sistemas y la lógica de cada automatización."
                            details={[
                                "Selección de modelos de IA (GPT-4, Claude, modelos propios)",
                                "Diseño de prompts y entrenamiento de agentes",
                                "Arquitectura de integraciones (APIs, webhooks)",
                                "Definición de triggers y condiciones",
                                "Mockups de interfaces y dashboards"
                            ]}
                            tools={[
                                { name: "n8n", icon: GitBranch },
                                { name: "OpenAI", icon: Bot },
                                { name: "Supabase", icon: Database },
                                { name: "Figma", icon: Layers }
                            ]}
                            floatingApps={[
                                { icon: GitBranch, label: "n8n", x: "20%", y: "25%", color: "from-orange-500 to-red-500", delay: 0.1, size: "lg" },
                                { icon: Bot, label: "OpenAI", x: "70%", y: "20%", color: "from-emerald-500 to-green-600", delay: 0.2, size: "lg" },
                                { icon: Database, label: "Supabase", x: "75%", y: "65%", color: "from-green-500 to-emerald-600", delay: 0.3, size: "md" },
                                { icon: Layers, label: "Figma", x: "15%", y: "70%", color: "from-pink-500 to-purple-500", delay: 0.4, size: "md" },
                                { icon: Cpu, label: "Claude", x: "45%", y: "15%", color: "from-amber-500 to-orange-500", delay: 0.5, size: "sm" },
                                { icon: Workflow, label: "Workflows", x: "50%", y: "85%", color: "from-cyan-500 to-blue-500", delay: 0.6, size: "sm" }
                            ]}
                            accentColor="cyan"
                            isReversed
                        />

                        <ProcessStep
                            number="03"
                            title="Desarrollo Iterativo"
                            description="Construimos tu sistema en sprints de 1-2 semanas. Cada sprint entrega funcionalidad real que puedes probar y usar mientras seguimos construyendo."
                            details={[
                                "Sprints con demos cada semana",
                                "Ambiente de staging para pruebas",
                                "Integración continua con tus sistemas",
                                "Testing automatizado de flujos",
                                "Documentación técnica en tiempo real"
                            ]}
                            tools={[
                                { name: "Next.js", icon: Code2 },
                                { name: "Typescript", icon: FileText },
                                { name: "Vercel", icon: Rocket },
                                { name: "GitHub", icon: GitBranch }
                            ]}
                            floatingApps={[
                                { icon: Code2, label: "Next.js", x: "15%", y: "30%", color: "from-white to-gray-400", delay: 0.1, size: "lg" },
                                { icon: Rocket, label: "Vercel", x: "80%", y: "25%", color: "from-white to-gray-400", delay: 0.2, size: "md" },
                                { icon: GitBranch, label: "GitHub", x: "20%", y: "75%", color: "from-white to-gray-400", delay: 0.3, size: "md" },
                                { icon: FileText, label: "TS", x: "70%", y: "70%", color: "from-blue-500 to-blue-700", delay: 0.4, size: "lg" },
                                { icon: Zap, label: "Fast", x: "50%", y: "15%", color: "from-yellow-400 to-yellow-600", delay: 0.5, size: "sm" },
                                { icon: CheckCircle2, label: "Tests", x: "45%", y: "85%", color: "from-green-500 to-green-700", delay: 0.6, size: "sm" }
                            ]}
                            accentColor="green"
                        />

                        <ProcessStep
                            number="04"
                            title="Despliegue & Soporte"
                            description="Lanzamos a producción y monitoreamos todo 24/7. Incluye capacitación a tu equipo para que sepan aprovechar al máximo las nuevas herramientas."
                            details={[
                                "Despliegue sin tiempo de inactividad",
                                "Capacitación en vivo y grabada para tu equipo",
                                "Soporte prioritario por WhatsApp/Slack",
                                "Mantenimiento y actualizaciones mensuales",
                                "Reportes de ROI mensuales"
                            ]}
                            tools={[
                                { name: "Slack", icon: MessageSquare },
                                { name: "Loom", icon: Play },
                                { name: "Datadog", icon: BarChart3 }
                            ]}
                            floatingApps={[
                                { icon: MessageSquare, label: "Slack", x: "20%", y: "20%", color: "from-purple-500 to-pink-500", delay: 0.1, size: "lg" },
                                { icon: BarChart3, label: "Datadog", x: "75%", y: "30%", color: "from-purple-600 to-violet-600", delay: 0.2, size: "lg" },
                                { icon: Play, label: "Loom", x: "50%", y: "75%", color: "from-purple-500 to-violet-500", delay: 0.3, size: "md" },
                                { icon: UserCheck, label: "Soporte", x: "15%", y: "60%", color: "from-green-500 to-emerald-500", delay: 0.4, size: "md" },
                                { icon: Zap, label: "Live", x: "80%", y: "80%", color: "from-yellow-500 to-orange-500", delay: 0.5, size: "sm" }
                            ]}
                            accentColor="rose"
                            isReversed
                        />
                    </div>
                </div>
            </section>



            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20" />
                <div className="container px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">¿Listo para el futuro?</h2>
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-8 text-xl">
                        Agendar Consultoría Gratis
                    </Button>
                </div>
            </section>
        </div>
    )
}

// ============================================
// LIVE WORKFLOW DEMO
// Interactive simulation of the AI Agent
// ============================================
// ============================================
// ENHANCED LIVE SIMULATION
// Multi-Scenario, Auto-Play, 3D Effects
// ============================================
const SCENARIOS = [
    {
        id: "lead-qual",
        title: "Cualificación de Leads",
        description: "De desconocido a cita agendada en segundos.",
        theme: "emerald", // Green theme
        steps: [
            { id: 1, label: "Cliente envía WhatsApp", icon: MessageSquare },
            { id: 2, label: "IA analiza intención", icon: Cpu },
            { id: 3, label: "Califica presupuesto", icon: DollarSign },
            { id: 4, label: "Busca propiedades", icon: Search },
            { id: 5, label: "Agenda visita", icon: Calendar },
            { id: 6, label: "Notifica al agente", icon: Bell }
        ]
    },
    {
        id: "auto-viewing",
        title: "Agendamiento Automático",
        description: "Coordina visitas 24/7 sin intervención humana.",
        theme: "blue", // Blue theme
        steps: [
            { id: 1, label: "Solicitud de Visita", icon: Home },
            { id: 2, label: "Chequeo de Agenda", icon: Clock },
            { id: 3, label: "Propone Horarios", icon: MessageSquare },
            { id: 4, label: "Cliente Confirma", icon: CheckCircle2 },
            { id: 5, label: "Envía Ubicación", icon: MapPin },
            { id: 6, label: "Sincroniza CRM", icon: Zap }
        ]
    },
    {
        id: "smart-valuation",
        title: "Valuación Inteligente",
        description: "Estimaciones precisas basadas en Big Data.",
        theme: "violet", // Purple theme
        steps: [
            { id: 1, label: "Propietario Consulta", icon: UserCheck },
            { id: 2, label: "Análisis de Mercado", icon: BarChart3 },
            { id: 3, label: "Compara Similares", icon: Search },
            { id: 4, label: "Calcula Precio", icon: DollarSign },
            { id: 5, label: "Genera PDF", icon: FileText },
            { id: 6, label: "Envía Reporte", icon: MessageSquare }
        ]
    }
]

// Theme definitions for dynamic styling
const THEMES = {
    emerald: {
        primary: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        gradient: "from-emerald-500 to-green-400",
        shadow: "shadow-emerald-500/20",
        iconDefault: "text-emerald-500/40",
        iconActive: "text-emerald-400"
    },
    blue: {
        primary: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        gradient: "from-blue-500 to-indigo-400",
        shadow: "shadow-blue-500/20",
        iconDefault: "text-blue-500/40",
        iconActive: "text-blue-400"
    },
    violet: {
        primary: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/20",
        gradient: "from-violet-500 to-purple-400",
        shadow: "shadow-violet-500/20",
        iconDefault: "text-violet-500/40",
        iconActive: "text-violet-400"
    }
}

function LiveWorkflowDemo() {
    const [activeScenario, setActiveScenario] = useState(0)
    const [step, setStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    const currentScenario = SCENARIOS[activeScenario]
    const currentSteps = currentScenario.steps
    const theme = THEMES[currentScenario.theme as keyof typeof THEMES]

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying) {
            interval = setInterval(() => {
                setStep((prev) => {
                    // Check if we are at the last step
                    if (prev >= currentSteps.length - 1) {
                        setTimeout(() => {
                            setStep(0)
                            setActiveScenario((prevScen) => (prevScen + 1) % SCENARIOS.length)
                        }, 1500) // Slightly longer pause at end
                        return prev
                    }
                    return prev + 1
                })
            }, 2000) // Faster pace for dynamism
        }
        return () => clearInterval(interval)
    }, [isPlaying, currentSteps.length])

    return (
        <div className="w-full max-w-6xl mx-auto perspective-1000">
            {/* Stable Main Container */}
            <div
                className={`relative backdrop-blur-3xl rounded-3xl p-6 md:p-10 overflow-hidden border transition-colors duration-700 ease-in-out ${theme.bg} ${theme.border}`}
            >
                {/* Background Ambient Glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-5 blur-[100px] pointer-events-none transition-all duration-700`} />

                {/* Header Section */}
                <div className="text-center mb-8 relative z-20">
                    <div className="inline-flex gap-2 p-1 bg-black/40 rounded-full backdrop-blur-md border border-white/5 mb-6 transform hover:scale-105 transition-transform duration-300">
                        {SCENARIOS.map((scen, idx) => (
                            <button
                                key={scen.id}
                                onClick={() => {
                                    setActiveScenario(idx)
                                    setStep(0)
                                    setIsPlaying(true)
                                }}
                                className={`px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeScenario === idx
                                    ? `bg-white text-black shadow-lg ${theme.shadow} scale-105`
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {scen.title}
                            </button>
                        ))}
                    </div>

                    {/* Animated Title */}
                    <motion.div
                        key={activeScenario}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                            {currentScenario.title}
                        </h3>
                        <p className={`text-base md:text-lg transition-colors duration-500 ${theme.primary} max-w-xl mx-auto opacity-90 font-medium`}>
                            {currentScenario.description}
                        </p>
                    </motion.div>
                </div>


                {/* Workflow Visualization */}
                <div className="relative z-10 flex items-center justify-between mt-4 min-h-[140px] px-4 md:px-8 w-full">

                    {/* Connecting Line Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full" />

                    {/* Active Progress Line */}
                    <motion.div
                        className={`absolute top-1/2 left-0 h-1 bg-gradient-to-r ${theme.gradient} -translate-y-1/2 rounded-full shadow-[0_0_20px_currentColor] transition-all duration-500`}
                        initial={false}
                        animate={{ width: `${(step / (currentSteps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Data Packet "Electron" Animation */}
                    <motion.div
                        className="absolute top-1/2 h-4 w-16 bg-white blur-md -translate-y-1/2 z-20 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{
                            left: `${(step / (currentSteps.length - 1)) * 100}%`,
                            opacity: step === 0 ? 0 : 1
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Step Nodes - REMOVED key wrapper to prevent unmounting/invisible bugs */}
                    <div className="flex justify-between w-full relative z-10">
                        {currentSteps.map((s, index) => {
                            const Icon = s.icon
                            const isActive = index <= step
                            const isCurrent = index === step

                            return (
                                <div
                                    key={s.id} // Simple key
                                    className="relative group flex flex-col items-center justify-center shrink-0 w-20" // Fixed width to prevent collapse
                                >
                                    {/* Node Circle */}
                                    <div
                                        className={`
                                            w-10 h-10 md:w-14 md:h-14 rounded-2xl border-2 flex items-center justify-center
                                            transition-all duration-500 relative z-20
                                            ${isActive ? `${theme.border} bg-black` : "border-white/20 bg-black/40"}
                                            ${isCurrent ? `shadow-[0_0_50px_currentColor] ${theme.primary} ring-2 ring-white/20 scale-125 -translate-y-2` : "scale-100 translate-y-0"}
                                        `}
                                    >
                                        <Icon className={`w-4 h-4 md:w-6 md:h-6 transition-all duration-300 ${isActive ? theme.iconActive : theme.iconDefault}`} />

                                        {/* Pulse Effect */}
                                        {isCurrent && (
                                            <>
                                                <div className={`absolute inset-0 rounded-2xl animate-ping opacity-40 bg-current ${theme.primary}`} />
                                                <div className={`absolute -inset-4 rounded-3xl opacity-20 bg-current ${theme.primary} blur-xl animate-pulse`} />
                                            </>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div
                                        className={`
                                            absolute top-20 text-center w-36 transition-all duration-500
                                            ${isActive ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2"}
                                            ${isCurrent ? "scale-110 font-bold text-white" : "scale-100 text-white/50"}
                                        `}
                                    >
                                        <p className="text-xs md:text-sm">
                                            {s.label}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ============================================
// ANIMATED COUNTER COMPONENT
// Shows stats with counting animation
// ============================================
interface StatType {
    value: number
    label: string
    suffix: string
    icon: React.ComponentType<{ className?: string }>
}

function AnimatedCounter({ stat, delay = 0 }: { stat: StatType; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (isInView) {
            const duration = 2000 // 2 seconds
            const steps = 60
            const increment = stat.value / steps
            let current = 0
            const timer = setInterval(() => {
                current += increment
                if (current >= stat.value) {
                    setCount(stat.value)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(current))
                }
            }, duration / steps)
            return () => clearInterval(timer)
        }
    }, [isInView, stat.value])

    const Icon = stat.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="text-center group"
        >
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 mb-4 group-hover:border-purple-500/30 transition-colors animate-in zoom-in duration-500">
                <Icon className="h-7 w-7 text-purple-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {count.toLocaleString()}<span className="text-purple-400">{stat.suffix}</span>
            </div>
            <p className="text-white/40 text-sm">{stat.label}</p>
        </motion.div>
    )
}

// ============================================
// HORIZONTAL SCROLL SECTION - APPLE STYLE
// ============================================
function HorizontalScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [xPercent, setXPercent] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return
            const { top, height } = containerRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const start = 0
            const end = -height + viewportHeight
            let progress = 0
            if (top > start) progress = 0
            else if (top < end) progress = 1
            else progress = (top - start) / (end - start)

            // Limit updates to meaningful changes to reduce thrashing
            const newPercent = progress * -75
            setXPercent(newPercent)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        window.addEventListener("resize", handleScroll, { passive: true })
        handleScroll()
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleScroll)
        }
    }, [])

    const cards = [
        {
            title: "Captura",
            subtitle: "Omnicanal",
            description: "WhatsApp, Email, Formularios web, Instagram DMs, Llamadas. Todos tus canales en un solo lugar. Sin perder ni un lead.",
            icon: MessageSquare,
            gradient: "from-green-500 to-emerald-600",
            features: ["Integración WhatsApp Business API", "Email parsing automático", "Webhooks personalizados", "API abierta"]
        },

        {
            title: "Análisis",
            subtitle: "IA Profunda",
            description: "Modelos de lenguaje que entienden contexto, intención y urgencia. Clasifican leads, extraen datos y detectan oportunidades.",
            icon: Cpu,
            gradient: "from-purple-500 to-violet-600",
            features: ["GPT-4 / Claude integrado", "Análisis de sentimiento", "Extracción de entidades", "Scoring predictivo"]
        },
        {
            title: "Automatización",
            subtitle: "Sin Límites",
            description: "Flujos que se activan solos. Respuestas instantáneas, seguimientos programados, escalaciones inteligentes.",
            icon: Workflow,
            gradient: "from-cyan-500 to-blue-600",
            features: ["Triggers condicionales", "Delays inteligentes", "Branches A/B", "Loops y retries"]
        },
        {
            title: "Acciones",
            subtitle: "Conectadas",
            description: "Tu CRM, calendario, facturación, y 1000+ apps más. Todo conectado y sincronizado en tiempo real.",
            icon: Puzzle,
            gradient: "from-amber-500 to-orange-600",
            features: ["Zapier/Make integrado", "APIs directas", "Webhooks bidireccionales", "Base de datos propia"]
        }
    ]

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black/40 z-0">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                {/* Visual Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                <motion.div style={{ x: `${xPercent}%` }} className="flex gap-16 pl-[10vw] pr-[10vw]">
                    {cards.map((card, index) => {
                        const Icon = card.icon
                        return (
                            <div
                                key={card.title}
                                className="w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 relative group"
                            >
                                {/* Card Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 rounded-[3rem]`} />

                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 h-full backdrop-blur-xl relative z-10 hover:border-white/20 transition-all duration-500">
                                    <div className={`h-20 w-20 rounded-3xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-8 shadow-lg shadow-black/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                        <Icon className="h-10 w-10 text-white" />
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{card.title}</h3>
                                        <p className={`text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r ${card.gradient}`}>
                                            {card.subtitle}
                                        </p>
                                    </div>

                                    <p className="text-xl text-white/60 mb-8 leading-relaxed max-w-2xl">
                                        {card.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {card.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both"
                                                style={{ animationDelay: `${i * 100}ms` }}
                                            >
                                                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${card.gradient}`} />
                                                <span className="text-white/70 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

// ============================================
// FLOATING APP ICON COMPONENT
// Orbiting icons around the process visual
// ============================================
function FloatingAppIcon({ icon: Icon, label, x, y, color, delay, size = "md" }: {
    icon: React.ComponentType<{ className?: string }>,
    label: string,
    x: string,
    y: string,
    color: string,
    delay: number,
    size?: "sm" | "md" | "lg"
}) {
    const sizeClasses = {
        sm: "h-10 w-10",
        md: "h-14 w-14",
        lg: "h-20 w-20"
    }

    const iconSizes = {
        sm: "h-5 w-5",
        md: "h-7 w-7",
        lg: "h-10 w-10"
    }

    return (
        <motion.div
            animate={{
                y: [0, -10, 0, 10, 0],
                x: [0, 5, 0, -5, 0],
            }}
            transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: delay
            }}
            whileHover={{ scale: 1.2, zIndex: 50 }}
            style={{ left: x, top: y }}
            className="absolute z-20 group cursor-pointer"
        >
            <div className={`
                ${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${color} 
                flex items-center justify-center shadow-lg shadow-black/20
                ring-1 ring-white/20 backdrop-blur-md
            `}>
                <Icon className={`${iconSizes[size]} text-white drop-shadow-md`} />
            </div>

            {/* Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-white/10 pointer-events-none z-50">
                {label}
            </div>
        </motion.div>
    )
}

// ============================================
// ANIMATED PROCESS VISUAL
// High-end animated graphic for each step
// ============================================
function AnimatedProcessVisual({ number, apps, accentColor }: { number: string, apps: any[], accentColor: string }) {
    const gradients: Record<string, string> = {
        purple: "from-purple-500/20 to-indigo-500/20",
        cyan: "from-cyan-500/20 to-blue-500/20",
        green: "from-green-500/20 to-emerald-500/20",
        rose: "from-pink-500/20 to-rose-500/20"
    }

    return (
        <div className="relative aspect-square max-w-[600px] mx-auto">
            {/* Orbital Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-[15%] rounded-full border border-white/10 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-[30%] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />

            {/* Central Core */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${gradients[accentColor]} blur-[60px] animate-pulse`} />
                <div className="relative z-10 text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10 tracking-tighter">
                    {number}
                </div>
            </div>

            {/* Floating Apps */}
            {apps.map((app, i) => (
                <FloatingAppIcon key={i} {...app} />
            ))}
        </div>
    )
}

// ============================================
// PROCESS STEP COMPONENT
// Detailed explanation of each step
// ============================================
function ProcessStep({
    number,
    title,
    description,
    details,
    tools,
    floatingApps,
    accentColor,
    isReversed = false
}: {
    number: string,
    title: string,
    description: string,
    details: string[],
    tools: { name: string, icon: any }[],
    floatingApps: any[],
    accentColor: string,
    isReversed?: boolean
}) {
    // FORCE VISIBILITY: Removed complex scroll-triggered entrance animations
    // that were causing elements to remain hidden.
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? "md:flex-row-reverse" : ""} animate-in fade-in slide-in-from-bottom-10 duration-700`}
        >
            <div className={isReversed ? "md:order-2" : ""}>
                <div className="text-[12rem] font-bold text-white/[0.02] absolute -left-12 -top-12 leading-none select-none pointer-events-none">{number}</div>
                <div className="relative z-10 pl-6 md:pl-10">
                    <div className="text-sm font-bold text-purple-400 mb-2 tracking-widest uppercase">PASO {number}</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
                    <p className="text-xl text-white/60 mb-8 leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-3 mb-8">
                        {details.map((detail, i) => (
                            <div
                                key={detail}
                                className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-700 fill-mode-both"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <ChevronRight className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/70">{detail}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tools Used */}
                    <div>
                        <p className="text-white/30 text-sm mb-3">Herramientas:</p>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool, i) => {
                                const Icon = tool.icon
                                return (
                                    <div
                                        key={tool.name}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 cursor-default animate-in zoom-in duration-500 fill-mode-both"
                                        style={{ animationDelay: `${i * 50}ms` }}
                                    >
                                        <Icon className="h-4 w-4 text-white/40" />
                                        <span className="text-sm text-white/60">{tool.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className={isReversed ? "md:order-1" : ""}>
                <AnimatedProcessVisual
                    number={number}
                    apps={floatingApps}
                    accentColor={accentColor}
                />
            </div>
        </div>
    )
}
