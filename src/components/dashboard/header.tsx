"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MobileSidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, ChevronDown } from "lucide-react"
import { createClient } from "@/lib/supabase/browser"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function DashboardHeader() {
    const router = useRouter()
    const supabase = createClient()
    const [user, setUser] = useState<SupabaseUser | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    const userInitials = user?.user_metadata?.full_name
        ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
        : user?.email?.[0].toUpperCase() || 'U'

    const displayName = user?.user_metadata?.full_name || user?.email || 'Usuario'
    const userRole = user?.user_metadata?.role || 'agente'

    return (
        <header
            className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30"
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
            }}
        >
            <div className="flex items-center gap-x-4">
                <MobileSidebar />
                <div className="hidden md:block">
                    <h2 className="text-lg font-semibold">Panel de Agente</h2>
                </div>
            </div>

            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                <Link href="/settings">
                    <Button size="sm" variant="outline" className="glass hover:bg-white/50 dark:hover:bg-slate-800/50">
                        Mis Recibos
                    </Button>
                </Link>
                <Separator orientation="vertical" className="h-6" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-x-2 hover:opacity-80 transition-opacity">
                            <span className="text-sm font-medium hidden md:block max-w-[150px] truncate">
                                {displayName}
                            </span>
                            <Avatar className="ring-2 ring-cyan-500/30">
                                <AvatarImage src={user?.user_metadata?.avatar_url} />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col">
                                <span className="font-medium">{displayName}</span>
                                <span className="text-xs text-muted-foreground capitalize">
                                    {userRole === 'agente' ? '🏠 Agente Inmobiliario' : '👤 Cliente'}
                                </span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/profile')}>
                            <User className="mr-2 h-4 w-4" />
                            Mi Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            Configuración
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            Cerrar Sesión
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
