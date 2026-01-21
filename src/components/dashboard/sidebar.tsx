
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Home, ShoppingBag, Menu, Users, Store, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Mis Propiedades",
        icon: Home,
        href: "/properties",
        color: "text-violet-500",
    },
    {
        label: "Marketplace",
        icon: Store,
        href: "/marketplace",
        color: "text-amber-500",
    },
    {
        label: "Gestión de Leads",
        icon: Users,
        href: "/leads",
        color: "text-emerald-500",
    },
    {
        label: "Servicios Multimedia",
        icon: ShoppingBag,
        href: "/services/new",
        color: "text-pink-700",
    },
    {
        label: "Soluciones IA",
        icon: Bot,
        href: "/ai-solutions",
        color: "text-purple-500",
        isNew: true,
    },
]



export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-transparent text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <Logo size="md" />
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-lg",
                                pathname === route.href || pathname.startsWith(route.href + '/') ? "text-white bg-white/15 border border-white/10 shadow-lg backdrop-blur-md" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 transition-transform group-hover:scale-110", route.color)} />
                                {route.label}
                                {'isNew' in route && route.isNew && (
                                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                                        NEW
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="glass-card rounded-2xl p-4 border border-white/5">
                    <a href="mailto:soporte@punta360.com" className="flex items-center gap-3 mb-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer block">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center">
                            <span className="text-xs font-bold">?</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Ayuda</p>
                            <p className="text-[10px] text-zinc-400">Soporte 24/7</p>
                        </div>
                    </a>

                    <button
                        onClick={async () => {
                            const { supabase } = await import("@/lib/supabase/client")
                            await supabase.auth.signOut()
                            window.location.href = "/"
                        }}
                        className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-medium py-2 rounded-lg transition-colors border border-white/5"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-none w-72">
                <DashboardSidebar />
            </SheetContent>
        </Sheet>
    )
}
