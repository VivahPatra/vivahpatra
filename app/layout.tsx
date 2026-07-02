import Script from 'next/script'
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
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
      <head>
        <link rel="preconnect" href="https://template-southindian.vercel.app" />
        <link rel="dns-prefetch" href="https://template-southindian.vercel.app" />
        <link rel="dns-prefetch" href="https://template-invitation-liard.vercel.app" />
        <link rel="dns-prefetch" href="https://template-2-brown.vercel.app" />
        <link rel="dns-prefetch" href="https://template-3-ruddy.vercel.app" />
        <link rel="dns-prefetch" href="https://template-4-chi.vercel.app" />
        <link rel="dns-prefetch" href="https://template-punjabi.vercel.app" />
        <link rel="dns-prefetch" href="https://template-christian.vercel.app" />
        <link rel="dns-prefetch" href="https://template-modern-psi.vercel.app" />
        <link rel="dns-prefetch" href="https://template-mandala.vercel.app" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `}</Script>
          </>
        )}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION || ''} />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
