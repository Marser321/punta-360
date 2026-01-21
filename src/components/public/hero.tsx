
"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function PropertyHero({ title, address, price, videoUrl }: { title: string, address: string, price: string, videoUrl: string }) {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            {/* Fallback Background Image (always visible) */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Video Background (on top of image) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop"
            >
                <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Content - Added padding bottom to avoid overlap with floating glass card */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pb-32 text-white max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/20 text-white shadow-sm">
                            Venta Exclusiva
                        </span>
                        <span className="bg-gradient-to-r from-orange-500 to-red-600 px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20">
                            {price}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-100 mb-8 flex items-center font-light tracking-wide shadow-black drop-shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {address}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            className="bg-white text-black hover:bg-zinc-200 border-none text-md rounded-full px-8 shadow-xl shadow-white/10"
                            onClick={() => document.getElementById('tour-360')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Ver Tour 360
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white/30 hover:bg-white/10 text-md backdrop-blur-md bg-white/5 rounded-full px-8 group"
                            onClick={() => window.open('https://www.instagram.com/reels', '_blank')}
                        >
                            <span className="mr-2 hidden group-hover:inline-block">📺</span> Ver Video Reel
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
