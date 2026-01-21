import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export async function generatePropertyDescription(
    title: string,
    address: string,
    bedrooms: number,
    bathrooms: number,
    areaSqm: number,
    propertyType: string
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        const prompt = `Eres un experto en marketing inmobiliario de lujo en Punta del Este, Uruguay. 
Genera una descripción de venta profesional y atractiva para la siguiente propiedad.

Datos de la propiedad:
- Título: ${title}
- Ubicación: ${address}
- Tipo: ${propertyType === 'apartment' ? 'Apartamento' : propertyType === 'house' ? 'Casa' : propertyType === 'land' ? 'Terreno' : 'Comercial'}
- Dormitorios: ${bedrooms}
- Baños: ${bathrooms}
- Área: ${areaSqm} m²

Instrucciones:
1. Escribe en español rioplatense profesional
2. Máximo 150 palabras
3. Destaca características de lujo y ubicación privilegiada
4. Incluye llamado a la acción sutil
5. Usa frases evocadoras que vendan el estilo de vida
6. NO uses emojis ni puntos suspensivos excesivos

Devuelve SOLO la descripción, sin títulos ni introducciones.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
    } catch (error) {
        console.error("Error generating description:", error)
        throw new Error("No se pudo generar la descripción. Verifica tu API key de Gemini.")
    }
}

interface ConversationMessage {
    role: "user" | "assistant"
    content: string
}

interface PropertyContext {
    title?: string
    price?: number
    address?: string
    bedrooms?: number
    bathrooms?: number
}

export async function chatWithConcierge(
    userMessage: string,
    conversationHistory: ConversationMessage[],
    propertyContext?: PropertyContext
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        const systemPrompt = `Eres un concierge premium de Punta360, la plataforma inmobiliaria más exclusiva de Punta del Este, Uruguay.

TU PERSONALIDAD:
- Profesional pero cercano y cálido
- Experto en el mercado inmobiliario de lujo de Uruguay
- Conoces todas las zonas: La Barra, José Ignacio, Manantiales, Playa Brava, Playa Mansa
- Hablas en español rioplatense elegante

TU OBJETIVO PRINCIPAL:
Calificar leads para el equipo de ventas. Debes obtener:
1. PRESUPUESTO APROXIMADO (critical)
2. FECHA DE VISITA O COMPRA (important)
3. NÚMERO DE WHATSAPP (goal final)

ESTRATEGIA DE CONVERSACIÓN:
- Primero responde la consulta del usuario
- Luego haz UNA pregunta de calificación naturalmente
- Si ya tienes presupuesto y fecha, solicita el WhatsApp amablemente
- Nunca seas insistente ni agresivo
- Ofrece agendar visitas cuando sea apropiado

${propertyContext ? `
CONTEXTO DE PROPIEDAD ACTUAL:
- Nombre: ${propertyContext.title || 'No especificada'}
- Precio: ${propertyContext.price ? `USD $${propertyContext.price.toLocaleString()}` : 'Consultar'}
- Ubicación: ${propertyContext.address || 'Punta del Este'}
- Dormitorios: ${propertyContext.bedrooms || 'N/A'}
- Baños: ${propertyContext.bathrooms || 'N/A'}
` : ''}

REGLAS IMPORTANTES:
- Respuestas CORTAS (máximo 2-3 oraciones)
- NO uses emojis excesivos (máximo 1 por mensaje)
- Si no sabes algo, ofrece conectar con un agente humano
- Siempre da valor antes de pedir información
- Responde SOLO en español`

        // Build conversation for context
        const formattedHistory = conversationHistory.map(msg =>
            `${msg.role === 'user' ? 'Usuario' : 'Concierge'}: ${msg.content}`
        ).join('\n')

        const fullPrompt = `${systemPrompt}

HISTORIAL DE CONVERSACIÓN:
${formattedHistory}

Usuario: ${userMessage}

Concierge:`

        const result = await model.generateContent(fullPrompt)
        const response = await result.response
        return response.text().trim()
    } catch (error) {
        console.error("Error in concierge chat:", error)
        // Fallback response
        return "Disculpa, estoy teniendo dificultades técnicas. ¿Podrías compartirme tu WhatsApp para que un agente te contacte directamente?"
    }
}

