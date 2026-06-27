import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import AuthProvider from '@/components/auth/AuthProvider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vivah Patra — Beautiful Animated Wedding Invitations',
  description: 'Create stunning, animated digital wedding invitations for every Indian culture. 9+ templates — Hindu, Sikh, Christian, Modern. Customize in minutes, share via WhatsApp. Starting at ₹1499.',
  keywords: ['wedding invitation', 'digital wedding card', 'animated invitation', 'Indian wedding', 'Hindu wedding', 'Sikh wedding', 'Christian wedding', 'WhatsApp invitation', 'wedding template'],
  icons: { icon: '/favicon.png' },
  metadataBase: new URL('https://www.vivahpatra.co'),
  openGraph: {
    title: 'Vivah Patra — Beautiful Animated Wedding Invitations',
    description: 'Create stunning digital wedding invitations. 9+ animated templates for every Indian culture. Starting at ₹1499.',
    url: 'https://www.vivahpatra.co',
    siteName: 'Vivah Patra',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivah Patra — Animated Wedding Invitations',
    description: '9+ stunning templates for every Indian wedding. Customize & share via WhatsApp.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
