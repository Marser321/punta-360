"use client"

import { Button } from "@/components/ui/button"
import { MessageCircleQuestion } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function HelpButton() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105">
                        <MessageCircleQuestion className="h-7 w-7" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="glass border-white/20 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>¿Necesitas ayuda con Punta360?</DialogTitle>
                        <DialogDescription>
                            Aquí tienes algunos accesos rápidos para gestionar tu inmobiliaria.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary/5 border-primary/20">
                                <span className="text-xl">📸</span>
                                Pack 360
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary/5 border-primary/20">
                                <span className="text-xl">🚁</span>
                                Drone
                            </Button>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg text-sm">
                            <p className="font-semibold mb-1">Tip Pro:</p>
                            <p>Usa el modo oscuro (🌙) para presentaciones nocturnas con clientes. Se ve mucho más elegante en iPad.</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
