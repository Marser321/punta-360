"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Building2, Key, LayoutDashboard, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParallaxCard } from "@/components/ui/parallax-section"

export default function GatewayPage() {
  const portals = [
    {
      title: "Propietarios",
      description: "Gestiona tu propiedad, revisa el rendimiento y consulta tus reservas en tiempo real.",
      icon: Key,
      link: "/owners", // Restore redirect to Owners landing page
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      color: "from-amber-400 to-orange-500",
      glow: "group-hover:shadow-[0_0_50px_-12px_rgba(251,191,36,0.5)]"
    },
    {
      title: "Agencias y Agentes",
      description: "Accede a herramientas de marketing premium, tours 360° y gestión de leads.",
      icon: Building2,
      link: "/enterprise",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      color: "from-cyan-400 to-blue-500",
      glow: "group-hover:shadow-[0_0_50px_-12px_rgba(34,211,238,0.5)]"
    },
    {
      title: "Equipo Interno",
      description: "Acceso administrativo para gestión de CRM, propiedades y operaciones.",
      icon: ShieldCheck,
      link: "/dashboard",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      color: "from-purple-400 to-indigo-500",
      glow: "group-hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)]"
    }
  ]

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center bg-slate-950">
      {/* === CINEMATIC BACKGROUND === */}
      <div className="absolute inset-0 z-0">
        {/* 1. Base Image - Luxury Twilight Shot */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2560&auto=format&fit=crop')` }}
        />

        {/* 2. Gradient Overlays for Readability but Color */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-slate-950/70 to-black/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-cyan-500/20 mix-blend-overlay" />
      </div>

      {/* === AMBIENT LIGHTS === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Warm Glow (Owner Side) */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-600/20 rounded-full blur-[120px] animate-pulse" />

        {/* Cool Glow (Enterprise Side) */}
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[60%] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Deep Glow (Bottom) */}
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Punta360</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            La plataforma inmobiliaria integral con IA más avanzada de Latinoamérica.
            <br />Selecciona tu perfil o explora el marketplace.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">


          {portals.map((portal, index) => (
            <Link key={portal.title} href={portal.link} className="block h-full">
              <ParallaxCard className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`group relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 ${portal.glow}`}
                >
                  {/* Background Image overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-cover bg-center"
                    style={{ backgroundImage: `url(${portal.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative p-8 flex flex-col h-full min-h-[320px]">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <portal.icon className="w-7 h-7 text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                      {portal.title}
                    </h2>

                    <p className="text-white/50 group-hover:text-white/80 transition-colors leading-relaxed mb-8 flex-grow">
                      {portal.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                      Ingresar al Portal <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </ParallaxCard>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 text-center text-white/30 text-sm"
        >
          © 2026 Punta360 Real Estate Technology. Todos los derechos reservados.
        </motion.div>
      </div>
    </main>
  )
}
