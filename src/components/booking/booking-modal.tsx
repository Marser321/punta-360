"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Loader2, CalendarDays, Clock, MapPin } from "lucide-react"
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"

const formSchema = z.object({
    propertyId: z.string().min(1, "Selecciona una propiedad"),
    serviceType: z.string().min(1, "Selecciona un servicio"),
    time: z.string().min(1, "Selecciona una hora"),
})

interface BookingModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedDate: Date | null
}

const timeSlots = [
    "08:00", "09:00", "10:00", "11:00",
    "12:00", "14:00", "15:00", "16:00", "17:00"
]

const serviceTypes = [
    { value: "pack_full", label: "✨ Pack Punta Lujo 360° (Premium)", desc: "Tour + Drone + Fotos + Reels" },
    { value: "virtual_tour", label: "📷 Tour Virtual 360°", desc: "Recorrido inmersivo" },
    { value: "drone_only", label: "🚁 Producción Drone", desc: "Video aéreo 4K" },
    { value: "social_media", label: "📱 Pack Redes Sociales", desc: "Reels + Fotos" },
]

export function BookingModal({ open, onOpenChange, selectedDate }: BookingModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [properties, setProperties] = useState<any[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyId: "",
            serviceType: "",
            time: "",
        },
    })

    useEffect(() => {
        async function fetchProperties() {
            const { data } = await supabase.from('properties').select('id, title')
            if (data) setProperties(data)
        }
        if (open) {
            fetchProperties()
        }
    }, [open])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!selectedDate) return

        setIsLoading(true)

        try {
            // Create scheduled date with time
            const [hours, minutes] = values.time.split(':')
            const scheduledDate = new Date(selectedDate)
            scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)

            const { error } = await supabase.from('service_orders').insert({
                property_id: values.propertyId,
                service_type: values.serviceType,
                scheduled_date: scheduledDate.toISOString(),
                status: 'pending',
                requester_id: '00000000-0000-0000-0000-000000000000' // Demo ID
            })

            if (error) throw error

            toast.success("¡Sesión agendada con éxito!", {
                description: `Para el ${format(selectedDate, "d 'de' MMMM", { locale: es })} a las ${values.time}`
            })

            onOpenChange(false)
            form.reset()
        } catch (error: any) {
            toast.error("Error al agendar", {
                description: error.message || "Intenta nuevamente"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] glass border-white/20">
                <DialogHeader>
                    <DialogTitle className="text-xl">Agendar Sesión</DialogTitle>
                    <DialogDescription>
                        {selectedDate && (
                            <span className="flex items-center gap-2 mt-2 text-primary font-medium">
                                <CalendarDays className="h-4 w-4" />
                                {format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        {/* Property Selection */}
                        <FormField
                            control={form.control}
                            name="propertyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Propiedad</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona la propiedad" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {properties.length > 0 ? (
                                                properties.map(p => (
                                                    <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                                ))
                                            ) : (
                                                <>
                                                    <SelectItem value="demo-1">Villa Sol y Mar</SelectItem>
                                                    <SelectItem value="demo-2">Penthouse Brava</SelectItem>
                                                    <SelectItem value="demo-3">Chacra El Refugio</SelectItem>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Service Type */}
                        <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Servicio</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el servicio" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {serviceTypes.map(service => (
                                                <SelectItem key={service.value} value={service.value} className="py-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{service.label}</span>
                                                        <span className="text-xs text-muted-foreground">{service.desc}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Time Selection */}
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Hora
                                    </FormLabel>
                                    <div className="grid grid-cols-3 gap-2">
                                        {timeSlots.map(time => (
                                            <Button
                                                key={time}
                                                type="button"
                                                variant={field.value === time ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => field.onChange(time)}
                                                className={field.value === time ? "bg-primary" : ""}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Confirmar"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
