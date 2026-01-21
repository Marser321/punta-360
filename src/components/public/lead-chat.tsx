
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase/client"

type Message = {
    id: number
    text: string
    isBot: boolean
    options?: string[]
}

export function LeadChat({ agentName = "Agente IA" }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: `Hola, soy el asistente de ${agentName}. ¿Te interesa esta propiedad para vivir o como inversión?`,
            isBot: true,
            options: ["Vivir", "Inversión", "Solo mirando"]
        }
    ])
    const [inputValue, setInputValue] = useState("")
    const [intentData, setIntentData] = useState<any>({ intent: '', budget: '', timeline: '' })
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleOptionClick = (option: string) => {
        addMessage(option, false)

        // Store Intent Data (Basic logic for demo)
        if (["Vivir", "Inversión"].includes(option)) {
            setIntentData((prev: any) => ({ ...prev, intent: option }))
        } else if (option.includes("mes")) {
            setIntentData((prev: any) => ({ ...prev, timeline: option }))
        } else if (option.includes("k")) {
            setIntentData((prev: any) => ({ ...prev, budget: option }))
        }

        setTimeout(() => {
            botResponse(option)
        }, 800)
    }

    const handleSend = async () => {
        if (!inputValue.trim()) return
        const msg = inputValue
        addMessage(msg, false)
        setInputValue("")

        // Check if input looks like contact info (basic check)
        if (msg.includes("@") || msg.match(/\d{8,}/)) { // Simple email or phone check
            await saveLead(msg)
            setTimeout(() => {
                addMessage("¡Gracias! He guardado tu contacto. Un agente humano te escribirá pronto.", true)
            }, 1000)
        } else {
            setTimeout(() => {
                // Fallback generic response if not capturing contact yet
                botResponse(msg)
            }, 1000)
        }
    }

    const saveLead = async (contact: string) => {
        // Mock Property ID for demo property
        // In real app, pass propertyId as prop
        const { error } = await supabase.from('leads').insert({
            property_id: '00000000-0000-0000-0000-000000000000', // Using ID from seed
            visitor_contact: contact,
            intent_data: intentData,
            visitor_name: 'Visitor ' + new Date().toLocaleTimeString(),
            is_read: false
        })
        if (error) console.error("Error saving lead:", error)
        else console.log("Lead saved!")
    }

    const addMessage = (text: string, isBot: boolean, options?: string[]) => {
        setMessages(prev => [...prev, { id: Date.now(), text, isBot, options }])
    }

    const botResponse = (lastUserMessage: string) => {
        if (lastUserMessage === "Vivir" || lastUserMessage === "Inversión") {
            addMessage("Excelente. ¿Para qué fecha estás buscando mudarte/comprar?", true, ["Este mes", "Próximos 3 meses", "Sin fecha definida"])
        } else if (lastUserMessage.includes("mes") || lastUserMessage.includes("fecha")) {
            addMessage("Entendido. Por último, ¿cuál es tu rango de presupuesto aproximado?", true, ["< 300k", "300k - 500k", "> 500k"])
        } else if (lastUserMessage.includes("k")) {
            addMessage("Perfecto, tengo tu perfil pre-calificado. ¿Me dejas tu WhatsApp o Email para enviarte la ficha técnica completa?", true)
        } else {
            // Generic conversational fallback
            if (!lastUserMessage.includes("@") && !lastUserMessage.match(/\d{8,}/)) {
                addMessage("¿Tienes alguna otra duda o quieres dejar tu contacto?", true)
            }
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8 border border-white/20 ring-2 ring-cyan-500/30">
                                    <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" />
                                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">IA</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-sm font-semibold">{agentName}</h3>
                                    <p className="text-xs text-zinc-300 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                        En línea
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-zinc-300 hover:text-white" onClick={() => setIsOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Chat Body */}
                        <div className="h-[400px] p-4 overflow-y-auto bg-slate-50" ref={scrollRef}>
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                        {msg.isBot && (
                                            <Avatar className="h-6 w-6 mr-2 mt-1">
                                                <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" />
                                                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs">IA</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="max-w-[80%] space-y-2">
                                            <div className={`p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white text-slate-800 border shadow-sm rounded-tl-none' : 'bg-slate-900 text-white rounded-tr-none'}`}>
                                                {msg.text}
                                            </div>
                                            {msg.options && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {msg.options.map(option => (
                                                        <button
                                                            key={option}
                                                            onClick={() => handleOptionClick(option)}
                                                            className="text-xs bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1 bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-slate-200"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Button size="icon" type="submit" className="bg-slate-900 hover:bg-slate-800 shrink-0">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
            >
                {isOpen ? <X /> : <MessageSquare />}
            </motion.button>
        </div>
    )
}
