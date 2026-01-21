import { DriveStep } from "driver.js"

// Tour for Landing Page - helps visitors understand the platform
export const landingTourSteps: DriveStep[] = [
    {
        element: '[data-tour="hero"]',
        popover: {
            title: "🏠 Bienvenido a Punta360",
            description: "La plataforma inmobiliaria #1 de Punta del Este. Conectamos propiedades de lujo con compradores exclusivos.",
            side: "bottom",
            align: "center",
        },
    },
    {
        element: '[data-tour="cta-comprador"]',
        popover: {
            title: "🔍 ¿Buscas propiedad?",
            description: "Explora nuestro marketplace con propiedades exclusivas, tours virtuales 360° y más.",
            side: "bottom",
            align: "center",
        },
    },
    {
        element: '[data-tour="cta-agente"]',
        popover: {
            title: "📸 ¿Eres inmobiliaria?",
            description: "Accede a servicios de producción multimedia: fotografía drone, tours 360°, edición de reels.",
            side: "bottom",
            align: "center",
        },
    },
    {
        element: '[data-tour="servicios"]',
        popover: {
            title: "🎬 Servicios Premium",
            description: "Contrata fotógrafos profesionales, drones y editores con un solo clic. ¡El Uber de la fotografía inmobiliaria!",
            side: "top",
            align: "center",
        },
    },
]

// Tour for Dashboard - helps agents understand the panel
export const dashboardTourSteps: DriveStep[] = [
    {
        element: '[data-tour="sidebar"]',
        popover: {
            title: "📋 Menú de Navegación",
            description: "Accede a todas las secciones: propiedades, marketplace, leads y servicios multimedia.",
            side: "right",
            align: "start",
        },
    },
    {
        element: '[data-tour="stats"]',
        popover: {
            title: "📊 Tus Estadísticas",
            description: "Monitorea el rendimiento de tus propiedades: visitas, leads generados y conversiones.",
            side: "bottom",
            align: "center",
        },
    },
    {
        element: '[data-tour="promo-card"]',
        popover: {
            title: "🌟 Promociones Exclusivas",
            description: "Descubre nuestros packs de servicios con descuentos especiales para tu inmobiliaria.",
            side: "left",
            align: "start",
        },
    },
    {
        element: '[data-tour="orders"]',
        popover: {
            title: "📦 Tus Pedidos",
            description: "Aquí puedes ver el estado de tus servicios contratados y descargar el material listo.",
            side: "top",
            align: "center",
        },
    },
    {
        element: '[data-tour="new-service"]',
        popover: {
            title: "➕ Solicitar Servicio",
            description: "¡Haz clic aquí para agendar una sesión de fotos, drone o tour 360°!",
            side: "bottom",
            align: "center",
        },
    },
]

// Tour for Marketplace - helps buyers navigate properties
export const marketplaceTourSteps: DriveStep[] = [
    {
        element: '[data-tour="filters"]',
        popover: {
            title: "🔎 Filtros Inteligentes",
            description: "Filtra propiedades por precio, tipo, ubicación y características para encontrar tu hogar ideal.",
            side: "bottom",
            align: "start",
        },
    },
    {
        element: '[data-tour="property-grid"]',
        popover: {
            title: "🏡 Propiedades Exclusivas",
            description: "Cada tarjeta muestra fotos premium, precio y características principales. ¡Haz clic para ver más!",
            side: "top",
            align: "center",
        },
    },
    {
        element: '[data-tour="property-card"]',
        popover: {
            title: "🎯 Vista 360° Disponible",
            description: "Las propiedades con este ícono tienen tour virtual inmersivo. ¡Explora sin salir de casa!",
            side: "left",
            align: "center",
        },
    },
]
