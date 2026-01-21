"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { driver, Driver } from "driver.js"
import "driver.js/dist/driver.css"
import { landingTourSteps, dashboardTourSteps, marketplaceTourSteps } from "@/lib/tour-steps"

type TourType = 'landing' | 'dashboard' | 'marketplace'

interface OnboardingContextType {
    startTour: (tourType: TourType) => void
    hasCompletedTour: (tourType: TourType) => boolean
    resetTour: (tourType: TourType) => void
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function useOnboarding() {
    const context = useContext(OnboardingContext)
    if (!context) {
        throw new Error("useOnboarding must be used within OnboardingProvider")
    }
    return context
}

const TOUR_STORAGE_KEY = "punta360_completed_tours"

function getCompletedTours(): TourType[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(TOUR_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

function setTourCompleted(tourType: TourType) {
    const completed = getCompletedTours()
    if (!completed.includes(tourType)) {
        completed.push(tourType)
        localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(completed))
    }
}

function removeTourCompleted(tourType: TourType) {
    const completed = getCompletedTours()
    const filtered = completed.filter(t => t !== tourType)
    localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(filtered))
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [driverInstance, setDriverInstance] = useState<Driver | null>(null)

    useEffect(() => {
        // Create driver instance with custom styling
        const driverObj = driver({
            showProgress: true,
            animate: true,
            smoothScroll: true,
            allowClose: true,
            overlayColor: 'rgba(0, 0, 0, 0.75)',
            stagePadding: 10,
            stageRadius: 10,
            popoverClass: 'punta360-popover',
            nextBtnText: 'Siguiente →',
            prevBtnText: '← Anterior',
            doneBtnText: '¡Listo!',
            onDestroyStarted: () => {
                driverObj.destroy()
            },
        })
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDriverInstance(driverObj)

        return () => {
            driverObj.destroy()
        }
    }, [])

    const startTour = (tourType: TourType) => {
        if (!driverInstance) return

        let steps
        switch (tourType) {
            case 'landing':
                steps = landingTourSteps
                break
            case 'dashboard':
                steps = dashboardTourSteps
                break
            case 'marketplace':
                steps = marketplaceTourSteps
                break
        }

        driverInstance.setSteps(steps)
        driverInstance.drive()

        // Mark as completed when tour ends
        const originalOnDestroyStarted = driverInstance.getConfig().onDestroyStarted
        driverInstance.setConfig({
            onDestroyStarted: (...args: any[]) => {
                setTourCompleted(tourType)
                // @ts-ignore
                if (originalOnDestroyStarted) originalOnDestroyStarted(...args)
            }
        })
    }

    const hasCompletedTour = (tourType: TourType): boolean => {
        return getCompletedTours().includes(tourType)
    }

    const resetTour = (tourType: TourType) => {
        removeTourCompleted(tourType)
    }

    return (
        <OnboardingContext.Provider value={{ startTour, hasCompletedTour, resetTour }}>
            {children}
            <style jsx global>{`
                .driver-popover.punta360-popover {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%) !important;
                    border: 1px solid rgba(251, 191, 36, 0.3) !important;
                    border-radius: 16px !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.1) !important;
                    color: white !important;
                }
                
                .driver-popover.punta360-popover .driver-popover-title {
                    font-size: 1.1rem !important;
                    font-weight: 700 !important;
                    color: #fbbf24 !important;
                }
                
                .driver-popover.punta360-popover .driver-popover-description {
                    color: #cbd5e1 !important;
                    font-size: 0.95rem !important;
                    line-height: 1.6 !important;
                }
                
                .driver-popover.punta360-popover .driver-popover-progress-text {
                    color: #94a3b8 !important;
                }
                
                .driver-popover.punta360-popover button {
                    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%) !important;
                    color: black !important;
                    border: none !important;
                    border-radius: 8px !important;
                    font-weight: 600 !important;
                    padding: 8px 16px !important;
                    transition: all 0.2s !important;
                }
                
                .driver-popover.punta360-popover button:hover {
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4) !important;
                }
                
                .driver-popover.punta360-popover .driver-popover-prev-btn {
                    background: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                }
                
                .driver-popover.punta360-popover .driver-popover-prev-btn:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                }
                
                .driver-popover.punta360-popover .driver-popover-arrow-side-left.driver-popover-arrow,
                .driver-popover.punta360-popover .driver-popover-arrow-side-right.driver-popover-arrow,
                .driver-popover.punta360-popover .driver-popover-arrow-side-top.driver-popover-arrow,
                .driver-popover.punta360-popover .driver-popover-arrow-side-bottom.driver-popover-arrow {
                    border-color: rgba(15, 23, 42, 0.95) !important;
                }
            `}</style>
        </OnboardingContext.Provider>
    )
}
