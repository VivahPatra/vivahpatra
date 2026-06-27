import dynamic from 'next/dynamic'
import Hero from '@/components/landing/Hero'
import FeaturedTemplates from '@/components/landing/FeaturedTemplates'

const FeatureShowcase = dynamic(() => import('@/components/landing/FeatureShowcase'))
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks'))
const WhyChooseUs = dynamic(() => import('@/components/landing/WhyChooseUs'))
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'))
const FAQ = dynamic(() => import('@/components/landing/FAQ'))
const FinalCTA = dynamic(() => import('@/components/landing/FinalCTA'))
const Footer = dynamic(() => import('@/components/shared/Footer'))

export default function Page() {
  return (
    <>
      <Hero />
      <FeaturedTemplates />
      <FeatureShowcase />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
