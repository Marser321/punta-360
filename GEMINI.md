Estructura del Proyecto y Funcionalidades Clave (MVP):

Landing Page (Conversión):

Hero section con video de fondo (drone footage simulado).

Dos "Call to Action" claros: "¿Buscas Propiedad?" (Cliente) vs "¿Eres Inmobiliaria?" (Agente).

Sección de "Servicios Destacados" mostrando tarjetas de: Tour Virtual 360, Fotografía Drone, Edición de Reels.

Módulo "Services Booking" (La innovación):

Un flujo tipo e-commerce donde un Agente Inmobiliario puede "pedir" un servicio.

Formulario: Tipo de propiedad -> Selección de Servicio (Pack 360 / Pack Redes / Pack Drone) -> Selección de Fecha -> Pago (Placeholder).

Dashboard del Agente: "Mis Pedidos", "Descargar Material Editado", "Ver Estado".

Módulo Marketplace (El escaparate):

Grid de propiedades. Cada tarjeta debe priorizar la imagen vertical (formato TikTok/Reel) sobre la horizontal clásica.

Página de Detalle de Propiedad: Debe integrar un visor 360 (usa react-pannellum o similar como placeholder) y un botón flotante de "Hablar con Agente IA".

Módulo "Agente IA" (Simulado para MVP):

Un chat flotante en la esquina inferior derecha.

Prompt del sistema (simulado): "Actúa como un concierge de Punta del Este. Califica al lead preguntando presupuesto y fecha de viaje antes de pedir el WhatsApp".

Reglas de "Vibe Coding" (Cómo quiero que programes):

Iterativo: No intentes hacer todo perfecto en el primer paso. Crea la estructura de carpetas y los componentes "esqueleto" primero.

Componentes Reutilizables: Crea componentes pequeños en components/ui y úsalos. No repitas código Tailwind largo.

Datos Mock: Usa datos falsos realistas (ej: "Apartamento en Mansa, USD 450.000", "Servicio de Drone en José Ignacio") para que la UI se vea llena desde el inicio.

Manejo de Errores: Si algo falla, no te detengas, pon un console.error y una UI de "fallback" simple.

Mobile First: Asegúrate de que todo se vea perfecto en celular, ya que los agentes trabajan desde el móvil.

Primer Paso: Genera la estructura de carpetas del proyecto Next.js, configura Tailwind y Shadcn, y crea la Landing Page completa con la navegación y la sección de "Servicios para Inmobiliarias".

Guía de "Vibe Coding" (Cómo iterar después del primer prompt)
El "Vibe Coding" no es escribir código, es dirigir a la IA. Una vez que tengas la base con el prompt de arriba, usa estos "micro-prompts" para mejorar la app paso a paso:

Para mejorar el diseño (El "Vibe"):

"El diseño se siente muy corporativo. Cámbialo a un estilo 'Boutique Hotel'. Usa una paleta de colores crema y negro carbón. Haz que las tarjetas de propiedades tengan bordes redondeados grandes y sombras muy suaves al pasar el mouse."

Para agregar la función de 360º:

"Crea un componente VirtualTourViewer usando una librería estándar de React. En la página de detalle de propiedad, reemplaza la imagen principal con este visor. Quiero que tenga botones de control minimalistas en la parte inferior."

Para el sistema de Agendamiento (Servicios):

"En el dashboard del agente, añade una vista de calendario. Quiero que cuando hagan clic en un día, se abra un modal para agendar una sesión de fotos de drone. Usa los componentes de 'Dialog' y 'Calendar' de Shadcn."

Para la Integración de IA (Prospección):

"Modifica el formulario de contacto. En lugar de un formulario estático, haz que parezca un chat de iMessage. El usuario escribe 'Hola' y el sistema responde automáticamente con opciones predefinidas: 'Quiero comprar', 'Quiero vender', 'Quiero agendar fotos'."