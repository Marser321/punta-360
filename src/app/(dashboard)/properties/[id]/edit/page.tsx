"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PropertyForm } from "@/components/property/property-form"
import { supabase } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function EditPropertyPage() {
    const params = useParams()
    const router = useRouter()
    const [property, setProperty] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchProperty() {
            if (!params.id) return

            try {
                // Fetch property
                const { data: propertyData, error: propertyError } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (propertyError) throw propertyError

                // Fetch Media
                const { data: mediaData, error: mediaError } = await supabase
                    .from('media_assets')
                    .select('*')
                    .eq('property_id', params.id)
                    .order('position', { ascending: true })

                if (mediaError) throw mediaError

                // Combine
                setProperty({ ...propertyData, media: mediaData || [] })
            } catch (error) {
                console.error("Error loading property:", error)
                // toast.error("Error al cargar propiedad") // Optional: show error
            } finally {
                setIsLoading(false)
            }
        }

        fetchProperty()
    }, [params.id])

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!property) {
        return (
            <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
                <p className="text-xl font-medium text-muted-foreground">Propiedad no encontrada</p>
                <button
                    onClick={() => router.push('/properties')}
                    className="text-sm text-primary hover:underline"
                >
                    Volver al listado
                </button>
            </div>
        )
    }

    return <PropertyForm initialData={property} />
}
