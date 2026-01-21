"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Camera,
    Globe,
    Video,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Building2,
    TrendingUp,
    Users,
    Star
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ParallaxSection } from "@/components/ui/parallax-section"

const benefits = [
    {
        icon: Camera,
        title: "Fotografía Editorial",
        description: "Capturamos la esencia de tu propiedad con calidad de revista internacional."
    },
    {
        icon: Globe,
        title: "Tour Inmersivo 3D",
        description: "Permite que compradores de Miami o Madrid caminen por tu casa hoy."
    },
    {
        icon: Video,
        title: "Cinematografía Aérea",
        description: "Perspectivas de drone que destacan el entorno y la ubicación privilegiada."
    },
    {
        icon: Sparkles,
        title: "Estrategia de Redes",
        description: "Contenido vertical viral diseñado para alcanzar audiencias de alto valor."
    }
]

const steps = [
    { number: "01", title: "Agenda tu Visita", description: "Coordinamos una tasación profesional sin compromiso." },
    { number: "02", title: "Producción Visual", description: "Nuestro equipo creativo transforma tu propiedad en una obra de arte." },
    { number: "03", title: "Lanzamiento Global", description: "Impactamos en portales de lujo y nuestra red de inversores." },
    { number: "04", title: "Cierre Exitoso", description: "Negociación experta y gestión legal hasta la entrega de llaves." }
]

const testimonials = [
    {
        name: "María González",
        role: "Vendió en José Ignacio",
        quote: "La calidad visual fue impactante. Vendimos en 45 días a un cliente que vio el video en Instagram.",
        avatar: "MG"
    },
    {
        name: "Roberto Fernández",
        role: "Vendió en Punta del Este",
        quote: "Profesionalismo puro. El tour 360 filtró muchas visitas innecesarias, trayendo solo interesados reales.",
        avatar: "RF"
    }
]

export default function OwnersLandingPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Parallax Hero - Updated Image (Luxury Villa Twilight) */}
            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000"
                className="min-h-[90vh]"
                overlayClass="bg-gradient-to-b from-black/60 via-black/40 to-black/90"
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30 text-sm px-4 py-1">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Gestión Premium de Propiedades
                        </Badge>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                            Eleva el Valor de<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                Tu Inversión
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-lg font-light">
                            Transformamos propiedades en experiencias irresistibles.
                            <br className="hidden md:block" />
                            Fotografía de revista, tours virtuales y estrategia digital.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/owner/register">
                                <Button size="lg" className="bg-white text-black font-bold text-lg px-8 py-6 rounded-full shadow-2xl hover:bg-gray-200 transition-all">
                                    Quiero Vender / Alquilar
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/enterprise">
                                <Button size="lg" variant="outline" className="backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full">
                                    Soy Inmobiliaria
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                        <div className="w-1.5 h-3 bg-white/80 rounded-full" />
                    </div>
                </motion.div>
            </ParallaxSection>

            {/* Stats Bar */}
            <section className="bg-neutral-900 border-y border-white/5 py-12 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-3xl md:text-5xl font-bold text-white mb-2">98%</p>
                            <p className="text-white/50 text-sm uppercase tracking-wider">Efectividad</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-3xl md:text-5xl font-bold text-white mb-2">45</p>
                            <p className="text-white/50 text-sm uppercase tracking-wider">Días Promedio</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-3xl md:text-5xl font-bold text-white mb-2">+850</p>
                            <p className="text-white/50 text-sm uppercase tracking-wider">Propiedades</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <p className="text-3xl md:text-5xl font-bold text-white mb-2">24h</p>
                            <p className="text-white/50 text-sm uppercase tracking-wider">Soporte</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parallax Services - Modern Interior */}
            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
                className="py-32"
                overlayClass="bg-black/70 backdrop-blur-[2px]"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-white/10 text-white border-white/20">
                            Marketing Visual
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            La Primera Impresión <br />
                            <span className="text-amber-400">Es la Única que Cuenta</span>
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
                            No solo publicamos propiedades. Creamos narrativas visuales que enamoran a los compradores antes de que pongan un pie en la casa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-black/40 border-white/10 backdrop-blur-xl h-full hover:bg-white/10 transition-all hover:scale-105 duration-300 group">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-amber-500 transition-colors">
                                            <benefit.icon className="w-8 h-8 text-amber-500 group-hover:text-black transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ParallaxSection>

            {/* How it Works - Minimal */}
            <section className="py-24 bg-black relative z-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Simple & Transparente
                            </h2>
                            <p className="text-white/50 text-lg max-w-md">
                                Un proceso diseñado para tu tranquilidad y resultados máximos.
                            </p>
                        </div>
                        <Link href="/owner/register">
                            <Button variant="link" className="text-amber-400 text-lg p-0 hover:text-white transition-colors">
                                Ver detalles del proceso <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                className="relative pl-8 border-l border-white/10"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-amber-500" />
                                <div className="text-5xl font-bold text-white/10 mb-4 font-mono">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-white/50 text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parallax Reviews - Lifestyle Image */}
            <ParallaxSection
                imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000"
                className="py-32"
                overlayClass="bg-gradient-to-t from-black via-black/80 to-transparent"
            >
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                            <Star className="w-4 h-4 mr-1 fill-amber-400" />
                            Experiencias Reales
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Historias de Éxito
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-black/60 border-none backdrop-blur-md">
                                    <CardContent className="p-8">
                                        <div className="flex gap-1 mb-6">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                        <p className="text-white text-xl mb-8 font-light leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg border border-white/20">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{testimonial.name}</p>
                                                <p className="text-white/50 text-sm">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </ParallaxSection>

            {/* CTA Final - Clean */}
            <section className="py-24 bg-white relative z-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                        ¿Hablamos de Negocios?
                    </h2>
                    <p className="text-gray-500 text-xl mb-12 max-w-2xl mx-auto">
                        Agenda una tasación gratuita y descubre el verdadero potencial de tu propiedad en el mercado actual.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/owner/register">
                            <Button size="lg" className="bg-black text-white font-bold text-lg px-10 py-7 rounded-full hover:scale-105 transition-transform">
                                Agendar Tasación
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="border-gray-200 text-black hover:bg-gray-50 text-lg px-10 py-7 rounded-full">
                            Ver Casos de Éxito
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-black border-t border-white/10 relative z-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center gap-8 mb-8 text-white/40">
                        <Link href="#" className="hover:text-white transition-colors">Términos</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contacto</Link>
                    </div>
                    <p className="text-white/20 text-sm">
                        © 2026 Punta360. Real Estate Excellence.
                    </p>
                </div>
            </footer>
        </div>
    )
}
