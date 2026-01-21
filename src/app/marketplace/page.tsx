"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Search,
    SlidersHorizontal,
    MapPin,
    Bed,
    Bath,
    Maximize,
    Heart,
    Play,
    Sparkles,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { PropertyCardVertical } from "@/components/marketplace/property-card-vertical"
import { supabase } from "@/lib/supabase/client"

// Mock data for demo
const mockProperties = [
    {
        id: "1",
        title: "Villa Sol y Mar",
        location: "La Barra, Punta del Este",
        price: 450000,
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=900&fit=crop",
        has360: true,
        featured: true,
        type: "Villa"
    },
    {
        id: "2",
        title: "Penthouse Brava",
        location: "Parada 8, Playa Brava",
        price: 890000,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=900&fit=crop",
        has360: true,
        featured: false,
        type: "Apartamento"
    },
    {
        id: "3",
        title: "Chacra El Refugio",
        location: "José Ignacio",
        price: 1200000,
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        image: "https://images.unsplash.com/photo-1600596542815-60c37c663045?w=600&h=900&fit=crop",
        has360: false,
        featured: true,
        type: "Chacra"
    },
    {
        id: "4",
        title: "Departamento Mansa",
        location: "Parada 20, Playa Mansa",
        price: 320000,
        bedrooms: 2,
        bathrooms: 2,
        area: 95,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=900&fit=crop",
        has360: true,
        featured: false,
        type: "Apartamento"
    },
    {
        id: "5",
        title: "Casa Zen",
        location: "Manantiales",
        price: 680000,
        bedrooms: 3,
        bathrooms: 3,
        area: 220,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=900&fit=crop",
        has360: true,
        featured: false,
        type: "Casa"
    },
    {
        id: "6",
        title: "Loft Artístico",
        location: "Punta del Este Centro",
        price: 195000,
        bedrooms: 1,
        bathrooms: 1,
        area: 65,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=900&fit=crop",
        has360: false,
        featured: false,
        type: "Loft"
    }
]

export default function MarketplacePage() {
    const [properties, setProperties] = useState(mockProperties)
    const [searchQuery, setSearchQuery] = useState("")
    const [priceFilter, setPriceFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)

    // Debounce search query
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500)
        return () => clearTimeout(timer)
    }, [searchQuery])

    useEffect(() => {
        async function fetchProperties() {
            try {
                let query = supabase
                    .from('properties')
                    .select('*')
                    .eq('status', 'active')
                    .order('created_at', { ascending: false })

                // Server-side filtering
                if (debouncedSearch) {
                    // Search in title OR location (requires logic or simple OR)
                    // Supabase OR syntax: .or(`title.ilike.%${query}%,location.ilike.%${query}%`)
                    query = query.or(`title.ilike.%${debouncedSearch}%,address.ilike.%${debouncedSearch}%`)
                }

                if (typeFilter !== 'all') {
                    query = query.eq('property_type', typeFilter === 'Apartamento' ? 'apartment' : typeFilter === 'Casa' ? 'house' : typeFilter === 'Chacra' ? 'land' : 'commercial') // Mapping UI types to DB types
                }

                if (priceFilter !== 'all') {
                    if (priceFilter === 'under500k') query = query.lt('price', 500000)
                    if (priceFilter === '500k-1m') query = query.gte('price', 500000).lt('price', 1000000)
                    if (priceFilter === 'over1m') query = query.gte('price', 1000000)
                }

                const { data, error } = await query

                if (error) throw error

                if (data) {
                    setProperties(data.map(p => ({
                        ...p,
                        image: p.images?.[0] || mockProperties[0].image,
                        has360: p.has_360_tour || false,
                        // Ensure we map DB fields to UI expected fields if they differ
                        type: p.property_type === 'apartment' ? 'Apartamento' : p.property_type === 'house' ? 'Casa' : 'Villa' // Simple mapping or keep original
                    })))
                } else {
                    setProperties([])
                }
            } catch (error) {
                console.error('Error fetching properties:', error)
            }
        }
        fetchProperties()
    }, [debouncedSearch, typeFilter, priceFilter])

    // Client-side filtering is removed, we use 'properties' directly as it IS the filtered result now.
    const filteredProperties = properties

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Hero Header */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-slate-950 to-slate-950" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Propiedades <span className="text-amber-400">Exclusivas</span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
                            Descubre las mejores propiedades de Punta del Este con tours virtuales 360°
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto flex gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                                <Input
                                    placeholder="Buscar por ubicación o nombre..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full"
                                />
                            </div>
                            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 px-6 border-white/20 text-white hover:bg-white/10 rounded-full"
                                    >
                                        <SlidersHorizontal className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="glass border-white/20">
                                    <SheetHeader>
                                        <SheetTitle className="text-white">Filtros</SheetTitle>
                                        <SheetDescription className="text-white/60">
                                            Ajusta los filtros para encontrar tu propiedad ideal
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="space-y-6 mt-6">
                                        <div>
                                            <label className="text-sm text-white/70 mb-2 block">Rango de Precio</label>
                                            <Select value={priceFilter} onValueChange={setPriceFilter}>
                                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Todos los precios</SelectItem>
                                                    <SelectItem value="under500k">Menos de USD 500k</SelectItem>
                                                    <SelectItem value="500k-1m">USD 500k - 1M</SelectItem>
                                                    <SelectItem value="over1m">Más de USD 1M</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-white/70 mb-2 block">Tipo de Propiedad</label>
                                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">Todos los tipos</SelectItem>
                                                    <SelectItem value="Villa">Villa</SelectItem>
                                                    <SelectItem value="Apartamento">Apartamento</SelectItem>
                                                    <SelectItem value="Casa">Casa</SelectItem>
                                                    <SelectItem value="Chacra">Chacra</SelectItem>
                                                    <SelectItem value="Loft">Loft</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button
                                            className="w-full"
                                            onClick={() => setIsFiltersOpen(false)}
                                        >
                                            Aplicar Filtros
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Results */}
            <div className="container mx-auto px-4 pb-20">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-white/60">
                        <span className="text-white font-semibold">{filteredProperties.length}</span> propiedades encontradas
                    </p>
                    <div className="flex gap-2">
                        {priceFilter !== "all" && (
                            <Badge
                                variant="outline"
                                className="border-amber-500/50 text-amber-400 cursor-pointer hover:bg-amber-500/20"
                                onClick={() => setPriceFilter("all")}
                            >
                                {priceFilter} <X className="h-3 w-3 ml-1" />
                            </Badge>
                        )}
                        {typeFilter !== "all" && (
                            <Badge
                                variant="outline"
                                className="border-cyan-500/50 text-cyan-400 cursor-pointer hover:bg-cyan-500/20"
                                onClick={() => setTypeFilter("all")}
                            >
                                {typeFilter} <X className="h-3 w-3 ml-1" />
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Properties Grid - Vertical Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {filteredProperties.map((property, index) => (
                        <PropertyCardVertical
                            key={property.id}
                            property={property}
                            index={index}
                        />
                    ))}
                </div>

                {filteredProperties.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="h-16 w-16 mx-auto text-white/20 mb-4" />
                        <p className="text-xl text-white/60">No se encontraron propiedades</p>
                        <p className="text-white/40 mt-2">Intenta ajustar los filtros</p>
                    </div>
                )}
            </div>
        </main>
    )
}
