"use client"

import { motion } from "framer-motion"
import {
    TrendingUp,
    Search,
    Target,
    BarChart3,
    MessageCircle,
    Calendar,
    MapPin,
    DollarSign,
    Users,
    Clock,
    Zap,
    ChevronRight,
    Lightbulb,
    ArrowUpRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Mock data for marketing insights
const MARKET_INSIGHTS = {
    zone: "Mansa - Parada 12",
    demandTrend: "+18%",
    avgDaysOnMarket: 45,
    optimalPriceRange: { min: 380000, max: 450000 },
    competitorCount: 12,
    bestChannels: [
        { name: "Instagram Reels", conversion: "34%", icon: "📱" },
        { name: "WhatsApp Business", conversion: "28%", icon: "💬" },
        { name: "Portales Premium", conversion: "22%", icon: "🏠" }
    ],
    seasonalDemand: [
        { month: "Dic", demand: 95 },
        { month: "Ene", demand: 100 },
        { month: "Feb", demand: 85 },
        { month: "Mar", demand: 60 }
    ],
    recommendations: [
        {
            title: "Optimizar Precio de Lista",
            description: "Tu propiedad está un 8% por encima del promedio de la zona. Considera ajustar para aumentar visualizaciones.",
            impact: "Alto",
            icon: DollarSign
        },
        {
            title: "Publicar en Horario Óptimo",
            description: "Las publicaciones entre 18:00-20:00 obtienen 2.3x más engagement en tu zona.",
            impact: "Medio",
            icon: Clock
        },
        {
            title: "Destacar Amenities Premium",
            description: "Las propiedades con piscina y parrillero en Mansa tienen 45% más consultas.",
            impact: "Alto",
            icon: Target
        },
        {
            title: "Activar WhatsApp Business",
            description: "El 68% de los leads prefieren contacto por WhatsApp sobre formularios.",
            impact: "Alto",
            icon: MessageCircle
        }
    ]
}

interface MarketingIntelligenceProps {
    propertyId?: string
    className?: string
}

export function MarketingIntelligence({ propertyId, className }: MarketingIntelligenceProps) {
    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                        Marketing Intelligence
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                        Insights personalizados para <span className="text-amber-400 font-medium">{MARKET_INSIGHTS.zone}</span>
                    </p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Actualizado Hoy
                </Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Tendencia Demanda</p>
                    <p className="text-2xl font-black text-green-400">{MARKET_INSIGHTS.demandTrend}</p>
                    <p className="text-[10px] text-zinc-600">vs. mes anterior</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Días en Mercado</p>
                    <p className="text-2xl font-black text-white">{MARKET_INSIGHTS.avgDaysOnMarket}</p>
                    <p className="text-[10px] text-zinc-600">promedio zona</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Competidores</p>
                    <p className="text-2xl font-black text-white">{MARKET_INSIGHTS.competitorCount}</p>
                    <p className="text-[10px] text-zinc-600">propiedades similares</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Rango Óptimo</p>
                    <p className="text-lg font-black text-amber-400">
                        ${(MARKET_INSIGHTS.optimalPriceRange.min / 1000).toFixed(0)}k - ${(MARKET_INSIGHTS.optimalPriceRange.max / 1000).toFixed(0)}k
                    </p>
                    <p className="text-[10px] text-zinc-600">USD</p>
                </motion.div>
            </div>

            {/* Recommendations */}
            <Card className="bg-stone-950/80 border-white/10 backdrop-blur-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        Recomendaciones Personalizadas
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {MARKET_INSIGHTS.recommendations.map((rec, index) => (
                        <motion.div
                            key={rec.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all group cursor-pointer"
                            onClick={() => toast.info(rec.title, { description: rec.description })}
                        >
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                                    <rec.icon className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-white font-bold group-hover:text-amber-400 transition-colors">{rec.title}</h4>
                                        <Badge
                                            variant="outline"
                                            className={`text-[9px] ${rec.impact === 'Alto' ? 'border-green-500/30 text-green-400' : 'border-yellow-500/30 text-yellow-400'}`}
                                        >
                                            Impacto {rec.impact}
                                        </Badge>
                                    </div>
                                    <p className="text-white/40 text-xs mt-1 leading-relaxed">{rec.description}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" />
                            </div>
                        </motion.div>
                    ))}
                </CardContent>
            </Card>

            {/* Best Channels */}
            <Card className="bg-stone-950/80 border-white/10 backdrop-blur-xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-500" />
                        Canales de Mayor Conversión
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {MARKET_INSIGHTS.bestChannels.map((channel, index) => (
                            <motion.div
                                key={channel.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center"
                            >
                                <span className="text-3xl">{channel.icon}</span>
                                <p className="text-white font-bold mt-2">{channel.name}</p>
                                <p className="text-2xl font-black text-cyan-400 mt-1">{channel.conversion}</p>
                                <p className="text-[10px] text-zinc-500 uppercase">tasa conversión</p>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* CTA */}
            <div className="flex gap-4">
                <Button
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl"
                    onClick={() => toast.success("Reporte completo solicitado", {
                        description: "Recibirás el análisis detallado por email en las próximas horas."
                    })}
                >
                    Descargar Reporte Completo
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5 rounded-xl"
                    onClick={() => toast.info("Consulta agendada", {
                        description: "Un especialista te contactará para revisar tu estrategia."
                    })}
                >
                    Hablar con Especialista
                </Button>
            </div>
        </div>
    )
}
