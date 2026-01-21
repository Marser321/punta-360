"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    Package,
    Clock,
    CheckCircle2,
    Loader2,
    Download,
    Calendar,
    MapPin,
    Camera,
    Plane,
    Video,
    Sparkles,
    ArrowRight,
    Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ServiceOrder {
    id: string
    service_type: string
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    scheduled_date: string
    notes?: string
    created_at: string
    property?: {
        id: string
        title: string
        address?: string
    }
}

const statusConfig = {
    pending: {
        label: "Pendiente",
        icon: Clock,
        color: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
    },
    in_progress: {
        label: "En Producción",
        icon: Loader2,
        color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
        animate: true
    },
    completed: {
        label: "Completado",
        icon: CheckCircle2,
        color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
    },
    cancelled: {
        label: "Cancelado",
        icon: Package,
        color: "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30"
    }
}

const serviceTypeConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    pack_full: { label: "Pack Punta Lujo 360°", icon: Sparkles },
    virtual_tour: { label: "Tour Virtual 360°", icon: Camera },
    drone_only: { label: "Producción Drone", icon: Plane },
    social_media: { label: "Pack Redes Sociales", icon: Video }
}

// Mock data for demo (will be replaced with Supabase data)
const mockOrders: ServiceOrder[] = [
    {
        id: "1",
        service_type: "pack_full",
        status: "completed",
        scheduled_date: new Date(Date.now() - 86400000 * 2).toISOString(),
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        property: { id: "1", title: "Villa Sol y Mar", address: "La Barra, Punta del Este" }
    },
    {
        id: "2",
        service_type: "drone_only",
        status: "in_progress",
        scheduled_date: new Date().toISOString(),
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
        property: { id: "2", title: "Penthouse Brava", address: "Parada 8, Playa Brava" }
    },
    {
        id: "3",
        service_type: "virtual_tour",
        status: "pending",
        scheduled_date: new Date(Date.now() + 86400000 * 3).toISOString(),
        created_at: new Date().toISOString(),
        property: { id: "3", title: "Chacra El Refugio", address: "José Ignacio" }
    }
]

export function OrdersList() {
    const [orders, setOrders] = useState<ServiceOrder[]>(mockOrders)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchOrders() {
            setIsLoading(true)
            try {
                const { data, error } = await supabase
                    .from('service_orders')
                    .select(`
            id,
            service_type,
            status,
            scheduled_date,
            notes,
            created_at,
            property:properties(id, title, address)
          `)
                    .order('created_at', { ascending: false })
                    .limit(5)

                if (data && data.length > 0) {
                    setOrders(data as unknown as ServiceOrder[])
                }
                // If no data from Supabase, keep using mock data
            } catch (error) {
                console.error('Error fetching orders:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No tienes pedidos de servicios aún</p>
                <Link href="/services/new" className="mt-4 inline-block">
                    <Button>
                        <Video className="mr-2 h-4 w-4" />
                        Solicitar Servicio
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <Card className="glass-card border-none rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Mis Pedidos de Servicios
                </CardTitle>
                <Link href="/calendar">
                    <Button variant="ghost" size="sm" className="text-primary">
                        Ver Calendario <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </Link>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                    {orders.map((order, index) => {
                        const status = statusConfig[order.status]
                        const serviceType = serviceTypeConfig[order.service_type] || { label: order.service_type, icon: Package }
                        const StatusIcon = status.icon
                        const ServiceIcon = serviceType.icon

                        return (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Service Icon */}
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <ServiceIcon className="h-6 w-6 text-primary" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-foreground truncate">{serviceType.label}</p>
                                            <Badge variant="outline" className={status.color}>
                                                <StatusIcon className={`h-3 w-3 mr-1 ${status.animate ? 'animate-spin' : ''}`} />
                                                {status.label}
                                            </Badge>
                                        </div>

                                        {order.property && (
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {order.property.title}
                                            </p>
                                        )}

                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(order.scheduled_date), "PPP", { locale: es })}
                                        </p>
                                    </div>

                                    {/* Action */}
                                    <div className="flex-shrink-0">
                                        {order.status === 'completed' ? (
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                <Download className="h-4 w-4 mr-1" />
                                                Descargar
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="outline">
                                                <Eye className="h-4 w-4 mr-1" />
                                                Detalles
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
