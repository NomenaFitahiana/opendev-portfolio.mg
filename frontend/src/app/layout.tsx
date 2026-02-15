/**
 * Layout principal de l'application Next.js
 * Contient les métadonnées SEO et la structure HTML de base
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenDev Portfolio - Développeurs Madagascar',
  description: 'Pool de développeurs talentueux à Madagascar pour vos projets digitaux',
  keywords: 'développeurs, Madagascar, offshore, web development, mobile app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
