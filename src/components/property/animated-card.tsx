"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, Heart, MoreVertical, Edit, Eye, Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PropertyCardProps {
    id: string
    title: string
    address: string
    price: number
    beds?: number
    baths?: number
    sqm?: number
    image: string
    isNew?: boolean
    isPremium?: boolean
    listingType?: "sale" | "rent"
}

export function AnimatedPropertyCard({
    id,
    title,
    address,
    price,
    beds,
    baths,
    sqm,
    image,
    isNew,
    isPremium,
    listingType = "sale"
}: PropertyCardProps) {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group relative h-[400px] w-full"
        >
            <Card className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/30 shadow-lg h-full flex flex-col transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-cyan-500/10">

                {/* Image Section */}
                <div className="relative h-3/5 overflow-hidden">
                    <Link href={`/p/${id}`} className="absolute inset-0 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[5]" />

                    <img
                        src={image || "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=600"}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1600596542815-60c37c663045?q=80&w=600";
                        }}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-20 flex gap-2">
                        {isNew && <Badge className="bg-cyan-500 text-white border-0 shadow-md">NUEVO</Badge>}
                        {isPremium && <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0 shadow-md">⭐ PREMIUM</Badge>}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 z-30 flex gap-2">
                        <Button
                            size="icon"
                            className={`rounded-full h-8 w-8 backdrop-blur-md border border-white/20 transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-black'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLiked(!isLiked);
                            }}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 glass border border-white/20">
                                <DropdownMenuItem asChild>
                                    <Link href={`/p/${id}`} className="cursor-pointer flex items-center">
                                        <Eye className="mr-2 h-4 w-4 text-cyan-500" /> Ver Pública
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/properties/${id}/edit`} className="cursor-pointer flex items-center">
                                        <Edit className="mr-2 h-4 w-4 text-amber-500" /> Editar
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/p/${id}`)
                                }}>
                                    <Share2 className="mr-2 h-4 w-4 text-purple-500" /> Copiar Link
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                        <p className="text-white/80 text-xs font-medium tracking-wider uppercase mb-0.5">{address}</p>
                        <h3 className="text-white text-lg font-bold leading-tight truncate">{title}</h3>
                    </div>
                </div>

                {/* Details Section */}
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-muted-foreground">Precio</p>
                            <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                                USD ${price.toLocaleString()}
                            </p>
                        </div>
                        <Link href={`/p/${id}`}>
                            <Button size="sm" variant="outline" className="rounded-lg text-xs">
                                Ver Ficha →
                            </Button>
                        </Link>
                    </div>

                    <div className="flex justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-cyan-500" />
                            <span>{beds || '-'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4 text-purple-500" />
                            <span>{baths || '-'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Square className="w-4 h-4 text-amber-500" />
                            <span>{sqm || '-'} m²</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
