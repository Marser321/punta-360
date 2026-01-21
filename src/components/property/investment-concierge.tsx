"use client"

import { motion } from "framer-motion"
import {
    TrendingUp,
    DollarSign,
    Calendar,
    ShieldCheck,
    Info,
    ChevronRight,
    ArrowUpRight,
    PieChart,
    Timer,
    Database,
    Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface InvestmentConciergeProps {
    price: string
}

export function InvestmentConcierge({ price }: InvestmentConciergeProps) {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 500000

    // Simulated data
    const annualYield = 7.5
    const annualROI = 11.2
    const rentalHighSeason = (numericPrice * 0.05).toLocaleString()
    const rentalLowSeason = (numericPrice * 0.015).toLocaleString()

    return (
        <Card className="overflow-hidden border-2 border-amber-500/20 bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/20 backdrop-blur-xl">
            <CardHeader className="border-b border-amber-500/10 bg-amber-500/5">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                        Punta Intelligence <span className="text-xs font-normal text-amber-500/50 uppercase tracking-widest ml-2">Premium</span>
                    </CardTitle>
                    <Badge className="bg-amber-500 text-black font-bold">ROI {annualROI}%</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                {/* Main Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="text-left">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-1 cursor-help">
                                        Yield Estimado <Info className="w-2.5 h-2.5" />
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-white">{annualYield}%</span>
                                        <span className="text-[9px] text-green-500 font-bold">Anual</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-stone-900 border-white/10 text-xs max-w-[200px]">
                                    Rentabilidad anual bruta estimada basada en el precio de compra y alquileres promedio en la zona (Mansa/Brava).
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="space-y-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="text-left">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-1 cursor-help">
                                        Plusvalía 5A <Info className="w-2.5 h-2.5" />
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-white">+24%</span>
                                        <ArrowUpRight className="w-3 h-3 text-green-500" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-stone-900 border-white/10 text-xs max-w-[200px]">
                                    Proyección de apreciación del valor de la propiedad en un horizonte de 5 años según tendencias históricas de Punta del Este.
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="space-y-1 col-span-2 md:col-span-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="text-left">
                                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center gap-1 cursor-help">
                                        Tax Efficiency <Info className="w-2.5 h-2.5" />
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm font-bold text-white">Ley 18.795</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-stone-900 border-white/10 text-xs max-w-[200px]">
                                    Beneficios fiscales por vivienda promovida o inversiones bajo regímenes especiales en Uruguay.
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* Simulated Chart */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                            <PieChart className="w-3 h-3 text-amber-500" />
                            Proyección de Ingresos por Alquiler
                        </h4>
                        <span className="text-[10px] text-zinc-500">Estimado basado en m² y ubicación</span>
                    </div>

                    <div className="h-24 flex items-end gap-2 px-2 border-b border-white/5 pb-1">
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "100%" }}
                                transition={{ duration: 1, delay: 0.1 }}
                                className="w-full bg-amber-500/50 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">ENE</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "90%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="w-full bg-amber-500/40 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">FEB</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "20%" }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="w-full bg-white/10 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">MAR</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "15%" }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="w-full bg-white/5 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">ABR</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "10%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="w-full bg-white/5 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">MAY</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "10%" }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="w-full bg-white/5 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">JUN</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "80%" }}
                                transition={{ duration: 1, delay: 0.7 }}
                                className="w-full bg-amber-500/30 rounded-t-sm group-hover:bg-amber-500 transition-colors"
                            />
                            <span className="text-[9px] text-zinc-500 font-bold">DIC</span>
                        </div>
                    </div>
                </div>

                {/* Specifics */}
                <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold">Alquiler Temporada Alta</p>
                                <p className="text-sm font-bold text-white">USD ${rentalHighSeason}</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="border-cyan-400/30 text-cyan-400">Dic - Feb</Badge>
                    </div>

                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Timer className="w-4 h-4 text-purple-400" />
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold">Punto de Equilibrio (BEP)</p>
                                <p className="text-sm font-bold text-white">4.2 Años</p>
                            </div>
                        </div>
                        <Info className="w-4 h-4 text-zinc-600 cursor-pointer hover:text-white transition-colors" />
                    </div>

                    {/* Rental History / Value Zones (NEW) */}
                    <div className="pt-4 border-t border-white/5">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Database className="w-3 h-3 text-amber-500" />
                            Inteligencia de Mercado Local
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center justify-between text-xs p-2 rounded bg-black/20 border border-white/5">
                                <span className="text-zinc-400">Demanda Histórica (5A)</span>
                                <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400">+12% anual</Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs p-2 rounded bg-black/20 border border-white/5">
                                <span className="text-zinc-400">Ocupación Promedio Alta</span>
                                <span className="text-white font-bold">94%</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                                <Zap className="w-3 h-3 text-amber-500" />
                                <p className="text-[9px] text-amber-200/70 leading-tight">
                                    Zona de Valor: <span className="text-white font-bold">Mansa Paradas</span>.
                                    Potencial de revalorización superior al promedio por nuevos desarrollos costeros.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 flex flex-col gap-3">
                    <p className="text-[9px] text-zinc-500 italic text-center">
                        * Los datos presentados son proyecciones basadas en el historial del área.
                        No garantizan resultados futuros.
                    </p>
                    <Button
                        className="w-full bg-white text-black font-black hover:bg-white/90 group rounded-full"
                        onClick={() => toast.success("Solicitud enviada", {
                            description: "Un asesor financiero experto se contactará contigo vía WhatsApp en breve."
                        })}
                    >
                        HABLAR CON UN ASESOR FINANCIERO
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
