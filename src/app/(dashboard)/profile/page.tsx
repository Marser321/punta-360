"use client"

import { motion } from "framer-motion"
import { User, Mail, Shield, Camera, Edit2, MapPin, Building2, Phone, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/browser"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function ProfilePage() {
    const supabase = createClient()
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setIsLoading(false)
        }
        getUser()
    }, [supabase.auth])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        )
    }

    const displayName = user?.user_metadata?.full_name || user?.email || 'Usuario'
    const userInitials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    const role = user?.user_metadata?.role || 'Agente Inmobiliario'

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative h-48 rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-700 shadow-xl shadow-cyan-900/20"
            >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay opacity-30" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="-mt-20 px-4 flex flex-col items-center md:flex-row md:items-end gap-6"
            >
                <div className="relative group">
                    <Avatar className="h-32 w-32 ring-4 ring-slate-900 shadow-2xl">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-1 right-1 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform">
                        <Camera className="h-4 w-4 text-cyan-600" />
                    </button>
                </div>

                <div className="flex-1 text-center md:text-left md:mb-2">
                    <h1 className="text-3xl font-bold text-white">{displayName}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1 text-slate-400">
                        <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-cyan-500/20">
                            {role}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" /> Punta del Este, URU
                        </span>
                    </div>
                </div>

                <Button className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95">
                    <Edit2 className="mr-2 h-4 w-4" /> Editar Perfil
                </Button>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 space-y-6"
                >
                    <Card className="glass-card border-none backdrop-blur-xl bg-white/5 shadow-2xl rounded-2xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-cyan-500" /> Información Personal
                            </CardTitle>
                            <CardDescription>Detalles básicos de tu cuenta en Punta360</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input
                                        id="name"
                                        value={user?.user_metadata?.full_name || ''}
                                        className="bg-white/5 border-white/10"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="bg-white/5 border-white/10 opacity-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+598 9x xxx xxx"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="agency">Inmobiliaria</Label>
                                    <Input
                                        id="agency"
                                        placeholder="Nombre de tu agencia"
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                            </div>
                            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-xl">Guardar Cambios</Button>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none backdrop-blur-xl bg-white/5 shadow-2xl rounded-2xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-cyan-500" /> Seguridad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex gap-4 items-center">
                                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-cyan-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Verificación de Email</p>
                                        <p className="text-sm text-slate-400">Tu cuenta está verificada</p>
                                    </div>
                                </div>
                                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-bold">ACTIVO</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <Card className="glass-card border-none backdrop-blur-xl bg-white/5 shadow-2xl rounded-2xl overflow-hidden text-center p-6">
                        <div className="h-20 w-20 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                            <Building2 className="h-10 w-10 text-cyan-500" />
                        </div>
                        <h3 className="font-bold text-lg">Plan Agente Individual</h3>
                        <p className="text-sm text-slate-400 mb-6">Gestiona hasta 10 propiedades con tours 360 ilimitados.</p>
                        <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-all">Mejorar Plan</Button>
                    </Card>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-slate-400 uppercase tracking-widest px-1">Estadísticas</h4>
                        <div className="grid gap-4">
                            {[
                                { label: "Propiedades", value: "12", icon: Home, color: "text-blue-400" },
                                { label: "Tours 360", value: "48", icon: Camera, color: "text-purple-400" },
                                { label: "Leads Activos", value: "156", icon: User, color: "text-emerald-400" }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default group">
                                    <div className="flex items-center gap-3">
                                        <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-125 transition-transform`} />
                                        <span className="text-sm">{stat.label}</span>
                                    </div>
                                    <span className="font-bold">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
