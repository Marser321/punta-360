"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    CalendarDays,
    Plus,
    Clock,
    MapPin,
    Camera,
    Plane,
    Video,
    Sparkles,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { BookingModal } from "@/components/booking/booking-modal"

interface ScheduledSession {
    id: string
    date: Date
    time: string
    serviceType: string
    property: string
    status: 'confirmed' | 'pending'
}

// Mock data
const mockSessions: ScheduledSession[] = [
    {
        id: "1",
        date: new Date(),
        time: "10:00",
        serviceType: "pack_full",
        property: "Villa Sol y Mar",
        status: "confirmed"
    },
    {
        id: "2",
        date: new Date(Date.now() + 86400000 * 3),
        time: "14:00",
        serviceType: "drone_only",
        property: "Penthouse Brava",
        status: "pending"
    },
    {
        id: "3",
        date: new Date(Date.now() + 86400000 * 7),
        time: "09:00",
        serviceType: "virtual_tour",
        property: "Chacra El Refugio",
        status: "confirmed"
    }
]

const serviceTypeConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
    pack_full: { label: "Pack Lujo 360°", icon: Sparkles, color: "bg-amber-500" },
    virtual_tour: { label: "Tour 360°", icon: Camera, color: "bg-cyan-500" },
    drone_only: { label: "Drone", icon: Plane, color: "bg-purple-500" },
    social_media: { label: "Redes", icon: Video, color: "bg-pink-500" }
}

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [sessions, setSessions] = useState<ScheduledSession[]>(mockSessions)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [selectedDateForBooking, setSelectedDateForBooking] = useState<Date | null>(null)

    // Get sessions for selected date
    const selectedDateSessions = sessions.filter(s => isSameDay(s.date, selectedDate))

    // Get all dates with sessions for calendar highlighting
    const datesWithSessions = sessions.map(s => s.date)

    const handleDayClick = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date)
        }
    }

    const handleBookSession = (date: Date) => {
        setSelectedDateForBooking(date)
        setIsBookingOpen(true)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Calendario de Servicios
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Gestiona tus sesiones de fotografía, drone y tours 360°
                    </p>
                </div>
                <Button
                    onClick={() => handleBookSession(selectedDate)}
                    className="shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Sesión
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Calendar */}
                <Card className="lg:col-span-2 glass-card border-none rounded-2xl overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            {format(selectedDate, "MMMM yyyy", { locale: es })}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDayClick}
                            className="rounded-xl"
                            modifiers={{
                                hasSession: datesWithSessions
                            }}
                            modifiersStyles={{
                                hasSession: {
                                    fontWeight: "bold",
                                    backgroundColor: "rgba(var(--primary), 0.1)",
                                    borderRadius: "50%"
                                }
                            }}
                        />

                        {/* Legend */}
                        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary/20" />
                                <span>Con sesiones</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span>Confirmado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                <span>Pendiente</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Selected Day Details */}
                <Card className="glass-card border-none rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedDateSessions.length === 0 ? (
                            <div className="text-center py-8">
                                <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                                <p className="text-muted-foreground mb-4">No hay sesiones programadas</p>
                                <Button
                                    variant="outline"
                                    onClick={() => handleBookSession(selectedDate)}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agendar Sesión
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {selectedDateSessions.map((session, index) => {
                                    const service = serviceTypeConfig[session.serviceType] || serviceTypeConfig.pack_full
                                    const ServiceIcon = service.icon

                                    return (
                                        <motion.div
                                            key={session.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                                                    <ServiceIcon className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="font-semibold text-foreground text-sm">{service.label}</p>
                                                        <Badge
                                                            variant="outline"
                                                            className={session.status === 'confirmed'
                                                                ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30'
                                                                : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                                                            }
                                                        >
                                                            {session.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {session.time} hrs
                                                    </p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {session.property}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}

                                <Button
                                    variant="outline"
                                    className="w-full mt-4"
                                    onClick={() => handleBookSession(selectedDate)}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agregar Otra Sesión
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card className="glass-card border-none rounded-2xl">
                <CardHeader>
                    <CardTitle>Próximas Sesiones</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        {sessions
                            .filter(s => s.date >= new Date())
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .slice(0, 3)
                            .map((session, index) => {
                                const service = serviceTypeConfig[session.serviceType] || serviceTypeConfig.pack_full
                                const ServiceIcon = service.icon

                                return (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                                        onClick={() => setSelectedDate(session.date)}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center`}>
                                                <ServiceIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground text-sm">{service.label}</p>
                                                <p className="text-xs text-muted-foreground">{session.property}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <CalendarDays className="h-4 w-4" />
                                                {format(session.date, "d MMM", { locale: es })}
                                            </p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {session.time}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                    </div>
                </CardContent>
            </Card>

            {/* Booking Modal */}
            <BookingModal
                open={isBookingOpen}
                onOpenChange={setIsBookingOpen}
                selectedDate={selectedDateForBooking}
            />
        </div>
    )
}
