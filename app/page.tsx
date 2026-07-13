export const revalidate = 3600 // Cache page 1 hour — all dynamic parts are client components

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SaleBanner from '@/components/landing/SaleBanner'
import Hero from '@/components/landing/Hero'

const FeaturedTemplates = dynamic(() => import('@/components/landing/FeaturedTemplates'))
const FeatureShowcase = dynamic(() => import('@/components/landing/FeatureShowcase'))
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'))
const WhyChooseUs = dynamic(() => import('@/components/landing/WhyChooseUs'))
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'))
const FAQ = dynamic(() => import('@/components/landing/FAQ'))
const FinalCTA = dynamic(() => import('@/components/landing/FinalCTA'))
const SeoContent = dynamic(() => import('@/components/landing/SeoContent'))
const Footer = dynamic(() => import('@/components/shared/Footer'))

export const metadata: Metadata = {
  title: 'Vivah Patra — Animated Digital Wedding Invitations India | From ₹1499',
  description: 'Create beautiful animated digital wedding invitations for every Indian wedding — Hindu, Sikh, Christian & Modern. 9+ templates. Customize in minutes, share via WhatsApp. One-time payment ₹1499.',
  alternates: { canonical: 'https://vivahpatra.co' },
  openGraph: {
    title: 'Vivah Patra — Animated Digital Wedding Invitations India',
    description: 'Beautiful animated digital wedding invitations for every Indian culture. Hindu, Sikh, Christian & Modern. 9+ templates from ₹1499. Share via WhatsApp.',
    url: 'https://vivahpatra.co',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Vivah Patra Animated Wedding Invitations' }],
  },
}

export default function Page() {
  return (
    <>
      <SaleBanner />
      <Hero />
      <FeaturedTemplates />
      <FeatureShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <SeoContent />
      <FinalCTA />
      <Footer />
    </>
  )
}
