"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Home,
    Loader2,
    Save,
    Sparkles,
    Video,
    Camera,
    Globe,
    Lock,
    DollarSign,
    FileText,
    Image as ImageIcon,
    Navigation,
    Trash2,
    ExternalLink
} from "lucide-react"
import Link from "next/link"
import { ImageUploader } from "@/components/property/image-uploader"
import { Tour360Manager } from "@/components/property/tour-360-manager"
import { ConnectedTourViewer } from "@/components/property/connected-tour-viewer"

const formSchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    address: z.string().min(5, "La dirección es requerida"),
    price: z.coerce.number().min(1000, "El precio debe ser real"),
    currency: z.enum(["USD", "UYU", "ARS"]).default("USD"),
    property_type: z.enum(["apartment", "house", "land", "commercial"]),
    listing_type: z.enum(["sale", "rent"]),
    bedrooms: z.coerce.number().min(0).optional(),
    bathrooms: z.coerce.number().min(0).optional(),
    area_sqm: z.coerce.number().min(1).optional(),
    year_built: z.coerce.number().optional(),
    common_expenses: z.coerce.number().optional(),
    description: z.string().min(20, "La descripción debe ser detallada"),
    owner_name: z.string().optional(),
    owner_phone: z.string().optional(),
    private_notes: z.string().optional(),
    commission_rate: z.coerce.number().optional(),
    status: z.enum(["draft", "published", "sold"]).default("published"),
})

type FormValues = z.infer<typeof formSchema>

interface PropertyData {
    id: string
    title: string
    address: string
    price_usd: number
    status: string
    description: string
    specs: any
}

interface MediaAsset {
    id: string
    url: string
    asset_type: string
    room_name?: string
    position: number
}

