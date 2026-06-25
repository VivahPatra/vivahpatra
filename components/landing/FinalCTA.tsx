'use client'
import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'

export default function FinalCTA() {
  return (
    <section className="py-28 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[400px] rounded-full blur-[200px]"
          style={{ background: 'rgba(232,56,79,0.06)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      <motion.div className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: '#e8384f' }}>Get Started</p>
        <h2 className="font-display text-3xl md:text-5xl mb-4">
          Ready to Create <span className="shimmer-text pb-1">Your Invite?</span>
        </h2>
        <p className="font-sans text-sm mb-10 leading-relaxed" style={{ color: '#777' }}>
          Join thousands of couples who chose digital invitations for their special day.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/templates">Browse Templates</Button>
          <Button href="/#faq" variant="outline">Read FAQ</Button>
        </div>
      </motion.div>
    </section>
  )
}
