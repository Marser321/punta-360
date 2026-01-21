"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, X, Compass, BookOpen, MessageCircle } from "lucide-react"
import { useOnboarding } from "./onboarding-provider"
import { Button } from "@/components/ui/button"

interface HelpButtonProps {
    tourType: 'landing' | 'dashboard' | 'marketplace'
}

export function HelpButton({ tourType }: HelpButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { startTour, hasCompletedTour } = useOnboarding()

    const handleStartTour = () => {
        setIsOpen(false)
        // Small delay to let menu close
        setTimeout(() => {
            startTour(tourType)
        }, 200)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-16 right-0 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl mb-2"
                    >
                        <div className="space-y-3">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <Compass className="h-4 w-4 text-amber-400" />
                                ¿Necesitas ayuda?
                            </h3>

                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left hover:bg-white/10 text-slate-300"
                                onClick={handleStartTour}
                            >
                                <BookOpen className="h-4 w-4 mr-2 text-cyan-400" />
                                <div>
                                    <p className="font-medium text-white">Tour Interactivo</p>
                                    <p className="text-xs text-slate-400">
                                        {hasCompletedTour(tourType) ? 'Repetir el tour' : 'Aprende a usar la app'}
                                    </p>
                                </div>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left hover:bg-white/10 text-slate-300"
                                onClick={() => window.open('https://wa.me/59899123456', '_blank')}
                            >
                                <MessageCircle className="h-4 w-4 mr-2 text-green-400" />
                                <div>
                                    <p className="font-medium text-white">Soporte WhatsApp</p>
                                    <p className="text-xs text-slate-400">Respuesta en minutos</p>
                                </div>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isOpen
                        ? 'bg-slate-700 shadow-slate-500/20'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-500 shadow-amber-500/30'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="h-6 w-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="help"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <HelpCircle className="h-6 w-6 text-black" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Pulse animation for first-time users */}
            {!hasCompletedTour(tourType) && !isOpen && (
                <span className="absolute top-0 right-0 h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500" />
                </span>
            )}
        </div>
    )
}
