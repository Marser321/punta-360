
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { HelpButton } from "@/components/dashboard/help-button"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full relative min-h-screen overflow-hidden">
            {/* === REAL ESTATE LUXURY BACKGROUND === */}
            {/* Layer 1: Base gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />

            {/* Layer 2: Modern Architecture Photo */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: 0.35
                }}
            />

            {/* Layer 3: Elegant overlay with subtle grid pattern */}
            <div className="fixed inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/70 to-slate-950/80 z-0" />

            {/* Subtle grid pattern overlay */}
            <div
                className="fixed inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Sidebar with Liquid Glass */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <div className="h-full glass-sidebar">
                    <DashboardSidebar />
                </div>
            </div>

            {/* Main Content */}
            <main className="md:pl-72 h-full transition-colors duration-300 relative z-10">
                <DashboardHeader />
                <div className="p-4 md:p-8 h-full relative">
                    {children}
                </div>
                <HelpButton />
            </main>
        </div>
    )
}
