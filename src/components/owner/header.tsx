"use client"

import { Button } from "@/components/ui/button"
import { Bell, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "@/components/ui/logo"
import Link from "next/link"
import { toast } from "sonner"
import { MobileOwnerSidebar } from "./sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { createClient } from "@/lib/supabase/browser"
import { useRouter } from "next/navigation"

export function OwnerHeader() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut()
            toast.success("Sesión cerrada")
            router.push("/")
            router.refresh()
        } catch (error) {
            toast.error("Error al salir")
        }
    }
    return (
        <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-amber-500/10 sticky top-0 z-30">
            {/* Mobile Menu */}
            <MobileOwnerSidebar />

            {/* Mobile/Default Logo */}
            <div className="md:hidden">
                <Link href="/owner/dashboard">
                    <Logo size="sm" />
                </Link>
            </div>

            {/* Greeting */}
            <div className="hidden md:block">
                <p className="text-white/60 text-sm">Bienvenido de vuelta</p>
                <h2 className="text-lg font-semibold text-white">Portal del Propietario</h2>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toast.info("No tienes notificaciones pendientes")}
                    className="relative text-white/70 hover:text-white hover:bg-white/10"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
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
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-stone-900 border-amber-500/20 text-white">
                        <DropdownMenuLabel className="text-white/60 font-normal">Mi Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={() => router.push("/owner/settings")} className="hover:bg-amber-500/10 focus:bg-amber-500/10 cursor-pointer">
                            <User className="mr-2 h-4 w-4 text-amber-400" />
                            <span>Mi Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/owner/settings")} className="hover:bg-amber-500/10 focus:bg-amber-500/10 cursor-pointer">
                            <Settings className="mr-2 h-4 w-4 text-amber-400" />
                            <span>Configuración</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Cerrar Sesión</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
