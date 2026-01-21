import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/sonner"
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://punta360-demo.vercel.app'), // TODO: Replace with actual domain
  title: {
    default: 'Punta360 - Luxury Real Estate',
    template: '%s | Punta360'
  },
  description: 'Gestión inmobiliaria premium en Punta del Este. Encuentra tu próxima inversión en el paraíso.',
  openGraph: {
    type: 'website',
    locale: 'es_UY',
    url: 'https://punta360-demo.vercel.app',
    siteName: 'Punta360',
    images: [
      {
        url: '/og-default.jpg', // We need to ensure this exists or use an external URL
        width: 1200,
        height: 630,
        alt: 'Punta360 Real Estate'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <OnboardingProvider>
            {children}
          </OnboardingProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

