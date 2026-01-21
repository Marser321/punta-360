"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Building2, Camera, Users, TrendingUp } from "lucide-react"

const stats = [
    {
        value: 250,
        suffix: "+",
        label: "Propiedades Listadas",
        icon: Building2,
        color: "text-amber-400"
    },
    {
        value: 1200,
        suffix: "+",
        label: "Tours 360 Creados",
        icon: Camera,
        color: "text-cyan-400"
    },
    {
        value: 85,
        suffix: "%",
        label: "Tasa de Conversión",
        icon: TrendingUp,
        color: "text-green-400"
    },
    {
        value: 50,
        suffix: "+",
        label: "Agencias Activas",
        icon: Users,
        color: "text-purple-400"
    }
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            const duration = 2000
            const steps = 60
            const increment = target / steps
            let current = 0

            const timer = setInterval(() => {
                current += increment
                if (current >= target) {
                    setCount(target)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(current))
                }
            }, duration / steps)

            return () => clearInterval(timer)
        }
    }, [isInView, target])

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    )
}

export function StatsSection() {
    return (
        <section className="py-20 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-cyan-500/5" />

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>

                            <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </div>

                            <p className="text-sm text-white/60">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
