"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"
import { generatePropertyDescription } from "@/lib/ai/generate-description"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Home, Loader2, Save, Sparkles, Video, Camera, Globe, Lock, DollarSign, FileText } from "lucide-react"
import Link from "next/link"
import { ImageUploader } from "@/components/property/image-uploader"
import { Tour360Manager } from "@/components/property/tour-360-manager"

const formSchema = z.object({
    // General Info
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    address: z.string().min(5, "La dirección es requerida"),
    price: z.coerce.number().min(1000, "El precio debe ser real"),
    currency: z.enum(["USD", "UYU", "ARS"]).default("USD"),
    property_type: z.enum(["apartment", "house", "land", "commercial"]),
    listing_type: z.enum(["sale", "rent"]),

    // Specs
    bedrooms: z.coerce.number().min(0).optional(),
    bathrooms: z.coerce.number().min(0).optional(),
    area_sqm: z.coerce.number().min(1).optional(),
    year_built: z.coerce.number().optional(),
    common_expenses: z.coerce.number().optional(), // Gastos comunes

    // Multimedia (Links & Assets)
    video_url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
    drone_url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
    // tour_360_url is now managed by Tour360Manager, but we keep it in schema if we want a main 360 url fallback? 
    // Actually, let's keep it for compatibility or maybe just remove if we go full assets.
    // For now, let's keep it as an optional field that might be populated by the first tour image?
    // Let's stick to the separation: form handles metadata, managers handle assets.

    // Description
    description: z.string().min(20, "La descripción debe ser detallada"),

    // Private Info (Admin Only)
    owner_name: z.string().optional(),
    owner_phone: z.string().optional(),
    private_notes: z.string().optional(),
    commission_rate: z.coerce.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PropertyFormProps {
    initialData?: any // We can refine this type based on Supabase tables
}

export function PropertyForm({ initialData }: PropertyFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isGeneratingAI, setIsGeneratingAI] = useState(false)
    const [activeTab, setActiveTab] = useState("general")
    // State for assets managed outside react-hook-form but associated with the property
    // For new properties, we need an ID before we can upload images. 
    // Strategy: Create a draft property ID first? Or just allow uploads after save?
    // A common pattern is to create the property record first if it doesn't exist?
    // OR allow uploads to a temp folder?
    // EASIEST MVP: For "New", show basic info first, save, THEN show multimedia tab enabled.
    // BUT user wants a fluid flow.
    // LET'S DO: If it's new, we generate a UUID purely for storage path purposes? 
    // Supabase storage paths don't strictly enforce foreign keys. We can use a random UUID.
    // However, we need to associate `media_assets` rows with a `property_id`.
    // SO: We really need a property ID in the DB.

    // ADJUSTED STRATEGY FOR MVP PROPERTY CREATION:
    // 1. User fills basic info.
    // 2. "Multimedia" tab is disabled until basic info is saved? 
    // Or we create a "Draft" property immediately upon opening "New Property"? That cleans up abandoned drafts?
    // Let's stick to: We need to save the property to get an ID. 
    // So for "New", we pass `null` as ID. The Multimedia tab will show a message "Save to upload media".
    // OR we auto-save draft when they switch tabs?

    // Let's try: If `initialData` is present, we have an ID.
    // If NOT, we don't.
    // We can't upload without ID for `media_assets` table.

    const isEditing = !!initialData
    const propertyId = initialData?.id

    const defaultValues: Partial<FormValues> = initialData ? {
        title: initialData.title,
        address: initialData.address,
        price: initialData.price_usd || 0,
        currency: initialData.currency || "USD",
        property_type: initialData.type || "apartment",
        listing_type: initialData.listing_type || "sale",
        bedrooms: initialData.specs?.beds || 0,
        bathrooms: initialData.specs?.baths || 0,
        area_sqm: initialData.specs?.m2 || 0,
        year_built: initialData.specs?.year,
        common_expenses: initialData.specs?.expenses || 0,
        video_url: initialData.specs?.multimedia?.video || "",
        drone_url: initialData.specs?.multimedia?.drone || "",
        description: initialData.description || "",
        owner_name: initialData.specs?.private?.owner_name || "",
        owner_phone: initialData.specs?.private?.owner_phone || "",
        private_notes: initialData.specs?.private?.notes || "",
        commission_rate: initialData.specs?.private?.commission,
    } : {
        title: "",
        address: "",
        price: 0,
        currency: "USD",
        property_type: "apartment",
        listing_type: "sale",
        bedrooms: 0,
        bathrooms: 0,
        area_sqm: 0,
        video_url: "",
        drone_url: "",
        description: "",
        owner_name: "",
        owner_phone: "",
        common_expenses: 0,
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues,
    })

    async function handleGenerateDescription() {
        const values = form.getValues()
        if (!values.title || !values.address) {
            toast.error("Completa título y dirección primero")
            return
        }
        setIsGeneratingAI(true)
        try {
            const description = await generatePropertyDescription(
                values.title,
                values.address,
                values.bedrooms || 0,
                values.bathrooms || 0,
                values.area_sqm || 0,
                values.property_type
            )
            form.setValue("description", description)
            toast.success("¡Descripción generada con IA!")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsGeneratingAI(false)
        }
    }

    async function onSubmit(values: FormValues) {
        setIsLoading(true)
        try {
            // Construct payload mapping to existing DB structure + JSONB for extras
            const payload = {
                title: values.title,
                address: values.address,
                price_usd: values.price, // Assuming USD for now or convert based on currency
                status: "published",
                description: values.description,
                type: values.property_type,
                // owner_id: "00000000-0000-0000-0000-000000000000", // Demo ID - Supabase might handle this via RLS or defaults? Let's leave it for now.
                specs: {
                    beds: values.bedrooms,
                    baths: values.bathrooms,
                    m2: values.area_sqm,
                    year: values.year_built,
                    expenses: values.common_expenses,
                    multimedia: {
                        video: values.video_url,
                        // tour360: values.tour_360_url, // removed from form, handled by manager
                        drone: values.drone_url
                    },
                    private: {
                        owner_name: values.owner_name,
                        owner_phone: values.owner_phone,
                        notes: values.private_notes,
                        commission: values.commission_rate
                    }
                },
            }

            if (isEditing) {
                const { error } = await supabase
                    .from("properties")
                    .update(payload)
                    .eq('id', propertyId)
                if (error) throw error
                toast.success("Propiedad actualizada exitosamente")
                router.refresh()
            } else {
                const { data, error } = await supabase
                    .from("properties")
                    .insert({
                        ...payload,
                        owner_id: (await supabase.auth.getUser()).data.user?.id // Set current user as owner
                    })
                    .select()
                    .single()

                if (error) throw error
                toast.success("Propiedad creada. Ahora puedes subir multimedia.")
                // Redirect to edit page to allow uploading media
                router.push(`/properties/${data.id}/edit`)
            }
        } catch (error: any) {
            console.error(error)
            toast.error("Error al guardar: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Filter media assets from initialData
    const initialImages = initialData?.media?.filter((m: any) => m.asset_type === 'image') || []
    const initial360 = initialData?.media?.filter((m: any) => m.asset_type === '360_url') || []

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/properties">
                        <Button variant="ghost" size="icon" className="glass rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            {isEditing ? "Editar Propiedad" : "Nueva Propiedad"}
                        </h2>
                        <p className="text-muted-foreground">{isEditing ? "Gestiona los detalles y multimedia" : "Alta de inventario premium"}</p>
                    </div>
                </div>
                {isEditing && (
                    <div className="hidden md:block">
                        <Link href={`/p/${propertyId}`} target="_blank">
                            <Button variant="outline" className="glass-card gap-2">
                                <Globe className="w-4 h-4" /> Ver Publicación
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 h-auto p-1 glass rounded-full mb-6">
                            <TabsTrigger value="general" className="rounded-full py-2.5">
                                <Home className="w-4 h-4 mr-2" /> General
                            </TabsTrigger>
                            <TabsTrigger value="multimedia" className="rounded-full py-2.5">
                                <Video className="w-4 h-4 mr-2" /> Multimedia
                            </TabsTrigger>
                            <TabsTrigger value="specs" className="rounded-full py-2.5">
                                <FileText className="w-4 h-4 mr-2" /> Ficha Técnica
                            </TabsTrigger>
                            <TabsTrigger value="private" className="rounded-full py-2.5">
                                <Lock className="w-4 h-4 mr-2" /> Privado
                            </TabsTrigger>
                        </TabsList>

                        {/* TAB: GENERAL */}
                        <TabsContent value="general">
                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle>Información Principal</CardTitle>
                                    <CardDescription>Datos básicos públicos de la propiedad</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Título Comercial</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ej: Residencia Minimalista en La Barra" {...field} className="glass-input h-11" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Dirección Pública</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ubicación aproximada o exacta" {...field} className="glass-input h-11" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="currency"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Moneda</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="glass-input h-11">
                                                                <SelectValue placeholder="USD" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="USD">USD</SelectItem>
                                                            <SelectItem value="UYU">UYU</SelectItem>
                                                            <SelectItem value="ARS">ARS</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1 md:col-span-1">
                                                    <FormLabel>Precio</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} className="glass-input h-11" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="property_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="glass-input h-11">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="apartment">Apto</SelectItem>
                                                            <SelectItem value="house">Casa</SelectItem>
                                                            <SelectItem value="land">Terreno</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="listing_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Operación</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="glass-input h-11">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="sale">Venta</SelectItem>
                                                            <SelectItem value="rent">Alquiler</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex justify-between items-center mb-1">
                                                    <FormLabel>Descripción de Venta</FormLabel>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                                        onClick={handleGenerateDescription}
                                                        disabled={isGeneratingAI}
                                                    >
                                                        {isGeneratingAI ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                                                        AI Magic
                                                    </Button>
                                                </div>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Descripción emotiva y detallada..."
                                                        className="min-h-[150px] glass-input resize-none text-base"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <div className="p-6 flex justify-end">
                                    <Button type="button" onClick={() => setActiveTab("multimedia")} className="rounded-full">
                                        Siguiente: Multimedia
                                    </Button>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* TAB: MULTIMEDIA */}
                        <TabsContent value="multimedia">
                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle>Contenido Multimedia</CardTitle>
                                    <CardDescription>Gestiona fotos, videos y tours virtuales</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {!isEditing ? (
                                        <div className="text-center py-10">
                                            <p className="text-lg font-medium">Guarda la propiedad primero</p>
                                            <p className="text-muted-foreground">Necesitamos crear el registro antes de subir archivos.</p>
                                            <Button type="submit" className="mt-4 gold-accent text-black font-bold rounded-full">
                                                <Save className="w-4 h-4 mr-2" /> Guardar Borrador e Ir a Multimedia
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Camera className="w-5 h-5 text-amber-500" />
                                                    <h3 className="text-lg font-semibold">Galería de Fotos</h3>
                                                </div>
                                                <ImageUploader
                                                    propertyId={propertyId}
                                                    assetType="image"
                                                    existingImages={initialImages}
                                                    onImagesChange={() => { }}
                                                />
                                            </div>

                                            <div className="border-t border-white/10 my-6" />

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Globe className="w-5 h-5 text-cyan-500" />
                                                    <h3 className="text-lg font-semibold">Tour Virtual 360°</h3>
                                                </div>
                                                <Tour360Manager
                                                    propertyId={propertyId}
                                                    existingImages={initial360}
                                                    onImagesChange={() => { }}
                                                />
                                            </div>

                                            <div className="border-t border-white/10 my-6" />

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="video_url"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <Video className="w-4 h-4 text-red-500" /> Video (YouTube / Vimeo)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="https://youtube.com/watch?v=..." {...field} className="glass-input" />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="drone_url"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <Camera className="w-4 h-4 text-blue-500" /> Video Drone
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Link alternativo..." {...field} className="glass-input" />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                                <div className="p-6 flex justify-between">
                                    <Button type="button" variant="outline" onClick={() => setActiveTab("general")} className="rounded-full">Atrás</Button>
                                    <Button type="button" onClick={() => setActiveTab("specs")} className="rounded-full">Siguiente: Ficha</Button>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* TAB: SPECS */}
                        <TabsContent value="specs">
                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle>Ficha Técnica</CardTitle>
                                    <CardDescription>Detalles específicos para el comprador informado</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="bedrooms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Dormitorios</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} className="glass-input" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="bathrooms"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Baños</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} className="glass-input" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="area_sqm"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sup. Total (m²)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} className="glass-input" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="year_built"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Año Constr.</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="2020" {...field} className="glass-input" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="common_expenses"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel>Gastos Comunes (Mensual)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="$" {...field} className="glass-input" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <div className="p-6 flex justify-between">
                                    <Button type="button" variant="outline" onClick={() => setActiveTab("multimedia")} className="rounded-full">Atrás</Button>
                                    <Button type="button" onClick={() => setActiveTab("private")} className="rounded-full">Siguiente: Privado</Button>
                                </div>
                            </Card>
                        </TabsContent>

                        {/* TAB: PRIVATE */}
                        <TabsContent value="private">
                            <Card className="glass-card border-none border-l-4 border-l-amber-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-amber-500" /> Información Privada
                                    </CardTitle>
                                    <CardDescription>Solo visible para agentes y administradores</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="owner_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombre Propietario</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className="glass-input" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="owner_phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Teléfono / WhatsApp</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className="glass-input" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="commission_rate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4 text-green-500" /> Comisión Pactada (%)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="3.0" step="0.1" {...field} className="glass-input w-32" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="private_notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notas Internas</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Códigos de alarma, llaves, situación legal..." {...field} className="glass-input" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <div className="p-6 flex justify-between bg-black/5 dark:bg-white/5">
                                    <Button type="button" variant="outline" onClick={() => setActiveTab("specs")} className="rounded-full">Atrás</Button>
                                    <Button type="submit" disabled={isLoading} className="gold-accent text-black font-bold rounded-full shadow-lg shadow-amber-500/20 px-8">
                                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                        {isEditing ? "Guardar Cambios" : "Publicar Propiedad"}
                                    </Button>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </div>
    )
}
