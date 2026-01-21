"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"

const conversations = [
    {
        id: 1,
        name: "Carlos Ruiz",
        role: "Agente Asignado",
        avatar: "CR",
        status: "online",
        lastMessage: "¡Hola! Tengo una oferta por tu propiedad en La Barra.",
        time: "10:30 AM",
        unread: 1
    },
    {
        id: 2,
        name: "Soporte Legal",
        role: "Punta360",
        avatar: "SL",
        status: "offline",
        lastMessage: "Documentación recibida. Todo en orden.",
        time: "Ayer",
        unread: 0
    },
    {
        id: 3,
        name: "Lucía Méndez",
        role: "Fotografía",
        avatar: "LM",
        status: "online",
        lastMessage: "¿Te parece bien el martes para las fotos?",
        time: "Lun",
        unread: 0
    }
]

const messages = [
    {
        id: 1,
        sender: "agent",
        content: "¡Hola Alejandro! Tengo buenas noticias. Acabo de recibir una oferta formal por Villa Sol y Mar.",
        time: "10:30 AM"
    },
    {
        id: 2,
        sender: "agent",
        content: "El interesado ofrece USD 430.000 y quiere cerrar antes de fin de mes. ¿Qué te parece?",
        time: "10:31 AM"
    },
    {
        id: 3,
        sender: "user",
        content: "Hola Carlos! Gracias por avisar. Me parece una oferta razonable pero me gustaría intentar acercarnos más a los 450.",
        time: "10:35 AM"
    },
    {
        id: 4,
        sender: "agent",
        content: "Entiendo perfecto. Voy a comunicarles tu contraoferta. Tienen bastante interés así que soy optimista.",
        time: "10:36 AM"
    }
]

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState(conversations[0])
    const [messageInput, setMessageInput] = useState("")

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6 p-6">
            {/* Sidebar List */}
            <Card className="w-80 flex flex-col glass-card border-none h-full">
                <div className="p-4 border-b border-border/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar conversación..."
                            className="pl-9 bg-secondary/50 border-none"
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-1 p-2">
                        {conversations.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => setActiveChat(chat)}
                                className={`flex items-start gap-3 p-3 text-left rounded-xl transition-all ${activeChat.id === chat.id
                                        ? "bg-primary/10"
                                        : "hover:bg-secondary/50"
                                    }`}
                            >
                                <div className="relative">
                                    <Avatar>
                                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                                            {chat.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    {chat.status === "online" && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="font-semibold text-sm">{chat.name}</span>
                                        <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                                </div>
                                {chat.unread > 0 && (
                                    <Badge className="h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]">
                                        {chat.unread}
                                    </Badge>
                                )}
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col glass-card border-none h-full overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b border-border/50 flex items-center justify-between bg-secondary/20 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback className="bg-primary/20 text-primary font-bold">
                                {activeChat.avatar}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-bold text-sm">{activeChat.name}</h3>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                En línea
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-secondary/50 rounded-full">
                            <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-secondary/50 rounded-full">
                            <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:bg-secondary/50 rounded-full">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages List */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[70%] p-3 rounded-2xl shadow-sm text-sm ${msg.sender === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-secondary text-secondary-foreground rounded-tl-none"
                                        }`}
                                >
                                    <p>{msg.content}</p>
                                    <p className={`text-[10px] mt-1 text-right opacity-70`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-secondary/20 border-t border-border/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-secondary/50 rounded-full shrink-0">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Input
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="bg-transparent border-none focus-visible:ring-0 shadow-none px-2"
                        />
                        <Button size="icon" className="rounded-full shadow-lg shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
