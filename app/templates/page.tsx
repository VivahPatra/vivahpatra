import { Suspense } from 'react'
import TemplateGrid from '@/components/templates/TemplateGrid'
import Footer from '@/components/shared/Footer'
import SaleBanner from '@/components/landing/SaleBanner'
import { TEMPLATES } from '@/lib/templates'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Invitation Templates — Hindu, Sikh, Christian & Modern',
  description: 'Browse 9+ stunning animated wedding invitation templates. South Indian, Punjabi Sikh, Christian, Watercolor, Palace Romance, Pichwai, Cosmic & more. Starting ₹1499.',
  alternates: { canonical: 'https://vivahpatra.co/templates' },
  openGraph: {
    title: 'Wedding Invitation Templates | Vivah Patra',
    description: '9+ stunning animated templates for every Indian wedding — Hindu, Sikh, Christian & Modern. Customize & share via WhatsApp. Starting ₹1499.',
    url: 'https://vivahpatra.co/templates',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Wedding Invitation Templates',
  description: 'Animated digital wedding invitation templates for every Indian culture',
  numberOfItems: TEMPLATES.length,
  itemListElement: TEMPLATES.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `${t.name} Wedding Invitation`,
      description: t.description,
      url: `https://vivahpatra.co/preview/${t.id}`,
      image: `https://vivahpatra.co/templates/${t.id}.webp`,
      offers: {
        '@type': 'Offer',
        price: t.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    },
  })),
}

export default function TemplatesPage() {
  return (
    <>
      <SaleBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-center mb-2">Choose Your Template</h1>
          <p className="font-sans text-sm text-center mb-10" style={{ color: 'var(--color-muted)' }}>
            Stunning animated invitations for every culture and style
          </p>
          <Suspense fallback={<div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading templates...</div>}>
            <TemplateGrid />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  )
}
