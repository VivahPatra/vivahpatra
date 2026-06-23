'use client'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/lib/templates'
import Button from '@/components/shared/Button'

export default function FeaturedTemplates() {
  const doubled = [...TEMPLATES, ...TEMPLATES]

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 10%, var(--color-surface) 90%, var(--color-bg) 100%)' }} />

      <div className="relative z-10">
        <motion.div className="max-w-6xl mx-auto px-6 text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Curated Collection</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Explore Our Templates</h2>
          <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>Handpicked designs loved by couples across India</p>
        </motion.div>

        <style>{`
          @keyframes carouselScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="relative pointer-events-none select-none">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10" style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10" style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }} />

          <div className="flex gap-6" style={{ width: 'max-content', animation: 'carouselScroll 45s linear infinite' }}>
            {doubled.map((t, i) => (
              <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[200px]">
                <div className="rounded-[24px] overflow-hidden shadow-2xl relative"
                  style={{ aspectRatio: '9/16', background: t.color, border: '2px solid rgba(255,255,255,0.06)' }}>
                  <img src={`/templates/${t.id}.jpg`} alt={t.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div className="absolute inset-0 flex items-end p-4"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}>
                    <p className="font-display text-white text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{t.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 px-6">
          <Button href="/templates">View All Templates</Button>
        </div>
      </div>
    </section>
  )
}
