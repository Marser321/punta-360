"use client"

import { Canvas, useThree, useLoader } from "@react-three/fiber"
import { OrbitControls, Html, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { useState, useRef, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Maximize2, RotateCw, ZoomIn, ZoomOut, MapPin, ArrowRightCircle } from "lucide-react"

// --- Types ---
export type HotspotType = 'info' | 'link'

export interface Hotspot {
    position: [number, number, number]
    label: string
    description?: string
    type?: HotspotType
    targetSceneId?: string // Only for 'link' type
}

export interface Scene {
    id: string
    imageUrl: string
    name: string
    hotspots: Hotspot[]
}

// --- Scene Setup ---
function SceneContent({
    imageUrl,
    hotspots,
    onHotspotClick
}: {
    imageUrl: string,
    hotspots: Hotspot[],
    onHotspotClick: (h: Hotspot) => void
}) {
    const texture = useLoader(THREE.TextureLoader, imageUrl).clone()
    texture.mapping = THREE.EquirectangularReflectionMapping
    texture.colorSpace = THREE.SRGBColorSpace

    return (
        <group>
            {/* The 360 Sphere */}
            <mesh scale={[-1, 1, 1]}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>

            {/* Render Hotspots */}
            {hotspots.map((hotspot, idx) => (
                <group key={idx} position={hotspot.position}>
                    <Html center>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className={`
                                            relative group cursor-pointer transition-transform hover:scale-110
                                            ${hotspot.type === 'link' ? 'animate-pulse' : ''}
                                        `}
                                        onClick={() => onHotspotClick(hotspot)}
                                    >
                                        {/* Icon Container */}
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-xl border-2
                                            ${hotspot.type === 'link'
                                                ? 'bg-white/20 border-white text-white hover:bg-white/40'
                                                : 'bg-cyan-500/80 border-cyan-300 text-white hover:bg-cyan-500'}
                                        `}>
                                            {hotspot.type === 'link' ? <ArrowRightCircle size={20} /> : <MapPin size={20} />}
                                        </div>

                                        {/* Label (Always visible for links) */}
                                        <div className={`
                                            absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-bold
                                            ${hotspot.type === 'link' ? 'block' : 'hidden group-hover:block'}
                                        `}>
                                            {hotspot.label}
                                        </div>
                                    </button>
                                </TooltipTrigger>
                                {hotspot.description && (
                                    <TooltipContent className="bg-black/80 border-white/10 text-white max-w-xs">
                                        <p>{hotspot.description}</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </Html>
                </group>
            ))}
        </group>
    )
}

// --- Main Viewer Component ---
interface Viewer360Props {
    initialSceneId?: string
    scenes?: Scene[] // Moving to a multi-scene array
    autoRotate?: boolean
    className?: string
    // Backward compatibility props
    imageUrl?: string
    hotspots?: Hotspot[]
}

export function Viewer360({
    initialSceneId,
    scenes = [],
    autoRotate = true,
    className,
    imageUrl: legacyUrl,
    hotspots: legacyHotspots
}: Viewer360Props) {
    // Normalize props: If legacy props used, create a single scene
    const effectiveScenes = scenes.length > 0 ? scenes : [{
        id: 'default',
        imageUrl: legacyUrl || '',
        name: 'Main View',
        hotspots: legacyHotspots || []
    }]

    const [currentSceneId, setCurrentSceneId] = useState(initialSceneId || effectiveScenes[0].id)
    const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [zoom, setZoom] = useState(1)

    const currentScene = effectiveScenes.find(s => s.id === currentSceneId) || effectiveScenes[0]

    // Refs for controls
    const orbitRef = useRef<any>(null)

    // Handlers
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('viewer-container')?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    const handleHotspotClick = (h: Hotspot) => {
        if (h.type === 'link' && h.targetSceneId) {
            // Transition effect could go here
            console.log("Navigating to:", h.targetSceneId)
            setCurrentSceneId(h.targetSceneId)
        } else {
            console.log("Info hotspot clicked:", h.label)
        }
    }

    const handleZoom = (delta: number) => {
        if (orbitRef.current) {
            // Invert logic for intuitive zoom
            const newZoom = Math.max(0.5, Math.min(2.0, zoom - (delta * 0.2)))
            setZoom(newZoom)
            orbitRef.current.object.zoom = newZoom
            orbitRef.current.object.updateProjectionMatrix()
        }
    }

    return (
        <div
            id="viewer-container"
            className={`relative group overflow-hidden bg-slate-900 ${isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'w-full h-full'
                } ${className}`}
        >
            {/* 3D Canvas */}
            <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
                <Suspense fallback={<Html center><div className="text-white animate-pulse">Cargando Tour...</div></Html>}>
                    <SceneContent
                        imageUrl={currentScene.imageUrl}
                        hotspots={currentScene.hotspots}
                        onHotspotClick={handleHotspotClick}
                    />
                    <OrbitControls
                        ref={orbitRef}
                        enableZoom={false} // We handle zoom manually for smoother UX
                        enablePan={false}
                        autoRotate={isAutoRotating}
                        autoRotateSpeed={0.5}
                        rotateSpeed={-0.5} // Invert rotation for "looking around" feel
                    />
                </Suspense>
            </Canvas>

            {/* Scene Name Badge */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="glass px-4 py-2 rounded-full text-white font-bold shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {currentScene.name}
                </div>
            </div>

            {/* Controls Bar */}
            <div className={`
                absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300
                ${isFullscreen ? 'mb-8 scale-110' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}
            `}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-10 w-10" onClick={() => setIsAutoRotating(!isAutoRotating)}>
                                <RotateCw className={`h-5 w-5 ${isAutoRotating ? 'animate-spin-slow text-cyan-400' : ''}`} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Auto Rotación</p></TooltipContent>
                    </Tooltip>

                    <div className="w-px h-6 bg-white/20 mx-1" />

                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-10 w-10" onClick={() => handleZoom(-1)}>
                        <ZoomIn className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-10 w-10" onClick={() => handleZoom(1)}>
                        <ZoomOut className="h-5 w-5" />
                    </Button>

                    <div className="w-px h-6 bg-white/20 mx-1" />

                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full h-10 w-10" onClick={toggleFullscreen}>
                        <Maximize2 className="h-5 w-5" />
                    </Button>
                </TooltipProvider>
            </div>

            {/* Branding Watermark */}
            <div className="absolute bottom-4 right-4 text-white/30 text-xs font-bold pointer-events-none select-none">
                PUNTA360
            </div>
        </div>
    )
}