export default function EditPropertyPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [activeTab, setActiveTab] = useState("general")
    const [property, setProperty] = useState<PropertyData | null>(null)
    const [galleryImages, setGalleryImages] = useState<any[]>([])
    const [tour360Images, setTour360Images] = useState<any[]>([])

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            title: "",
            address: "",
            price: 0,
            currency: "USD",
            property_type: "apartment",
            listing_type: "sale",
            bedrooms: 0,
            bathrooms: 0,
            area_sqm: 0,
            description: "",
            status: "published",
        },
    })

    // Fetch property data
    useEffect(() => {
        async function fetchProperty() {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) {
                toast.error("Propiedad no encontrada")
                router.push('/properties')
                return
            }

            setProperty(data)

            // Populate form
            form.reset({
                title: data.title,
                address: data.address,
                price: data.price_usd || 0,
                currency: "USD",
                property_type: data.specs?.type || "apartment",
                listing_type: data.specs?.listing_type || "sale",
                bedrooms: data.specs?.beds || 0,
                bathrooms: data.specs?.baths || 0,
                area_sqm: data.specs?.m2 || 0,
                year_built: data.specs?.year,
                common_expenses: data.specs?.expenses,
                description: data.description || "",
                owner_name: data.specs?.private?.owner_name,
                owner_phone: data.specs?.private?.owner_phone,
                private_notes: data.specs?.private?.notes,
                commission_rate: data.specs?.private?.commission,
                status: data.status || "published",
            })

            // Fetch media assets
            const { data: mediaData } = await supabase
                .from('media_assets')
                .select('*')
                .eq('property_id', params.id)
                .order('position')

            if (mediaData) {
                setGalleryImages(mediaData.filter(m => m.asset_type === 'image'))
                setTour360Images(mediaData.filter(m => m.asset_type === '360_url'))
            }

            setIsFetching(false)
        }

        fetchProperty()
    }, [params.id, form, router])

    async function onSubmit(values: FormValues) {
        setIsLoading(true)
        try {
            const { error } = await supabase
                .from("properties")
                .update({
                    title: values.title,
                    address: values.address,
                    price_usd: values.price,
                    status: values.status,
                    description: values.description,
                    specs: {
                        beds: values.bedrooms,
                        baths: values.bathrooms,
                        m2: values.area_sqm,
                        year: values.year_built,
                        expenses: values.common_expenses,
                        type: values.property_type,
                        listing_type: values.listing_type,
                        private: {
                            owner_name: values.owner_name,
                            owner_phone: values.owner_phone,
                            notes: values.private_notes,
                            commission: values.commission_rate
                        }
                    },
                })
                .eq('id', params.id)

            if (error) throw error
            toast.success("Propiedad actualizada")
            router.push(`/p/${params.id}`)
        } catch (error: any) {
            toast.error("Error: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Cargando propiedad...</p>
                </div>
            </div>
        )
    }

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
                            Editar Propiedad
                        </h2>
                        <p className="text-muted-foreground">{property?.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/p/${params.id}`} target="_blank">
                        <Button variant="outline" className="glass-card gap-2">
                            <ExternalLink className="w-4 h-4" /> Ver Ficha
                        </Button>
                    </Link>
                    <Badge
                        variant="outline"
                        className={property?.status === 'published'
                            ? 'border-green-500/30 text-green-400'
                            : 'border-orange-500/30 text-orange-400'
                        }
                    >
                        {property?.status === 'published' ? 'Publicada' : property?.status}
                    </Badge>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-5 h-auto p-1 glass rounded-full mb-6">
                            <TabsTrigger value="general" className="rounded-full py-2.5">
                                <Home className="w-4 h-4 mr-2" /> General
                            </TabsTrigger>
                            <TabsTrigger value="gallery" className="rounded-full py-2.5">
                                <ImageIcon className="w-4 h-4 mr-2" /> Galería
                            </TabsTrigger>
                            <TabsTrigger value="tour360" className="rounded-full py-2.5">
                                <Navigation className="w-4 h-4 mr-2" /> Tour 360°
                            </TabsTrigger>
                            <TabsTrigger value="specs" className="rounded-full py-2.5">
                                <FileText className="w-4 h-4 mr-2" /> Ficha
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

                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Estado</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="glass-input h-11">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="draft">Borrador</SelectItem>
                                                            <SelectItem value="published">Publicada</SelectItem>
                                                            <SelectItem value="sold">Vendida</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="currency"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Moneda</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                                <FormItem>
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
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="glass-input h-11">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="apartment">Apto</SelectItem>
                                                            <SelectItem value="house">Casa</SelectItem>
                                                            <SelectItem value="land">Terreno</SelectItem>
                                                            <SelectItem value="commercial">Comercial</SelectItem>
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
                                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                                <FormLabel>Descripción de Venta</FormLabel>
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
                            </Card>
                        </TabsContent>

                        {/* TAB: GALLERY */}
                        <TabsContent value="gallery">
                            <Card className="glass-card border-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-amber-500" />
                                        Galería de Fotos
                                    </CardTitle>
                                    <CardDescription>
                                        Sube múltiples fotos de la propiedad. La primera será la imagen de portada.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ImageUploader
                                        propertyId={params.id}
                                        assetType="image"
                                        existingImages={galleryImages.map(img => ({
                                            id: img.id,
                                            url: img.url,
                                            position: img.position,
                                            title: img.title
                                        }))}
                                        onImagesChange={(images) => setGalleryImages(images)}
                                        maxImages={30}
                                        acceptHint="JPG, PNG, WebP hasta 50MB cada una"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* TAB: TOUR 360 */}
                        <TabsContent value="tour360">
                            <div className="grid gap-6">
                                {/* Preview */}
                                {tour360Images.length > 0 && (
                                    <Card className="glass-card border-none overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="flex items-center gap-2">
                                                <Globe className="w-5 h-5 text-cyan-500" />
                                                Preview del Tour
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <ConnectedTourViewer
                                                rooms={tour360Images.map(img => ({
                                                    id: img.id,
                                                    url: img.url,
                                                    room_name: img.room_name || 'Sin nombre',
                                                    position: img.position
                                                }))}
                                                propertyTitle={property?.title}
                                                className="rounded-none"
                                            />
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Manager */}
                                <Card className="glass-card border-none">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Navigation className="w-5 h-5 text-cyan-500" />
                                            Gestionar Tour 360°
                                        </CardTitle>
                                        <CardDescription>
                                            Añade múltiples imágenes panorámicas para crear un recorrido virtual conectado.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Tour360Manager
                                            propertyId={params.id}
                                            existingImages={tour360Images.map(img => ({
                                                id: img.id,
                                                url: img.url,
                                                room_name: img.room_name || '',
                                                position: img.position
                                            }))}
                                            onImagesChange={(images) => setTour360Images(images)}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
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
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Save Button - Sticky */}
                    <div className="sticky bottom-4 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="gold-accent text-black font-bold rounded-full shadow-xl shadow-amber-500/30 px-10 py-6 text-lg"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
