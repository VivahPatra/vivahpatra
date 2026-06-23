'use client'
import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'

export default function Hero() {
  return (
    <section className="py-28 md:py-40 text-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: 'rgba(200,146,42,0.08)', top: '-10%', left: '20%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[160px]"
          style={{ background: 'rgba(200,146,42,0.05)', bottom: '0%', right: '10%' }} />
      </div>

      <motion.div className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>

        <motion.p className="font-sans text-xs tracking-[0.5em] uppercase mb-6 glow-pulse"
          style={{ color: 'var(--color-accent)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          ✦ &nbsp; Digital Wedding Invitations &nbsp; ✦
        </motion.p>

        <h1 className="font-display leading-[0.95]" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
          <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            Create Your
          </motion.span>
          <motion.span className="block shimmer-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            Perfect Invite
          </motion.span>
        </h1>

        <motion.p className="font-sans text-base mt-8 max-w-lg mx-auto leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          Stunning animated templates for every Indian wedding culture.
          Customize in minutes. Share instantly via WhatsApp.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <Button href="/templates">Explore Templates</Button>
          <Button href="/#how-it-works" variant="outline">How It Works</Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="mt-20 flex flex-col items-center gap-2" style={{ opacity: 0.3 }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1.5 }}>
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--color-accent)' }}>Scroll</span>
          <motion.div className="w-px h-10"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
