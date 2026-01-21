import { Metadata } from 'next'
import { supabase } from "@/lib/supabase/client"
import PropertyDetailClient from "@/components/property/property-detail-client"

// Generate dynamic metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // Fetch minimal data for metadata
    const id = params.id

    // Default fallback
    const fallback = {
        title: 'Propiedad Exclusiva | Punta360',
        description: 'Descubre esta increíble propiedad en Punta del Este.'
    }

    if (!id || id.length < 10) return fallback

    try {
        const { data } = await supabase
            .from('properties')
            .select('title, description, price, currency, images')
            .eq('id', id)
            .single()

        if (!data) return fallback

        const price = data.price ? `${data.currency || 'USD'} ${Number(data.price).toLocaleString()}` : 'Consultar Precio'
        const mainImage = data.images && data.images[0] ? data.images[0] : 'https://punta360.com/og-default.jpg'

        return {
            title: `${data.title} | ${price}`,
            description: data.description?.substring(0, 160) || fallback.description,
            openGraph: {
                images: [mainImage],
            },
        }
    } catch (e) {
        return fallback
    }
}

export default function PublicPropertyPage({ params }: { params: { id: string } }) {
    return <PropertyDetailClient id={params.id} />
}
