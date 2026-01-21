"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "María Fernández",
        role: "Directora, Fernández Propiedades",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        quote: "Desde que usamos Punta360, nuestras propiedades se venden 40% más rápido. Los tours 360 son una herramienta imprescindible.",
        rating: 5
    },
    {
        name: "Carlos Mendoza",
        role: "CEO, Mendoza Real Estate",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        quote: "El servicio de drone elevó completamente la presentación de nuestras propiedades premium. Clientes de Argentina y Brasil quedan impresionados.",
        rating: 5
    },
    {
        name: "Ana Lucía Barrios",
        role: "Broker Independiente",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        quote: "Increíble calidad y velocidad. Solicito el pack completo y en 48 horas tengo material listo para publicar en todos mis canales.",
        rating: 5
    }
]

export function TestimonialsSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] -translate-y-1/2" />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Lo que dicen nuestros <span className="text-amber-400">clientes</span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Inmobiliarias líderes de Punta del Este confían en nosotros
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 relative">
                                {/* Quote Icon */}
                                <div className="absolute -top-4 -left-2">
                                    <Quote className="w-12 h-12 text-amber-500/20" />
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-white/80 leading-relaxed mb-6 italic">
                                    &quot;{testimonial.quote}&quot;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30"
                                    />
                                    <div>
                                        <p className="font-semibold text-white">{testimonial.name}</p>
                                        <p className="text-sm text-white/50">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
