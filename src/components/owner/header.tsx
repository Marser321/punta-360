"use client"

import { Button } from "@/components/ui/button"
import { Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function OwnerHeader() {
    return (
        <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-amber-500/10 sticky top-0 z-30">
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-6 w-6" />
            </Button>

            {/* Greeting */}
            <div className="hidden md:block">
                <p className="text-white/60 text-sm">Bienvenido de vuelta</p>
                <h2 className="text-lg font-semibold text-white">Portal del Propietario</h2>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-white/70 hover:text-white hover:bg-white/10">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                </Button>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-amber-500/50 ring-2 ring-amber-400/20">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-600 text-black font-bold">
                            JP
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-white">Juan Pérez</p>
                        <p className="text-xs text-amber-400">Propietario Premium</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
