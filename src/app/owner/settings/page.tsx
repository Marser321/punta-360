"use client"

import { motion } from "framer-motion"
import { Settings, Bell, Palette, Globe, Lock, CreditCard, HelpCircle, ChevronRight, Moon, Sun, Smartphone, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

export default function OwnerSettingsPage() {
    const { theme, setTheme } = useTheme()

    const sections = [
        {
            title: "Preferencia Visual",
            description: "Personaliza la estética de tu portal de propietario.",
            icon: Palette,
            items: [
                {
                    id: "theme-mode",
                    label: "Modo Oscuro",
                    description: "Cambia entre el tema elegante oscuro y el claro.",
                    icon: theme === 'dark' ? Moon : Sun,
                    control: <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
                },
                {
                    id: "glass-effects",
                    label: "Acabado Luxury",
                    description: "Habilitar efectos de cristal y desenfoque profundo.",
                    icon: Palette,
                    control: <Switch defaultChecked />
                }
            ]
        },
        {
            title: "Notificaciones de Venta",
            description: "Gestiona cómo recibes noticias sobre tu propiedad.",
            icon: Bell,
            items: [
                {
                    id: "push-notif",
                    label: "Alertas Push",
                    description: "Recibe avisos inmediatos sobre nuevas visitas agendadas.",
                    icon: Smartphone,
                    control: <Switch defaultChecked />
                },
                {
                    id: "email-digests",
                    label: "Reporte de Rendimiento",
                    description: "Recibe un resumen semanal de clics y vistas.",
                    icon: Globe,
                    control: <Switch defaultChecked />
                }
            ]
        },
        {
            title: "Seguridad",
            description: "Protege el acceso a tu información privada.",
            icon: Lock,
            items: [
                {
                    id: "2fa",
                    label: "Verificación en 2 pasos",
                    description: "Máxima seguridad para tu portal.",
                    icon: Shield,
                    control: <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg">Configurar</Button>
                }
            ]
        }
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold text-white">Configuración</h1>
                <p className="text-white/60">Administra tus preferencias y ajustes de seguridad.</p>
            </motion.div>

            <div className="grid gap-6">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/10 shadow-inner">
                                        <section.icon className="h-5 w-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl text-white">{section.title}</CardTitle>
                                        <CardDescription className="text-white/60">{section.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-0 p-0">
                                <div className="px-6 pb-6 space-y-1">
                                    {section.items.map((item, itemIdx) => (
                                        <div key={item.id}>
                                            {itemIdx > 0 && <Separator className="bg-white/5 my-2" />}
                                            <div className="flex items-center justify-between py-4 group hover:bg-white/[0.02] -mx-4 px-4 rounded-2xl transition-all cursor-pointer">
                                                <div className="flex gap-4 items-center">
                                                    <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 transition-colors group-hover:border-amber-500/30">
                                                        <item.icon className="h-4 w-4 text-white/70 group-hover:text-amber-400 transition-colors" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={item.id} className="text-base font-medium text-white cursor-pointer">{item.label}</Label>
                                                        <p className="text-xs text-white/40">{item.description}</p>
                                                    </div>
                                                </div>
                                                {item.control}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <Card className="bg-gradient-to-br from-amber-600/20 to-amber-900/20 border-amber-500/20 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer group">
                        <div>
                            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                                <CreditCard className="h-6 w-6 text-amber-300" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Suscripción y Packs</h3>
                            <p className="text-sm text-white/50 mt-2">Gestiona tus servicios de marketing contratados.</p>
                        </div>
                        <Button variant="ghost" className="mt-6 justify-between text-amber-400 hover:bg-amber-500/10 rounded-xl px-2">
                            Gestionar Servicios <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Card>

                    <Card className="bg-white/5 border-white/10 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-colors cursor-pointer group">
                        <div>
                            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                <HelpCircle className="h-6 w-6 text-white/60" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Ayuda y Soporte</h3>
                            <p className="text-sm text-white/50 mt-2">¿Tienes dudas sobre tu venta? Habla con un experto.</p>
                        </div>
                        <Button variant="ghost" className="mt-6 justify-between text-white/60 rounded-xl px-2">
                            Ir al Centro de Ayuda <Globe className="h-4 w-4" />
                        </Button>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
