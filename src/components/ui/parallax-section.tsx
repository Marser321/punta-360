"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxProps {
    imageUrl: string
    children: React.ReactNode
    className?: string
    overlayClass?: string
    speed?: number
}

// Debug Mode: Static Version
// Animated Parallax Version
export function ParallaxSection({
    imageUrl,
    children,
    className,
    overlayClass = "bg-black/50",
    speed = 0.5
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

    return (
        <section
            ref={ref}
            className={cn("relative overflow-hidden flex items-center justify-center", className)}
        >
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 h-[140%] -top-[20%]"
            >
                <img
                    src={imageUrl}
                    alt="Background"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000";
                    }}
                />
            </motion.div>

            <div className={cn("absolute inset-0 z-10", overlayClass)} />

            <div className="relative z-20 w-full">
                {children}
            </div>
        </section>
    )
}

// 3D Tilt Card for Gateway
export function ParallaxCard({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("group perspective-1000", className)}>
            <div className="transition-all duration-500 transform-style-3d group-hover:rotate-x-2 group-hover:rotate-y-2 group-hover:scale-105">
                {children}
            </div>
        </div>
    )
}
