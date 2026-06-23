import Hero from '@/components/landing/Hero'
import FeaturedTemplates from '@/components/landing/FeaturedTemplates'
import HowItWorks from '@/components/landing/HowItWorks'
import WhyChooseUs from '@/components/landing/WhyChooseUs'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import Footer from '@/components/shared/Footer'

export default function Page() {
  return (
    <>
      <Hero />
      <FeaturedTemplates />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}

