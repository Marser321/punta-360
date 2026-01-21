"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Globe, ScanFace } from "lucide-react"

export function Why360Info() {
    return (
        <section className="py-8">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <Card className="flex-1 border-0 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl"></div>
                    <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border-0">
                                    <Globe className="w-3 h-3 mr-1" />
                                    Experiencia Inmersiva
                                </Badge>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Visita esta propiedad como si estuvieras aquí</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Gracias a nuestra tecnología de Tour Virtual 360°, puedes recorrer cada habitación, evaluar los espacios y sentir la distribución sin moverte de tu casa. Ideal para inversores internacionales.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-400">
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-green-400" /> Medidas Reales</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-green-400" /> Sin Puntos Ciegos</span>
                            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-green-400" /> Calidad 4K HDR</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 glass border-white/20">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <ScanFace className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Transparencia Total</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Evita sorpresas. Lo que ves en el tour y en los videos de drone es exactamente lo que obtienes. Ahorra tiempo en visitas innecesarias.
                                </p>
                                <p className="text-sm font-medium text-primary">
                                    Solicita una videollamada guiada con un agente dentro del tour.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
