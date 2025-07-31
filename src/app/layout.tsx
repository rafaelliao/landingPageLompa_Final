import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './hero-container-specific.css'
import './mockup-specific.css'
import { ScrollMonitor } from '../components/ScrollMonitor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lompa - Landing Page Moderna',
  description: 'Uma landing page moderna e responsiva com animações avançadas usando Next.js, TypeScript e Framer Motion.',
  keywords: ['landing page', 'next.js', 'typescript', 'framer motion', 'tailwind css'],
  authors: [{ name: 'CursorAgent-FrontEnd' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon_lompa.svg',
    shortcut: '/favicon_lompa.svg',
    apple: '/favicon_lompa.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
        <ScrollMonitor enabled={true} />
      </body>
    </html>
  )
} 