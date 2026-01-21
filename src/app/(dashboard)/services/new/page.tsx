
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    propertyId: z.string().min(1, {
        message: "Por favor selecciona una propiedad.",
    }),
    serviceType: z.string().min(1, {
        message: "Selecciona un pack de servicio.",
    }),
    date: z.date(),
    notes: z.string().optional(),
})

export default function NewServicePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [properties, setProperties] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        async function fetchProperties() {
            const { data } = await supabase.from('properties').select('id, title')
            if (data) setProperties(data)
        }
        fetchProperties()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notes: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        // Insert into Supabase
        // Note: Requester ID is hardcoded for demo since we don't have auth session
        // In real app: use auth.uid()
        const { error } = await supabase.from('service_orders').insert({
            property_id: values.propertyId,
            service_type: values.serviceType,
            scheduled_date: values.date.toISOString(),
            notes: values.notes,
            status: 'pending',
            requester_id: '00000000-0000-0000-0000-000000000000' // Demo Agent ID
        })

        setIsLoading(false)

        if (error) {
            console.error(error)
            const { toast } = await import("sonner")
            toast.error("Error al crear el pedido: " + error.message)
        } else {
            const { toast } = await import("sonner")
            toast.success("¡Pedido creado con éxito! Te contactaremos pronto.")
            router.push('/dashboard')
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Solicitar Servicio Multimedia</h2>
                <p className="text-muted-foreground mt-2">Agenda una producción para destacar tu propiedad.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">

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
                                        {properties.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                        ))}
                                        <SelectItem value="new">+ Crear Nueva Propiedad</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    La propiedad donde se realizará la producción.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pack de Servicio</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el pack" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="glass border-white/20">
                                        <SelectItem value="pack_full" className="py-3">
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold text-primary">✨ Pack Punta Lujo 360° (Premium)</span>
                                                <span className="text-xs text-muted-foreground">Tour Virtual Matterport/Klapty + Drone 4K + 20 Fotos HDR + 2 Reels (Instagram/TikTok)</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="virtual_tour" className="py-3">
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold">📷 Tour Virtual 360°</span>
                                                <span className="text-xs text-muted-foreground">Recorrido inmersivo básico para portales web.</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="drone_only" className="py-3">
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold">🚁 Solo Drone</span>
                                                <span className="text-xs text-muted-foreground">Video aéreo 4K y 5 fotos aéreas.</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="social_media" className="py-3">
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold">📱 Pack Redes Socials</span>
                                                <span className="text-xs text-muted-foreground">3 Reels verticales + 10 Fotos editadas para feed.</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription className="mt-2 text-xs">
                                    El <strong>Pack Punta Lujo</strong> es el más recomendado para propiedades de alto valor: incluye experiencia inmersiva completa y contenido viral.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fecha Preferida</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: es })
                                                ) : (
                                                    <span>Selecciona una fecha</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Confirmaremos la disponibilidad vía WhatsApp.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notas Adicionales</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Ej: El dueño estará solo por la mañana. Cuidado con el perro."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Confirmar Pedido
                    </Button>
                </form>
            </Form>
        </div>
    )
}
