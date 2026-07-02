import type { Metadata } from 'next'
import { TEMPLATES } from '@/lib/templates'

const TEMPLATE_SEO: Record<string, { title: string; description: string }> = {
  southindian: {
    title: 'South Indian Wedding Invitation',
    description: 'Stunning Kerala kasavu gold animated wedding invitation with coconut trees, boat animation, diya glow & kolam patterns. Customize & share via WhatsApp.',
  },
  invitation: {
    title: 'Ethnic Pure Hindu Wedding Invitation',
    description: 'Classic gold & green animated wedding invitation with peacock opener, lantern parallax, ornate kasavu frames. Perfect for traditional Hindu weddings.',
  },
  template2: {
    title: 'Palace Romance Wedding Invitation',
    description: 'Regal palace backdrop animated wedding card with cloud parallax, swing decorations & walking elephant. Elegant Hindu wedding invitation.',
  },
  template3: {
    title: 'Watercolor Ink Wedding Invitation',
    description: 'Artistic watercolor animated wedding invitation with ink botanical vines, floating swans & caricature style. Unique and creative wedding card.',
  },
  template4: {
    title: 'Pichwai Art Wedding Invitation',
    description: 'Krishna-Radha Pichwai painting animated wedding card with cow animations, lotus pond & sriji intro. Traditional Hindu wedding invitation.',
  },
  punjabi: {
    title: 'Punjabi Sikh Wedding Invitation — Anand Karaj',
    description: 'Turmeric & plum animated wedding invitation with Ik Onkar, Golden Temple, floating diyas & water reflection. Beautiful Sikh Anand Karaj card.',
  },
  christian: {
    title: 'Christian Beach Wedding Invitation',
    description: 'Ocean gradient animated Christian wedding invitation with animated waves, floating swans, lantern parallax & beach sunset. Elegant beach wedding card.',
  },
  modern: {
    title: 'Cosmic Modern Wedding Invitation',
    description: 'Celestial starry night animated wedding invitation with meteor showers, constellations & moonrise effects. Contemporary wedding card for modern couples.',
  },
  mandala: {
    title: 'Sacred Mandala Wedding Invitation',
    description: 'Rotating mandala rings animated wedding invitation with jewel tones, sacred geometry borders & spinning dividers. Spiritual Hindu wedding card.',
  },
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const template = TEMPLATES.find(t => t.id === id)
  if (!template) return {}

  const seo = TEMPLATE_SEO[id] || {
    title: `${template.name} Wedding Invitation`,
    description: template.description,
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `https://vivahpatra.co/preview/${id}` },
    openGraph: {
      title: `${seo.title} | Vivah Patra`,
      description: seo.description,
      url: `https://vivahpatra.co/preview/${id}`,
      images: [
        {
          url: `/templates/${id}.webp`,
          width: 900,
          height: 1600,
          alt: `${template.name} Wedding Invitation Template`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seo.title} | Vivah Patra`,
      description: seo.description,
      images: [`/templates/${id}.webp`],
    },
  }
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
