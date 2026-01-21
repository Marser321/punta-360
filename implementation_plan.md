# Plan de Implementación Masiva & Pack 360 - Punta360 MVP

## Objetivo
Ejecutar una actualización mayor del MVP ("Massive Update") enfocada en la promoción del "Pack 360" y la expansión de funcionalidades operativas para Agentes Inmobiliarios, asegurando una estética "Lujo Minimalista" y robustez técnica.

## 1. Feature: Promoción "Pack 360 Punta Lujo"
**Objetivo:** Educar al Agente y al Cliente final sobre el valor de los tours virtuales y contenido drone, especialmente para el mercado internacional.

### Componentes:
- **Banner Educativo (Dashboard):**
  - Un componente visual `PackPromoBanner` en el Dashboard principal.
  - Diseño: Gradiente atractivo o video de fondo sutil con estética "Glass".
  - Copy: "¿Clientes en el extranjero? Cierra ventas a distancia con el Pack 360."
  - Call to Action (CTA): Lleva directo al formulario de solicitud pre-rellenado.
- **Sección "Info" en Vista Pública (Cliente Final):**
  - En la página pública de la propiedad (`/p/[slug]`), añadir una sección o modal "Why 360?".
  - Explicación: "Explora cada rincón como si estuvieras aquí. Ideal para inversores internacionales."

## 2. Feature: Sistema de Gestión de Leads (CRM Lite)
**Objetivo:** Permitir que los agentes *gestionen* los leads capturados por el Chatbot IA, no solo ver un número.

### Implementación:
- **Nueva Página:** `/dashboard/leads`
- **Tabla Interactiva:**
  - Columnas: Nombre, Interés (Compra/Venta), Presupuesto, Estado (Nuevo/Contactado).
  - Acciones: Botón "Contactar por WhatsApp" directo.
  - Estilo: `GlassTable` con filas hoverables.

## 3. Feature: Mejoras en "Mis Propiedades" & Visor 360
**Objetivo:** Mejorar la presentación de las propiedades y la experiencia del usuario.

### Implementación:
- **Visor 360 Mejorado:**
  - Integrar una librería más robusta o mejorar el iframe mock para que se sienta nativo.
  - Controles de zoom y rotación visibles.
- **Galería tipo "Instagram":**
  - En la vista pública, asegurar que las fotos y videos (Reels) se vean en un grid moderno, no solo un carrusel viejo.

## 4. Testing Completo & QA
**Objetivo:** Asegurar estabilidad antes del despliegue.

### Plan de Pruebas:
- **Flujo de Servicio:** Crear una orden de servicio -> Verificar en Supabase -> Verificar alerta en Dashboard.
- **Flujo de Lead:** Chat en página pública -> Guardado en Supabase -> Aparición en Tabla de Leads.
- **Responsividad:** Verificar Dashboard y Página Pública en resoluciones móviles (iPhone/Android).
- **Build:** Asegurar que `npm run build` pase sin errores (especialmente tras arreglar `sonner`).

## Estructura de Tareas
1. **QA Fix:** Confirmar build exitoso con `sonner` arreglado.
2. **UI:** Crear `PackPromoBanner` y colocarlo en Dashboard.
3. **Dev:** Crear página `/dashboard/leads` y conectar a Supabase.
4. **Dev:** Mejorar `(public)/p/[slug]` con información del Pack 360.
5. **Final:** Despliegue y verificación final.
