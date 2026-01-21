"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Globe, Play, Camera, Video } from "lucide-react"
import Link from "next/link"

export function PackPromoBanner() {
    return (
        <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-white shadow-2xl rounded-3xl">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <CardContent className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left: Text Content */}
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2 text-amber-300 font-semibold tracking-wide text-sm uppercase">
                        <Sparkles className="w-4 h-4" />
                        <span>Premium Exclusive</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white">
                        ¿Clientes en el extranjero? <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">Pack Punta Lujo 360°</span>
                    </h3>
                    <p className="text-white/80 text-sm md:text-base max-w-lg">
                        Tour Virtual + Drone 4K + Reels virales. Cierra ventas sin que el cliente viaje.
                    </p>
                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2 text-xs text-white/70">
                            <Globe className="w-4 h-4" />
                            <span>Visibilidad Global</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/70">
                            <Camera className="w-4 h-4" />
                            <span>Foto Pro</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/70">
                            <Video className="w-4 h-4" />
                            <span>Video 4K</span>
                        </div>
                    </div>
                </div>

                {/* Center: Image Preview Stack */}
                <div className="relative flex-shrink-0 hidden md:block">
                    <div className="relative">
                        {/* Back card */}
                        <div className="absolute -top-2 -left-4 w-36 h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg transform -rotate-6">
                            <img
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=300"
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=300";
                                }}
                            />
                        </div>
                        {/* Front card */}
                        <div className="relative w-44 h-28 rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl z-10 group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=400"
                                alt="Tour 360"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400";
                                }}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                                    <Play className="w-4 h-4 text-blue-600 ml-0.5" />
                                </div>
                            </div>
                            <div className="absolute top-2 right-2 bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                360°
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: CTA */}
                <div className="flex-shrink-0">
                    <Link href="/services/new">
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-amber-100 hover:text-amber-900 border-0 shadow-xl group font-bold rounded-full px-8">
                            Solicitar Ahora
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
