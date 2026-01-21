"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Search, Home, Building2, TreePine, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { AnimatedPropertyCard } from "@/components/property/animated-card"
import { motion } from "framer-motion"

// Sample images for properties (using simpler URLs)
const sampleImages = [
    "https://images.unsplash.com/photo-1600596542815-60c37c663045?w=600",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
]

// Filter categories
const categories = [
    { id: "all", label: "Todos", icon: null },
    { id: "apartment", label: "Apartamento", icon: Building2 },
    { id: "house", label: "Casa", icon: Home },
    { id: "land", label: "Terreno", icon: TreePine },
]

// Trending areas
const trendingAreas = [
    { name: "Punta del Este", count: 12, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&fit=crop" },
    { name: "José Ignacio", count: 8, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&fit=crop" },
    { name: "La Barra", count: 5, image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=400&fit=crop" },
    { name: "Manantiales", count: 4, image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=400&fit=crop" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        async function fetchProperties() {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching properties:', error)
            } else {
                setProperties(data || [])
            }
            setLoading(false)
        }

        fetchProperties()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-primary h-8 w-8" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header with Search */}
            <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight">
                            Mis <span className="gold-text">Propiedades</span>
                        </h2>
                        <p className="text-muted-foreground mt-1">Gestiona tu inventario y solicita servicios multimedia.</p>
                    </div>
                    <Link href="/properties/new">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="shadow-lg shadow-primary/30 rounded-full text-base px-6 py-5">
                                <Plus className="w-5 h-5 mr-2" />
                                Nueva Propiedad
                            </Button>
                        </motion.div>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por ciudad, barrio o dirección..."
                        className="pl-12 h-14 rounded-full glass-input text-base shadow-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Pills */}
                <div className="flex gap-3 flex-wrap">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === cat.id
                                ? 'gold-accent text-black shadow-lg'
                                : 'glass hover:bg-white/60 dark:hover:bg-slate-800/60'
                                }`}
                            onClick={() => setActiveFilter(cat.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat.icon && <cat.icon className="w-4 h-4 mr-2 inline" />}
                            {cat.label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl text-white">Recomendadas para ti ✨</h3>
                <Button
                    variant="link"
                    className="text-cyan-400 font-semibold hover:text-cyan-300"
                    onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                >
                    Ver todo →
                </Button>
            </div>

            {/* Property Grid */}
            <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {properties.map((property, index) => (
                    <AnimatedPropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        address={property.address}
                        price={property.price_usd || 0}
                        beds={property.specs?.beds}
                        baths={property.specs?.baths}
                        sqm={property.specs?.m2}
                        image={property.image || sampleImages[index % sampleImages.length]}
                        isNew={index === 0}
                        isPremium={index === 1}
                        listingType={property.listing_type || "sale"}
                    />
                ))}

                {properties.length === 0 && (
                    <motion.div
                        className="col-span-full glass-card border-none p-12 text-center rounded-3xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-20 w-20 rounded-full gold-accent flex items-center justify-center">
                                <Plus className="h-10 w-10 text-black" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">No hay propiedades aún</h3>
                                <p className="text-muted-foreground">Añade tu primera propiedad para comenzar.</p>
                            </div>
                            <Link href="/properties/new">
                                <Button className="rounded-full mt-2">Añadir Propiedad</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Trending Areas */}
            <motion.div
                className="space-y-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h3 className="font-bold text-xl">Zonas Destacadas 📍</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trendingAreas.map((area, index) => (
                        <motion.div
                            key={area.name}
                            className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
                            whileHover={{ scale: 1.03, y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={() => {
                                setSearchQuery(area.name)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                        >
                            <img
                                src={area.image}
                                alt={area.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=400";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-3 left-3">
                                <p className="text-white font-bold text-lg">{area.name}</p>
                                <p className="text-white/80 text-sm">{area.count} propiedades</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
