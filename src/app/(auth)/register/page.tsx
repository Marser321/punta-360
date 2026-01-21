"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, Loader2, Building2, ShoppingBag } from "lucide-react"
import { createClient } from "@/lib/supabase/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/logo"

type UserRole = 'cliente' | 'agente'

export default function RegisterPage() {
    const router = useRouter()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<UserRole>('cliente')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const supabase = createClient()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        setSuccess(true)
        setLoading(false)
    }

    const handleGoogleSignup = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
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
                        <Mail className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Revisa tu correo!</h2>
                    <p className="text-slate-400 mb-6">
                        Hemos enviado un enlace de confirmación a <span className="text-white font-medium">{email}</span>
                    </p>
                    <Link href="/login">
                        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                            Volver al Login
                        </Button>
                    </Link>
                </motion.div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center mb-8 hover:opacity-90 transition-opacity">
                    <Logo size="lg" />
                </Link>

                {/* Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Crea tu cuenta</h1>
                        <p className="text-slate-400">Únete a la plataforma inmobiliaria #1</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Role Selection */}
                        <div className="space-y-2">
                            <Label className="text-slate-300">¿Qué tipo de cuenta necesitas?</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('cliente')}
                                    className={`p-4 rounded-xl border-2 transition-all ${role === 'cliente'
                                        ? 'border-amber-500 bg-amber-500/10'
                                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                        }`}
                                >
                                    <ShoppingBag className={`h-6 w-6 mx-auto mb-2 ${role === 'cliente' ? 'text-amber-400' : 'text-slate-500'}`} />
                                    <p className={`font-medium ${role === 'cliente' ? 'text-white' : 'text-slate-400'}`}>Cliente</p>
                                    <p className="text-xs text-slate-500 mt-1">Busco propiedad</p>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('agente')}
                                    className={`p-4 rounded-xl border-2 transition-all ${role === 'agente'
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                                        }`}
                                >
                                    <Building2 className={`h-6 w-6 mx-auto mb-2 ${role === 'agente' ? 'text-purple-400' : 'text-slate-500'}`} />
                                    <p className={`font-medium ${role === 'agente' ? 'text-white' : 'text-slate-400'}`}>Agente</p>
                                    <p className="text-xs text-slate-500 mt-1">Soy inmobiliaria</p>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-slate-300">Nombre completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold hover:from-amber-500 hover:to-yellow-600"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Crear Cuenta
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-900 text-slate-500">o regístrate con</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignup}
                        disabled={loading}
                        className="w-full h-12 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </Button>

                    <p className="text-center mt-6 text-slate-400 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </motion.div>
        </main>
    )
}
