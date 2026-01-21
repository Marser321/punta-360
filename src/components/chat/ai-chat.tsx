"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Sparkles, User, Loader2, Bot } from "lucide-react"
import { chatWithConcierge } from "@/lib/ai/generate-description"

interface Message {
    id: number
    text: string
    isBot: boolean
    timestamp: Date
}

interface AIChatProps {
    propertyTitle?: string
    propertyPrice?: number
    propertyAddress?: string
    propertyBedrooms?: number
    propertyBathrooms?: number
}

const initialMessages: Message[] = [
    {
        id: 1,
        text: "¡Hola! 👋 Soy el concierge virtual de Punta360. ¿En qué puedo ayudarte hoy?",
        isBot: true,
        timestamp: new Date()
    }
]

const quickReplies = [
    "¿Cuál es el precio?",
    "Quiero agendar una visita",
    "¿Acepta financiamiento?",
    "Más información"
]

export function AIChat({ propertyTitle, propertyPrice, propertyAddress, propertyBedrooms, propertyBathrooms }: AIChatProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [useGemini, setUseGemini] = useState(true) // Toggle for Gemini AI
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Fallback response (when Gemini fails or is disabled)
    const generateFallbackResponse = (userMessage: string): string => {
        const lowerMsg = userMessage.toLowerCase()

        if (lowerMsg.includes("precio") || lowerMsg.includes("cuesta") || lowerMsg.includes("valor")) {
            return propertyPrice
                ? `El precio de ${propertyTitle} es USD $${propertyPrice.toLocaleString()}. ¿Te gustaría agendar una visita para conocerla?`
                : "Para información de precios, por favor déjame tu WhatsApp y un agente te contactará en menos de 1 hora."
        }

        if (lowerMsg.includes("visita") || lowerMsg.includes("agendar") || lowerMsg.includes("ver")) {
            return "¡Excelente! Para agendar una visita, necesito tu nombre y número de WhatsApp. Un agente te contactará para coordinar el mejor horario."
        }

        if (lowerMsg.includes("financ") || lowerMsg.includes("cuota") || lowerMsg.includes("credito")) {
            return "Sí, trabajamos con opciones de financiamiento. Tenemos convenios con bancos locales y opciones de pago directo con el desarrollador. ¿Te gustaría más detalles?"
        }

        if (lowerMsg.includes("información") || lowerMsg.includes("info") || lowerMsg.includes("detalle")) {
            return propertyAddress
                ? `${propertyTitle} está ubicada en ${propertyAddress}. Es una propiedad premium con excelente ubicación. ¿Qué más te gustaría saber?`
                : "¡Claro! Esta es una propiedad premium en una ubicación privilegiada. ¿Qué aspecto te interesa más: ubicación, amenities, o financiamiento?"
        }

        if (lowerMsg.includes("hola") || lowerMsg.includes("buenas")) {
            return "¡Hola! 😊 Estoy aquí para ayudarte a encontrar tu propiedad ideal en Punta del Este. ¿Qué te gustaría saber?"
        }

        return "Interesante pregunta. Para darte la mejor información, ¿podrías compartirme tu WhatsApp? Un agente especializado te contactará en minutos."
    }

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: messages.length + 1,
            text: input,
            isBot: false,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        const userInput = input
        setInput("")
        setIsTyping(true)

        let responseText: string

        if (useGemini) {
            try {
                // Build conversation history for Gemini
                const conversationHistory = messages
                    .filter(m => m.id !== 1) // Skip initial greeting
                    .map(m => ({
                        role: m.isBot ? "assistant" as const : "user" as const,
                        content: m.text
                    }))

                responseText = await chatWithConcierge(
                    userInput,
                    conversationHistory,
                    {
                        title: propertyTitle,
                        price: propertyPrice,
                        address: propertyAddress,
                        bedrooms: propertyBedrooms,
                        bathrooms: propertyBathrooms
                    }
                )
            } catch (error) {
                console.error("Gemini error, using fallback:", error)
                responseText = generateFallbackResponse(userInput)
            }
        } else {
            // Simulate typing delay for fallback
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500))
            responseText = generateFallbackResponse(userInput)
        }

        const botResponse: Message = {
            id: messages.length + 2,
            text: responseText,
            isBot: true,
            timestamp: new Date()
        }

        setIsTyping(false)
        setMessages(prev => [...prev, botResponse])
    }

    const handleQuickReply = (reply: string) => {
        setInput(reply)
        setTimeout(() => handleSend(), 100)
    }

    return (
        <>
            {/* Chat Button */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full gold-accent shadow-2xl flex items-center justify-center text-black"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 0 : 1 }}
            >
                <MessageCircle className="h-7 w-7" />
                <motion.div
                    className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col"
                    >
                        {/* Header */}
                        <div className="gold-accent p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Sparkles className="h-5 w-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-black">Asistente Punta360</h3>
                                    <p className="text-xs text-black/70 flex items-center gap-1">
                                        <span className="h-2 w-2 bg-green-500 rounded-full" />
                                        En línea
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-black hover:bg-black/10"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800/50">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[80%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isBot ? 'gold-accent' : 'bg-primary'
                                            }`}>
                                            {msg.isBot ? <Sparkles className="h-4 w-4 text-black" /> : <User className="h-4 w-4 text-white" />}
                                        </div>
                                        <div className={`px-4 py-3 rounded-2xl ${msg.isBot
                                            ? 'bg-white dark:bg-slate-700 shadow-sm'
                                            : 'bg-primary text-white'
                                            }`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="h-8 w-8 rounded-full gold-accent flex items-center justify-center">
                                        <Sparkles className="h-4 w-4 text-black" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-700 px-4 py-3 rounded-2xl shadow-sm">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.map((reply) => (
                                        <motion.button
                                            key={reply}
                                            className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleQuickReply(reply)}
                                        >
                                            {reply}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                            <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1 rounded-full bg-slate-100 dark:bg-slate-800 border-0"
                                />
                                <motion.button
                                    type="submit"
                                    className="h-10 w-10 rounded-full gold-accent flex items-center justify-center text-black"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Send className="h-4 w-4" />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
