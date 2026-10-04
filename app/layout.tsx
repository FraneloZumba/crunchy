import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Conectando las fuentes de marca desde public/fonts/
const bodyFont = localFont({
  src: '../public/fonts/Greycliff.otf',
  variable: '--font-body',
  display: 'swap',
})

const displayFont = localFont({
  src: '../public/fonts/Sorbonne.otf',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crunchy | Churros de Autor en Cuenca',
  description: 'Churros de autor, postres y café en Casa Solano, Cuenca. grab it . bite it . love it.',
  generator: 'v0.app', // Puedes quitarlo si ya no usamos v0
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ede8e2', // Color Bone
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}