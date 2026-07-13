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
  title: {
    default: 'Vivah Patra — Beautiful Animated Wedding Invitations',
    template: '%s | Vivah Patra',
  },
  description: 'Create stunning animated digital wedding invitations for every Indian culture. 9+ templates — Hindu, Sikh, Christian, Modern. Customize in minutes, share via WhatsApp. Starting at ₹1499.',
  keywords: [
    'digital wedding invitation', 'animated wedding card', 'online wedding invitation India',
    'Hindu wedding invitation', 'Sikh wedding invitation', 'Christian wedding invitation',
    'South Indian wedding invitation', 'Punjabi wedding card', 'WhatsApp wedding invitation',
    'wedding e-card', 'wedding invitation maker', 'wedding invitation template India',
    'digital shaadi card', 'vivah patra', 'animated wedding invite',
  ],
  authors: [{ name: 'Vivah Patra', url: 'https://vivahpatra.co' }],
  creator: 'Vivah Patra',
  publisher: 'Vivah Patra',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  metadataBase: new URL('https://vivahpatra.co'),
  alternates: { canonical: 'https://vivahpatra.co' },
  openGraph: {
    title: 'Vivah Patra — Beautiful Animated Wedding Invitations',
    description: 'Create stunning animated wedding invitations for every Indian culture. 9+ templates — Hindu, Sikh, Christian & Modern. Customize in minutes, share via WhatsApp. Starting at ₹1499.',
    url: 'https://vivahpatra.co',
    siteName: 'Vivah Patra',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Vivah Patra — Animated Wedding Invitations' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivah Patra — Animated Wedding Invitations',
    description: '9+ stunning templates for every Indian wedding. Customize & share via WhatsApp. Starting ₹1499.',
    images: ['/og.png'],
    creator: '@vivahpatra',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://vivahpatra.co/#organization',
      name: 'Vivah Patra',
      url: 'https://vivahpatra.co',
      logo: { '@type': 'ImageObject', url: 'https://vivahpatra.co/favicon.png' },
      sameAs: [],
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@vivahpatra.co' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://vivahpatra.co/#website',
      url: 'https://vivahpatra.co',
      name: 'Vivah Patra',
      publisher: { '@id': 'https://vivahpatra.co/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://vivahpatra.co/templates?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://vivahpatra.co/#app',
      name: 'Vivah Patra',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'Web',
      description: 'Create animated digital wedding invitations. 9+ templates for Hindu, Sikh, Christian & Modern weddings.',
      offers: {
        '@type': 'Offer',
        price: '1499',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" href="/templates/template2.webp" as="image" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      <body className="font-sans antialiased" onContextMenu={e => e.preventDefault()} onDragStart={e => e.preventDefault()}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('contextmenu', e => e.preventDefault());
          document.addEventListener('dragstart', e => e.preventDefault());
          document.addEventListener('keydown', e => {
            if (e.key === 'F12') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key.toUpperCase() === 'U') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key.toUpperCase() === 'S') { e.preventDefault(); return false; }
          });
        `}} />
      </body>
    </html>
  )
}
