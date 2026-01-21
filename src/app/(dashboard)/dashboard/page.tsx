"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Video, Eye, TrendingUp, Users, MessageCircle, ArrowRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { PackPromoBanner } from "@/components/dashboard/pack-promo-banner"
import { MultimediaBanner } from "@/components/banners/multimedia-banner"
import { OrdersList } from "@/components/dashboard/orders-list"
import { DownloadsSection } from "@/components/dashboard/downloads-section"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock Data
const myProperties = [
    {
        id: "1",
        title: "Villa Sol y Mar",
        status: "active",
        location: "La Barra, Punta del Este",
        price: 450000,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300"
    },
    {
        id: "2",
        title: "Penthouse Brava",
        status: "pending",
        location: "Parada 8, Playa Brava",
        price: 890000,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=300"
    },
    {
        id: "3",
        title: "Chacra El Refugio",
        status: "sold",
        location: "José Ignacio",
        price: 1200000,
        image: "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=300"
    }
]

const recentActivity = [
    {
        id: 1,
        avatar: "JD",
        name: "Juan Davis",
        action: "programó visita en",
        property: "Villa Sol y Mar",
        time: "Hace 2 horas"
    },
    {
        id: 2,
        avatar: "SM",
        name: "Sarah Miller",
        action: "ofertó por",
        property: "Penthouse Brava",
        time: "Hace 5 horas"
    },
    {
        id: 3,
        avatar: "CR",
        name: "Carlos Ruiz",
        action: "solicitó info de",
        property: "Chacra El Refugio",
        time: "Hace 1 día"
    }
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <p className="text-muted-foreground text-sm">Lunes, 17 Ene</p>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Bienvenido, <span className="text-primary">Alejandro</span>
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/services/new">
                        <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold rounded-full">
                            <Video className="w-4 h-4 mr-2" />
                            Nuevo Servicio
                        </Button>
                    </Link>
                    <Link href="/properties/new">
                        <Button variant="outline" className="glass hover:bg-white/50 dark:hover:bg-slate-800/50 border-white/20 rounded-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Propiedad
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Spectacular Multimedia Banner */}
            <MultimediaBanner />

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="glass-card border-none rounded-2xl">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Eye className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Vistas Totales</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold">1,240</p>
                                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">+5%</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none rounded-2xl">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <Users className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Nuevos Leads</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold">18</p>
                                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">+12%</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none rounded-2xl">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <MessageCircle className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Mensajes</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold">24</p>
                                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">3 nuevos</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none rounded-2xl">
                    <CardContent className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Rendimiento</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold">87%</p>
                                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Excelente</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <PackPromoBanner />

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-5">

                {/* My Properties */}
                <Card className="lg:col-span-3 glass-card border-none rounded-2xl overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Mis Propiedades</CardTitle>
                        <Link href="/properties">
                            <Button variant="ghost" size="sm" className="text-primary">
                                Ver Todo <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                            {myProperties.map((property) => (
                                <div key={property.id} className="flex items-center p-4 hover:bg-white/5 transition-colors group">
                                    <div className="h-14 w-20 relative rounded-xl overflow-hidden flex-shrink-0 mr-4 shadow-sm">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="object-cover w-full h-full"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=200";
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold truncate text-foreground">{property.title}</p>
                                            <Badge
                                                className={`text-[10px] uppercase font-bold ${property.status === 'active' ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30' :
                                                    property.status === 'pending' ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30' :
                                                        'bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30'
                                                    }`}
                                                variant="outline"
                                            >
                                                {property.status === 'active' ? 'Activo' : property.status === 'pending' ? 'Pendiente' : 'Vendido'}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{property.location}</p>
                                        <p className="text-sm font-bold text-primary mt-1">USD ${property.price.toLocaleString()}</p>
                                    </div>
                                    <Link href={`/p/${property.id}`}>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                                            Ver Ficha
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Latest Activity */}
                <Card className="lg:col-span-2 glass-card border-none rounded-2xl">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                                        {activity.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">
                                        <span className="font-semibold text-foreground">{activity.name}</span>
                                        <span className="text-muted-foreground"> {activity.action} </span>
                                        <span className="font-medium text-foreground">{activity.property}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Service Orders Section */}
            <OrdersList />

            {/* Downloads Section */}
            <DownloadsSection />
        </div>
    )
}
