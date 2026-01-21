import { OwnerSidebar } from "@/components/owner/sidebar"
import { OwnerHeader } from "@/components/owner/header"

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full relative min-h-screen overflow-hidden">
            {/* === LUXURY OWNER BACKGROUND === */}

            {/* Layer 1: Base warm gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-amber-950 via-stone-900 to-slate-950 z-0" />

            {/* Layer 2: Luxury Property Image */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: 0.35
                }}
            />

            {/* Layer 3: Golden gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-amber-900/20 z-0" />

            {/* Layer 4: Subtle amber glow */}
            <div
                className="fixed inset-0 z-0 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at top right, rgba(251,191,36,0.15) 0%, transparent 50%)'
                }}
            />

            {/* Sidebar with Amber Glass */}
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <div
                    className="h-full border-r border-amber-500/20"
                    style={{
                        background: 'linear-gradient(180deg, rgba(20,15,10,0.9) 0%, rgba(30,20,15,0.95) 100%)',
                        backdropFilter: 'blur(30px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                    }}
                >
                    <OwnerSidebar />
                </div>
            </div>

            {/* Main Content */}
            <main className="md:pl-64 h-full transition-colors duration-300 relative z-10">
                <OwnerHeader />
                <div className="p-4 md:p-8 h-full relative">
                    {children}
                </div>
            </main>
        </div>
    )
}
