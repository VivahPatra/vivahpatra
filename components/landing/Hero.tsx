'use client'
import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'

export default function Hero() {
  return (
    <section className="py-24 md:py-32 text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,146,42,0.06) 0%, transparent 70%)',
      }} />
      <motion.div className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <p className="font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
          ✦ Beautiful Wedding Invitations ✦
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', lineHeight: 1.1 }}>
          Create Your Perfect{' '}
          <span style={{ color: 'var(--color-accent)' }}>Wedding Invite</span>
        </h1>
        <p className="font-sans text-base mt-6 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Choose from stunning animated templates designed for every Indian wedding culture.
          Customize every detail. Share instantly via WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button href="/templates">Choose a Template</Button>
          <Button href="#how-it-works" variant="outline">How It Works</Button>
        </div>
      </motion.div>
    </section>
  )
}
