import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ScrollMonitor } from '../components/ScrollMonitor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lompa - Landing Page Moderna',
  description: 'Uma landing page moderna e responsiva com animações avançadas usando Next.js, TypeScript e Framer Motion.',
  keywords: ['landing page', 'next.js', 'typescript', 'framer motion', 'tailwind css'],
  authors: [{ name: 'CursorAgent-FrontEnd' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
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