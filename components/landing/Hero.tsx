'use client'
import { motion } from 'framer-motion'
import Button from '@/components/shared/Button'
import { TEMPLATES } from '@/lib/templates'

export default function Hero() {
  const featured = TEMPLATES[0]

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'rgba(200,146,42,0.06)', top: '-15%', left: '10%' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: 'rgba(200,146,42,0.04)', bottom: '0%', right: '5%' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <motion.p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-6 glow-pulse"
              style={{ color: 'var(--color-accent)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Digital Wedding Invitations
            </motion.p>

            <h1 className="font-display leading-[1.15]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <motion.span className="block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                Beautiful Animated
              </motion.span>
              <motion.span className="block shimmer-text pb-1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                Wedding Invites
              </motion.span>
            </h1>

            <motion.p className="font-sans text-sm mt-6 leading-relaxed max-w-md"
              style={{ color: 'var(--color-muted)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Stunning templates for every Indian wedding culture. Customize in minutes, share instantly via WhatsApp. Starting at ₹1499.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <Button href="/templates">Browse Templates</Button>
              <Button href="/#how-it-works" variant="outline">How It Works</Button>
            </motion.div>

            <motion.div className="flex items-center gap-6 mt-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              {[['9+', 'Templates'], ['500+', 'Couples'], ['5', 'Cultures']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-xl" style={{ color: 'var(--color-accent)' }}>{num}</p>
                  <p className="font-sans text-[10px] tracking-wider uppercase" style={{ color: 'var(--color-muted)' }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Phone mockup with live template */}
          <motion.div className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 blur-[80px] rounded-full"
                style={{ background: 'rgba(200,146,42,0.12)', transform: 'scale(1.3)' }} />

              {/* Phone frame */}
              <div className="relative w-[260px] sm:w-[280px] float-anim">
                <div className="rounded-[36px] overflow-hidden border-[5px] shadow-2xl"
                  style={{ borderColor: '#2a2a2a', aspectRatio: '9/16', background: featured.color }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl z-20" style={{ background: '#1a1a1a' }} />
                  <iframe
                    src={featured.url}
                    className="absolute inset-0 w-[300%] h-[300%] origin-top-left"
                    style={{ transform: 'scale(0.3333)', border: 'none', pointerEvents: 'none' }}
                    title={featured.name}
                  />
                </div>
                {/* Template label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-sans text-[10px] tracking-wider"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
                  {featured.name}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
