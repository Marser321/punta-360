"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2,
    Navigation,
    Home,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TourRoom {
    id: string
    url: string
    room_name: string
    position: number
}

interface ConnectedTourViewerProps {
    rooms: TourRoom[]
    propertyTitle?: string
    className?: string
}

export function ConnectedTourViewer({
    rooms,
    propertyTitle = "Propiedad",
    className
}: ConnectedTourViewerProps) {
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showRoomSelector, setShowRoomSelector] = useState(false)

    if (!rooms || rooms.length === 0) {
        return (
            <div className={cn(
                "flex items-center justify-center bg-slate-900/50 rounded-2xl border border-white/10 p-8",
                className
            )}>
                <div className="text-center text-white/50">
                    <Navigation className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No hay tour 360° disponible</p>
                </div>
            </div>
        )
    }

    const currentRoom = rooms[currentRoomIndex]
    const hasMultipleRooms = rooms.length > 1

    const goToRoom = (index: number) => {
        setCurrentRoomIndex(index)
        setShowRoomSelector(false)
    }

    const nextRoom = () => {
        setCurrentRoomIndex((prev) => (prev + 1) % rooms.length)
    }

    const prevRoom = () => {
        setCurrentRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length)
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    const viewerContent = (
        <div className="relative w-full h-full">
            {/* Pannellum Viewer - Using iframe for CDN version */}
            <iframe
                key={currentRoom.url}
                src={`https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${encodeURIComponent(currentRoom.url)}&autoLoad=true&title=${encodeURIComponent(currentRoom.room_name)}&compass=true&autoRotate=-2`}
                className="w-full h-full border-0"
                allow="fullscreen"
                title={currentRoom.room_name}
            />

            {/* Room Navigation Overlay */}
            {hasMultipleRooms && (
                <>
                    {/* Previous/Next Buttons */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={prevRoom}
                            className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={nextRoom}
                            className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </>
            )}

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-cyan-500/80 text-white border-0">
                            <Navigation className="w-3 h-3 mr-1" />
                            360°
                        </Badge>
                        <span className="text-white font-medium text-lg drop-shadow-lg">
                            {currentRoom.room_name}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isFullscreen && (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={toggleFullscreen}
                                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        )}
                        {!isFullscreen && (
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={toggleFullscreen}
                                className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Room Selector */}
            {hasMultipleRooms && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
                        {rooms.map((room, index) => (
                            <button
                                key={room.id}
                                onClick={() => goToRoom(index)}
                                className={cn(
                                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    index === currentRoomIndex
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                        : "bg-black/50 text-white/70 hover:bg-black/70 hover:text-white backdrop-blur-sm"
                                )}
                            >
                                {room.room_name}
                            </button>
                        ))}
                    </div>
                    <div className="text-center mt-2 text-white/50 text-xs">
                        {currentRoomIndex + 1} de {rooms.length} habitaciones
                    </div>
                </div>
            )}
        </div>
    )

    // Fullscreen mode
    if (isFullscreen) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black"
                >
                    {viewerContent}
                </motion.div>
            </AnimatePresence>
        )
    }

    // Normal embedded mode
    return (
        <div className={cn(
            "relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900",
            className
        )}>
            <div className="aspect-video">
                {viewerContent}
            </div>
        </div>
    )
}
