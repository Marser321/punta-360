"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    Sparkles,
    ArrowLeft,
    Send,
    Loader2,
    Building2,
    User,
    Mail,
    Phone,
    MessageSquare,
    CheckCircle2,
    DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function AIContactPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        industry: "",
        budget: "",
        description: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        setLoading(false)
        setSuccess(true)
    }

    if (success) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md text-center"
                >
                    <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Solicitud Enviada!</h2>
                    <p className="text-slate-400 mb-6">
                        Nuestro equipo revisará tu caso y te contactará en las próximas 24 horas
                        para agendar una consulta gratuita.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button
                            variant="outline"
                            className="border-slate-700 text-white hover:bg-slate-800"
                            onClick={() => router.push('/ai-solutions')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-purple-500 to-cyan-500"
                            onClick={() => router.push('/landing')}
                        >
                            Ir a Inicio
                        </Button>
                    </div>
                </motion.div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-950">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-20 p-6">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/ai-solutions" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        Volver
                    </Link>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-black" />
                        </div>
                        <span className="text-xl font-bold text-white">Punta<span className="text-amber-400">360</span></span>
                    </Link>
                </div>
            </nav>

            <div className="relative z-10 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Solicita tu <span className="text-purple-400">Consulta Gratuita</span>
                        </h1>
                        <p className="text-slate-400">
                            Cuéntanos sobre tu negocio y los procesos que quieres automatizar.
                            Nuestro equipo te contactará en 24 horas.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName" className="text-slate-300">Empresa</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                        <Input
                                            id="companyName"
                                            placeholder="Tu empresa"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                            required
                                            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactName" className="text-slate-300">Nombre de contacto</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                        <Input
                                            id="contactName"
                                            placeholder="Tu nombre"
                                            value={formData.contactName}
                                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                            required
                                            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="email@empresa.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-slate-300">Teléfono / WhatsApp</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                        <Input
                                            id="phone"
                                            placeholder="+598 99 123 456"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Industria</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                            <SelectValue placeholder="Selecciona tu industria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="real-estate">Inmobiliaria</SelectItem>
                                            <SelectItem value="retail">Retail / E-commerce</SelectItem>
                                            <SelectItem value="services">Servicios Profesionales</SelectItem>
                                            <SelectItem value="healthcare">Salud</SelectItem>
                                            <SelectItem value="finance">Finanzas</SelectItem>
                                            <SelectItem value="other">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-slate-300">Presupuesto Estimado</Label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                            <SelectValue placeholder="Rango de inversión" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5k-10k">USD 5,000 - 10,000</SelectItem>
                                            <SelectItem value="10k-25k">USD 10,000 - 25,000</SelectItem>
                                            <SelectItem value="25k-50k">USD 25,000 - 50,000</SelectItem>
                                            <SelectItem value="50k+">USD 50,000+</SelectItem>
                                            <SelectItem value="unsure">No estoy seguro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-300">
                                    Describe el problema o proceso que quieres automatizar
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Ej: Actualmente manejamos los leads manualmente en Excel y queremos automatizar el seguimiento por WhatsApp..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={5}
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:from-purple-600 hover:to-cyan-600"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        Enviar Solicitud
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-sm text-slate-500">
                                Al enviar este formulario, aceptas que te contactemos para discutir tu proyecto.
                                No compartiremos tu información con terceros.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
