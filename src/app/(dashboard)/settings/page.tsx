"use client"

import { motion } from "framer-motion"
import { Settings, Bell, Palette, Globe, Lock, CreditCard, HelpCircle, ChevronRight, Moon, Sun, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()

    const sections = [
        {
            title: "Apariencia",
            description: "Personaliza cómo se ve Punta360 en tus dispositivos.",
            icon: Palette,
            items: [
                {
                    id: "theme-mode",
                    label: "Modo Oscuro",
                    description: "Cambia entre tema claro y oscuro.",
                    icon: theme === 'dark' ? Moon : Sun,
                    control: <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
                },
                {
                    id: "glass-effects",
                    label: "Efectos Glassmorphism",
                    description: "Habilitar transparencias y desenfoques avanzados.",
                    icon: Palette,
                    control: <Switch defaultChecked />
                }
            ]
        },
        {
            title: "Notificaciones",
            description: "Gestiona las alertas que recibes de tus clientes.",
            icon: Bell,
            items: [
                {
                    id: "push-notif",
                    label: "Notificaciones Push",
                    description: "Recibe alertas en tiempo real sobre nuevos leads.",
                    icon: Smartphone,
                    control: <Switch defaultChecked />
                },
                {
                    id: "email-digests",
                    label: "Resumen Semanal",
                    description: "Un reporte consolidado de actividad en tu email.",
                    icon: Globe,
                    control: <Switch />
                }
            ]
        },
        {
            title: "Seguridad y Privacidad",
            description: "Protege tu cuenta y datos de navegación.",
            icon: Lock,
            items: [
                {
                    id: "2fa",
                    label: "Autenticación de dos pasos",
                    description: "Añade una capa extra de seguridad.",
                    icon: Shield,
                    control: <Button variant="outline" size="sm" className="rounded-lg">Configurar</Button>
                },
                {
                    id: "active-sessions",
                    label: "Sesiones Activas",
                    description: "Gestiona los dispositivos donde has iniciado sesión.",
                    icon: Smartphone,
                    control: <ChevronRight className="h-5 w-5 text-slate-500" />
                }
            ]
        }
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8 pb-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Configuración</h1>
                <p className="text-slate-400">Administra tus preferencias y ajustes de cuenta.</p>
            </motion.div>

            <div className="grid gap-6">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="glass-card border-none backdrop-blur-xl bg-white/5 shadow-2xl rounded-3xl overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-white/5 shadow-inner">
                                        <section.icon className="h-5 w-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">{section.title}</CardTitle>
                                        <CardDescription>{section.description}</CardDescription>
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
                                                    <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 transition-colors group-hover:border-cyan-500/30">
                                                        <item.icon className="h-4 w-4 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor={item.id} className="text-base font-medium cursor-pointer">{item.label}</Label>
                                                        <p className="text-xs text-slate-400">{item.description}</p>
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
                    <Card className="glass-card border-none bg-gradient-to-br from-purple-600/20 to-cyan-500/20 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer border-white/5 group">
                        <div>
                            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                                <CreditCard className="h-6 w-6 text-cyan-300" />
                            </div>
                            <h3 className="text-lg font-bold">Suscripción y Pagos</h3>
                            <p className="text-sm text-slate-400 mt-2">Gestiona tu método de pago y consulta tus facturas.</p>
                        </div>
                        <Button variant="ghost" className="mt-6 justify-between group-hover:bg-white/10 rounded-xl px-2">
                            Gestionar Pagos <ChevronRight className="h-4 w-4 text-cyan-400" />
                        </Button>
                    </Card>

                    <Card className="glass-card border-none bg-white/5 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-colors cursor-pointer border-white/5 group">
                        <div>
                            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                <HelpCircle className="h-6 w-6 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold">Ayuda y Soporte</h3>
                            <p className="text-sm text-slate-400 mt-2">¿Tienes dudas? Accede a nuestro centro de ayuda.</p>
                        </div>
                        <Button variant="ghost" className="mt-6 justify-between rounded-xl px-2">
                            Ir al Centro de Ayuda <Globe className="h-4 w-4 text-slate-400" />
                        </Button>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

function Shield(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
    )
}
