"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Search, Loader2, MessageCircle, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        async function fetchLeads() {
            // Fetch leads with property details
            const { data, error } = await supabase
                .from('leads')
                .select(`
          *,
          properties (
            title
          )
        `)
                .order('created_at', { ascending: false })

            if (error) {
                console.error("Error fetching leads:", error)
            } else {
                setLeads(data || [])
            }
            setIsLoading(false)
        }

        fetchLeads()
    }, [])

    const getWhatsAppLink = (phone: string) => {
        // Basic cleanup of phone number
        const cleanPhone = phone.replace(/\D/g, "")
        return `https://wa.me/${cleanPhone}`
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Gestión de Leads</h2>
                    <p className="text-muted-foreground">Potenciales clientes capturados por tu Agente IA.</p>
                </div>
            </div>

            <Card className="glass-card border-none">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Últimos Contactos</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por nombre..."
                                className="pl-8 glass-input border-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-white/10 hover:bg-transparent">
                                <TableHead>Fecha</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Propiedad de Interés</TableHead>
                                <TableHead>Intención</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : leads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No hay leads todavía. ¡Comparte tus propiedades!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leads.filter(lead =>
                                    lead.visitor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    lead.properties?.title?.toLowerCase().includes(searchQuery.toLowerCase())
                                ).map((lead) => (
                                    <TableRow key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <TableCell className="font-medium">
                                            {format(new Date(lead.created_at), "dd MMM, HH:mm", { locale: es })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">{lead.visitor_name}</span>
                                                <span className="text-xs text-muted-foreground">{lead.visitor_contact}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{lead.properties?.title || "Propiedad Desconocida"}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {lead.intent_data?.intent === 'buy' && <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 border-0">Comprar</Badge>}
                                                {lead.intent_data?.budget && (
                                                    <Badge variant="outline" className="border-primary/20 text-primary">
                                                        {lead.intent_data.budget}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-md rounded-full" onClick={() => window.open(getWhatsAppLink(lead.visitor_contact), '_blank')}>
                                                <MessageCircle className="w-4 h-4 mr-1" />
                                                WhatsApp
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
