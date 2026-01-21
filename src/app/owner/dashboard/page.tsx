"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Eye,
    Users,
    TrendingUp,
    Calendar,
    Camera,
    CheckCircle2,
    Clock,
    ArrowRight,
    MessageCircle,
    Star
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock data for owner's property
const myProperty = {
    id: "prop-123",
    title: "Residencia Frente al Mar",
    address: "Playa Brava, Punta del Este",
    price: 1250000,
    status: "active",
    daysOnMarket: 12,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop"
}

// Mock stats with proper color classes
const stats = [
    { label: "Vistas Totales", value: "2,847", change: "+18%", icon: Eye, bgColor: "bg-cyan-500/20", textColor: "text-cyan-400" },
    { label: "Leads Generados", value: "34", change: "+5", icon: Users, bgColor: "bg-amber-500/20", textColor: "text-amber-400" },
    { label: "Engagement", value: "89%", change: "+12%", icon: TrendingUp, bgColor: "bg-green-500/20", textColor: "text-green-400" },
    { label: "Días en Mercado", value: "12", change: "", icon: Calendar, bgColor: "bg-purple-500/20", textColor: "text-purple-400" },
]

// Mock service status
const services = [
    { name: "Fotografía Profesional", status: "completed", date: "15 Ene" },
    { name: "Tour Virtual 360°", status: "completed", date: "16 Ene" },
    { name: "Video Drone 4K", status: "in_progress", date: "18 Ene" },
    { name: "Reels para Instagram", status: "pending", date: "20 Ene" },
]

// Mock activity
const recentActivity = [
    { type: "view", message: "10 nuevas vistas desde Argentina", time: "Hace 2h" },
    { type: "lead", message: "Nuevo lead: María González quiere agendar visita", time: "Hace 5h" },
    { type: "message", message: "Tu agente respondió una consulta", time: "Hace 1d" },
]

export default function OwnerDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                            alt="Juan Pérez"
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50 shadow-lg shadow-amber-500/20"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900" />
                    </div>
                    <div>
                        <p className="text-amber-400/80 text-sm font-medium">Viernes, 17 Ene 2026</p>
                        <h1 className="text-3xl font-bold text-white">
                            ¡Hola, <span className="text-amber-400">Juan</span>!
                        </h1>
                        <p className="text-white/60">Tu propiedad está teniendo un excelente rendimiento.</p>
                    </div>
                </div>
                <Link href="/owner/services">
                    <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-full shadow-lg shadow-amber-500/30">
                        <Camera className="w-4 h-4 mr-2" />
                        Solicitar Servicio
                    </Button>
                </Link>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-amber-500/30 transition-colors">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                        <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/60">{stat.label}</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                                            {stat.change && (
                                                <Badge className="text-xs bg-green-500/20 text-green-400 border-0">
                                                    {stat.change}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Property Preview */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
                        <CardHeader className="pb-0">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-white">Mi Propiedad</CardTitle>
                                <Badge className="bg-green-500/20 text-green-400 border-0">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                    En Vivo
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                        src={myProperty.image}
                                        alt={myProperty.title}
                                        className="object-cover w-full h-full"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-white font-bold">{myProperty.title}</p>
                                        <p className="text-white/70 text-sm">{myProperty.address}</p>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <p className="text-white/60 text-sm">Precio de Venta</p>
                                        <p className="text-3xl font-bold text-amber-400">
                                            USD ${myProperty.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <p className="text-white/60 text-xs">Días en Mercado</p>
                                            <p className="text-xl font-bold text-white">{myProperty.daysOnMarket}</p>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-3">
                                            <p className="text-white/60 text-xs">Rating</p>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                <p className="text-xl font-bold text-white">4.9</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/p/${myProperty.id}`}>
                                        <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                                            Ver Página Pública
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Service Status */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Camera className="w-5 h-5 text-amber-400" />
                                Estado de Servicios
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {services.map((service) => (
                                <div
                                    key={service.name}
                                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {service.status === "completed" ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        ) : service.status === "in_progress" ? (
                                            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-white/40" />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-white">{service.name}</p>
                                            <p className="text-xs text-white/50">{service.date}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        className={`text-xs border-0 ${service.status === "completed"
                                            ? "bg-green-500/20 text-green-400"
                                            : service.status === "in_progress"
                                                ? "bg-amber-500/20 text-amber-400"
                                                : "bg-white/10 text-white/50"
                                            }`}
                                    >
                                        {service.status === "completed" ? "Listo" : service.status === "in_progress" ? "En Proceso" : "Pendiente"}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Activity Feed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 p-3 bg-white/5 rounded-lg">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === "view" ? "bg-cyan-500/20" :
                                        activity.type === "lead" ? "bg-amber-500/20" : "bg-purple-500/20"
                                        }`}>
                                        {activity.type === "view" ? <Eye className="w-5 h-5 text-cyan-400" /> :
                                            activity.type === "lead" ? <Users className="w-5 h-5 text-amber-400" /> :
                                                <MessageCircle className="w-5 h-5 text-purple-400" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white">{activity.message}</p>
                                        <p className="text-white/50 text-sm">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
