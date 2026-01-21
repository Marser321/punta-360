"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
    ArrowLeft,
    ArrowRight,
    User,
    Home,
    Camera,
    CheckCircle2,
    Sparkles,
    Loader2
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

const steps = [
    { id: 1, title: "Tus Datos", icon: User },
    { id: 2, title: "Tu Propiedad", icon: Home },
    { id: 3, title: "Servicios", icon: Camera },
    { id: 4, title: "Confirmación", icon: CheckCircle2 },
]

const servicePacks = [
    { id: "basic", name: "Pack Básico", price: 0, description: "Fotografía estándar incluida", features: ["20 fotos profesionales", "Publicación en portales"] },
    { id: "360", name: "Pack 360°", price: 450, description: "Tour virtual inmersivo", features: ["Todo lo del Pack Básico", "Tour 360° interactivo", "Hotspots de info"] },
    { id: "premium", name: "Pack Premium", price: 1200, description: "Marketing completo", features: ["Todo lo anterior", "Video Drone 4K", "Pack Redes Sociales"], recommended: true },
]

export default function OwnerRegisterPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        // Step 1 - Owner Data
        fullName: "",
        email: "",
        phone: "",
        // Step 2 - Property Data
        propertyAddress: "",
        propertyType: "apartment",
        estimatedPrice: "",
        description: "",
        // Step 3 - Services
        selectedPack: "premium"
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success("¡Registro completado!", {
            description: "Te contactaremos en las próximas 24 horas."
        })
        router.push("/owner/dashboard")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900/20 via-black to-black py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/owners" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </Link>
                    <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Registro de Propietario
                    </Badge>
                    <h1 className="text-3xl font-bold text-white mb-2">Lista tu Propiedad</h1>
                    <p className="text-white/60">Completa el formulario y comenzamos la magia</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${currentStep >= step.id
                                    ? "bg-gradient-to-br from-amber-400 to-amber-600 text-black"
                                    : "bg-white/10 text-white/40"
                                }`}>
                                <step.icon className="w-5 h-5" />
                            </div>
                            <span className={`hidden sm:block ml-2 text-sm font-medium ${currentStep >= step.id ? "text-amber-400" : "text-white/40"
                                }`}>
                                {step.title}
                            </span>
                            {index < steps.length - 1 && (
                                <div className={`w-8 sm:w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-amber-500" : "bg-white/10"
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Owner Data */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-white">Información de Contacto</CardTitle>
                                    <CardDescription>¿Cómo podemos comunicarnos contigo?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Nombre Completo</Label>
                                        <Input
                                            placeholder="Juan Pérez"
                                            value={formData.fullName}
                                            onChange={(e) => updateField("fullName", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="juan@email.com"
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Teléfono / WhatsApp</Label>
                                        <Input
                                            placeholder="+598 99 123 456"
                                            value={formData.phone}
                                            onChange={(e) => updateField("phone", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                        />
                                    </div>
                                </CardContent>
                            </motion.div>
                        )}

                        {/* Step 2: Property Data */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-white">Datos de la Propiedad</CardTitle>
                                    <CardDescription>Cuéntanos sobre tu inmueble</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Dirección</Label>
                                        <Input
                                            placeholder="Rambla Brava 1234, Punta del Este"
                                            value={formData.propertyAddress}
                                            onChange={(e) => updateField("propertyAddress", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Precio Estimado (USD)</Label>
                                        <Input
                                            type="number"
                                            placeholder="500000"
                                            value={formData.estimatedPrice}
                                            onChange={(e) => updateField("estimatedPrice", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Descripción Breve</Label>
                                        <Textarea
                                            placeholder="Apartamento de 3 dormitorios con vista al mar..."
                                            value={formData.description}
                                            onChange={(e) => updateField("description", e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                                        />
                                    </div>
                                </CardContent>
                            </motion.div>
                        )}

                        {/* Step 3: Services */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-white">Elige tu Pack de Marketing</CardTitle>
                                    <CardDescription>Sin costo inicial - Se deduce de la comisión al vender</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {servicePacks.map((pack) => (
                                        <div
                                            key={pack.id}
                                            onClick={() => updateField("selectedPack", pack.id)}
                                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.selectedPack === pack.id
                                                    ? "border-amber-500 bg-amber-500/10"
                                                    : "border-white/10 bg-white/5 hover:border-white/30"
                                                }`}
                                        >
                                            {pack.recommended && (
                                                <Badge className="absolute -top-2 right-4 bg-amber-500 text-black text-xs">
                                                    Recomendado
                                                </Badge>
                                            )}
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-white">{pack.name}</h4>
                                                    <p className="text-white/60 text-sm">{pack.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-amber-400">
                                                        {pack.price === 0 ? "Incluido" : `$${pack.price}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <ul className="mt-3 space-y-1">
                                                {pack.features.map((f) => (
                                                    <li key={f} className="text-white/60 text-sm flex items-center gap-2">
                                                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </motion.div>
                        )}

                        {/* Step 4: Confirmation */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-white">Confirma tu Registro</CardTitle>
                                    <CardDescription>Revisa los datos antes de enviar</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <p className="text-white/60 text-xs uppercase mb-1">Contacto</p>
                                            <p className="text-white font-medium">{formData.fullName}</p>
                                            <p className="text-white/70 text-sm">{formData.email} • {formData.phone}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <p className="text-white/60 text-xs uppercase mb-1">Propiedad</p>
                                            <p className="text-white font-medium">{formData.propertyAddress}</p>
                                            <p className="text-amber-400 font-bold">USD ${parseInt(formData.estimatedPrice || "0").toLocaleString()}</p>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-lg">
                                            <p className="text-white/60 text-xs uppercase mb-1">Pack Seleccionado</p>
                                            <p className="text-white font-medium">
                                                {servicePacks.find(p => p.id === formData.selectedPack)?.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                                        <p className="text-amber-300 text-sm">
                                            Al enviar, aceptas nuestros términos de servicio. Sin costos hasta que vendamos.
                                        </p>
                                    </div>
                                </CardContent>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="p-6 border-t border-white/10 flex justify-between">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="text-white/60 hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Anterior
                        </Button>
                        {currentStep < 4 ? (
                            <Button
                                onClick={nextStep}
                                className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold"
                            >
                                Siguiente
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        Confirmar Registro
                                        <CheckCircle2 className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
