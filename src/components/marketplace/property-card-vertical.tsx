"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
    MapPin,
    Bed,
    Bath,
    Maximize,
    Heart,
    Play,
    Camera
} from "lucide-react"
import { useState } from "react"

interface Property {
    id: string
    title: string
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    has360?: boolean
    featured?: boolean
    type?: string
}

interface PropertyCardVerticalProps {
    property: Property
    index: number
}

export function PropertyCardVertical({ property, index }: PropertyCardVerticalProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [imageError, setImageError] = useState(false)

    const fallbackImage = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=900&fit=crop"

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
        >
            <Link href={`/marketplace/${property.id}`}>
                <div className="relative aspect-[9/14] rounded-2xl overflow-hidden bg-slate-800 cursor-pointer">
                    {/* Image */}
                    <img
                        src={imageError ? fallbackImage : property.image}
                        alt={property.title}
                        onError={() => setImageError(true)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {property.featured && (
                            <span className="px-2 py-1 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase">
                                Destacado
                            </span>
                        )}
                        {property.has360 && (
                            <span className="px-2 py-1 rounded-full bg-cyan-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                                <Camera className="h-3 w-3" />
                                360°
                            </span>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIsLiked(!isLiked)
                            }}
                            className="ml-auto h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                        >
                            <Heart
                                className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
                            />
                        </button>
                    </div>

                    {/* Play Button for 360 */}
                    {property.has360 && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
                            >
                                <Play className="h-6 w-6 text-white ml-1" />
                            </motion.div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        {/* Price */}
                        <p className="text-lg md:text-xl font-bold text-white mb-1">
                            USD ${property.price.toLocaleString()}
                        </p>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-white truncate mb-1">
                            {property.title}
                        </h3>

                        {/* Location */}
                        <p className="text-xs text-white/60 flex items-center gap-1 mb-3">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{property.location}</span>
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 text-[10px] text-white/80">
                            <span className="flex items-center gap-1">
                                <Bed className="h-3 w-3" />
                                {property.bedrooms}
                            </span>
                            <span className="flex items-center gap-1">
                                <Bath className="h-3 w-3" />
                                {property.bathrooms}
                            </span>
                            <span className="flex items-center gap-1">
                                <Maximize className="h-3 w-3" />
                                {property.area}m²
                            </span>
                        </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-500/50 transition-colors duration-300" />
                </div>
            </Link>
        </motion.div>
    )
}
