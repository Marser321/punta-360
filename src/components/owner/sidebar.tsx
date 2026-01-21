"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Home,
    Camera,
    MessageCircle,
    Settings,
    LogOut,
    Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/owner/dashboard",
    },
    {
        label: "Mi Propiedad",
        icon: Home,
        href: "/owner/property",
    },
    {
        label: "Servicios",
        icon: Camera,
        href: "/owner/services",
    },
    {
        label: "Mensajes",
        icon: MessageCircle,
        href: "/owner/messages",
        badge: 2
    },
]

export function OwnerSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full py-6">
            {/* Logo */}
            <div className="px-6 mb-8 pt-2">
                <Link href="/owner/dashboard" className="flex items-center gap-3">
                    <Logo size="md" variant="full" />
                </Link>
                <div className="mt-2 ml-10">
                    <p className="text-[10px] uppercase tracking-widest text-amber-500/60 font-medium">Portal Propietario</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                            pathname === route.href
                                ? "bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <route.icon className="w-5 h-5" />
                        {route.label}
                        {route.badge && (
                            <span className="ml-auto bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                {route.badge}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="px-3 mt-auto space-y-2">
                <Link
                    href="/owner/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                >
                    <Settings className="w-5 h-5" />
                    Configuración
                </Link>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}
