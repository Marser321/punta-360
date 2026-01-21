import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    variant?: "full" | "icon"
    size?: "sm" | "md" | "lg"
    theme?: "dark" | "light"
}

export function Logo({ className, variant = "full", size = "md", theme = "dark" }: LogoProps) {
    const sizeClasses = {
        sm: "h-6",
        md: "h-8",
        lg: "h-12"
    }

    const colorClass = theme === "dark" ? "text-white" : "text-slate-900"

    return (
        <div className={cn("flex items-center gap-2 font-sans select-none", className)}>
            {/* Isometric P/360 Icon */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn("w-auto", sizeClasses[size])}
            >
                {/* Outer Ring / 360 concept */}
                <circle cx="50" cy="50" r="40" stroke="url(#logo_gradient)" strokeWidth="8" strokeOpacity="0.3" />
                <path d="M50 10 A 40 40 0 0 1 90 50" stroke="url(#logo_gradient)" strokeWidth="8" strokeLinecap="round" />

                {/* Central Prism/Pin */}
                <path
                    d="M50 25 L72 38 V63 L50 75 L28 63 V38 Z"
                    fill="url(#logo_gradient)"
                    className="drop-shadow-sm"
                />
                <path
                    d="M50 25 L50 50 L72 38"
                    diffuseConstant="1.5"
                    fill="white"
                    fillOpacity="0.3"
                />

                <defs>
                    <linearGradient id="logo_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FBBF24" /> {/* amber-400 */}
                        <stop offset="100%" stopColor="#D97706" /> {/* amber-600 */}
                    </linearGradient>
                </defs>
            </svg>

            {variant === "full" && (
                <div className={cn("leading-none tracking-tight flex flex-col justify-center", colorClass)}>
                    <span className={cn("font-bold",
                        size === "sm" ? "text-lg" :
                            size === "md" ? "text-xl" : "text-3xl"
                    )}>
                        Punta<span className="text-amber-500">360</span>
                    </span>
                </div>
            )}
        </div>
    )
}
