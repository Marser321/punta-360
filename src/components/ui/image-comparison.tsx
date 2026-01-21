"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { MoveHorizontal } from "lucide-react"

interface ComparisonProps {
    image: string
    beforeLabel?: string
    afterLabel?: string
}

export function ImageComparison({
    image,
    beforeLabel = "Antes",
    afterLabel = "Después"
}: ComparisonProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()
        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX

        const position = ((clientX - containerRect.left) / containerRect.width) * 100
        setSliderPosition(Math.min(100, Math.max(0, position)))
    }

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false)
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                if (!containerRef.current) return
                const containerRect = containerRef.current.getBoundingClientRect()
                const position = ((e.clientX - containerRect.left) / containerRect.width) * 100
                setSliderPosition(Math.min(100, Math.max(0, position)))
            }
        }

        window.addEventListener('mouseup', handleGlobalMouseUp)
        window.addEventListener('mousemove', handleGlobalMouseMove)

        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp)
            window.removeEventListener('mousemove', handleGlobalMouseMove)
        }
    }, [isDragging])

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10 shadow-2xl group"
            onMouseDown={(e) => { setIsDragging(true); handleMove(e); }}
            onTouchMove={handleMove}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e); }}
        >
            {/* After Image (Pro - Full Quality) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-green-400 border border-green-500/30 font-sans z-10 select-none">
                {afterLabel}
            </div>

            {/* Before Image (Amateur - Filters) */}
            <div
                className="absolute inset-0 bg-cover bg-center border-r-2 border-white pointer-events-none"
                style={{
                    backgroundImage: `url(${image})`,
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    // Simulating bad phone photo: low contrast, weird tint, lower saturation, slight blur
                    filter: "contrast(0.8) brightness(0.9) saturate(0.8) sepia(0.2) blur(1px)"
                }}
            >
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-red-400 border border-red-500/30 font-sans z-10 select-none">
                    {beforeLabel}
                </div>

                {/* Overlay to make it look even flatter/worse */}
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl transform -translate-x-1/2 transition-transform hover:scale-110 active:scale-95">
                    <MoveHorizontal className="w-5 h-5 text-black" />
                </div>
            </div>

            {/* Hint overlay only when not interacted */}
            {sliderPosition === 50 && !isDragging && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500">
                    <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                        Arrastra para ver la magia
                    </div>
                </div>
            )}
        </div>
    )
}
