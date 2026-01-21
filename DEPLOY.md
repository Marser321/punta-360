# Guía de Despliegue en Vercel

## 1. Configuración de Proyecto
1. Importa este repositorio en Vercel.
2. El framework preset debería detectarse automáticamente (Next.js).

## 2. Variables de Entorno (Environment Variables)
Agrega las siguientes variables en la sección de configuración del proyecto en Vercel.

| Variable | Descripción | Ejemplo / Fuente |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública | `eyJzh...` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | API Key de Google Gemini | `AIzaSy...` |

> **Nota**: No necesitas configurar variables para la base de datos (POSTGRES_URL, etc.) a menos que uses Server Components que conecten directo a la DB sin Supabase SDK.

## 3. Build Command
El comando por defecto debería funcionar correctamente:
- **Build Command**: `next build` (o `npm run build`)
- **Install Command**: `npm install`
