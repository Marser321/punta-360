"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Layout,
    Home,
    Palmtree,
    Maximize,
    MousePointer2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const STYLES = [
    {
        id: "original",
        name: "Estado Actual",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
        description: "Vista de la propiedad en su estado de entrega."
    },
    {
        id: "modern",
        name: "Lujo Minimalista",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
        description: "Mobiliario italiano, tonos neutros y espacios abiertos."
    },
    {
        id: "classic",
        name: "Clásico Europeo",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
        description: "Elegancia atemporal con maderas nobles y detalles dorados."
    }
]

export function VirtualStagingSlider() {
    const [activeStyle, setActiveStyle] = useState(STYLES[1]) // Default to Modern
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return

        const container = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
        const position = ((x - container.left) / container.width) * 100

        setSliderPosition(Math.max(0, Math.min(100, position)))
    }

    return (
        <div className="space-y-6">
            {/* Style Selector */}
            <div className="flex flex-wrap gap-2">
                {STYLES.map((style) => (
                    <Button
                        key={style.id}
                        onClick={() => setActiveStyle(style)}
                        variant={activeStyle.id === style.id ? "default" : "outline"}
                        className={`rounded-full text-xs h-8 ${activeStyle.id === style.id
                                ? "bg-purple-600 hover:bg-purple-700"
                                : "border-white/10 text-white/60 hover:text-white"
                            }`}
                    >
                        {style.id !== 'original' && <Sparkles className="w-3 h-3 mr-2" />}
                        {style.name}
                    </Button>
                ))}
            </div>

            {/* Slider Container */}
            <div
                className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-col-resize select-none shadow-2xl"
                onMouseMove={handleMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={handleMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
            >
                {/* Background (Fixed to Modern/AI Style) */}
                <img
                    src={activeStyle.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Staged"
                />

                {/* Foreground (Clipped Original State) */}
                <div
                    className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white/50 z-10"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={STYLES[0].image}
                        className="absolute inset-0 w-[100vw] h-full object-cover" // Using vw to keep original aspect
                        style={{ width: '100%' }}
                        alt="Original"
                    />
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 z-20 w-1 bg-white flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="h-10 w-10 rounded-full bg-white border-2 border-purple-500 shadow-xl flex items-center justify-center -ml-[4px]">
                        <div className="flex gap-0.5">
                            <ChevronLeft className="w-3 h-3 text-purple-600" />
                            <ChevronRight className="w-3 h-3 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <Badge className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1">
                        Estado Actual
                    </Badge>
                </div>
                <div className="absolute top-4 right-4 z-20 pointer-events-none text-right">
                    <Badge className="bg-purple-600/90 backdrop-blur-md border border-purple-400 text-white px-3 py-1">
                        Estilo: {activeStyle.name}
                    </Badge>
                </div>

                {/* Hint Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/10">
                        <MousePointer2 className="w-3 h-3 text-white/60" />
                        <span className="text-[10px] font-medium text-white/80 uppercase tracking-widest">Desliza para comparar</span>
                    </div>
                </div>
            </div>

            {/* Description Card */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="p-2 rounded-lg bg-purple-500/20">
                    <Layout className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h5 className="text-sm font-bold text-white mb-1">{activeStyle.name}</h5>
                    <p className="text-xs text-white/60 leading-relaxed">
                        {activeStyle.description} Imagina este espacio adaptado a tu estilo de vida. La IA de Punta360 permite explorar infinitas posibilidades arquitectónicas.
                    </p>
                </div>
            </div>
        </div>
    )
}
