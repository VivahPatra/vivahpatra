'use client'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/lib/templates'
import Button from '@/components/shared/Button'

export default function FeaturedTemplates() {
  const doubled = [...TEMPLATES, ...TEMPLATES]

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #fff 0%, #f8f8f8 10%, #f8f8f8 90%, #fff 100%)' }} />

      <div className="relative z-10">
        <motion.div className="max-w-6xl mx-auto px-6 text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>Curated Collection</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Explore Our Templates</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Handpicked designs loved by couples across India</p>
        </motion.div>

        <style>{`
          @keyframes carouselScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="relative pointer-events-none select-none">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10" style={{ background: 'linear-gradient(to right, #f8f8f8, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10" style={{ background: 'linear-gradient(to left, #f8f8f8, transparent)' }} />

          <div className="flex gap-6" style={{ width: 'max-content', animation: 'carouselScroll 45s linear infinite' }}>
            {doubled.map((t, i) => (
              <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[200px]">
                <div className="relative rounded-[28px] overflow-hidden shadow-2xl"
                  style={{ border: '4px solid #1a1a1a', aspectRatio: '9/19.5', background: '#000' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70px] h-[16px] rounded-b-xl z-20" style={{ background: '#1a1a1a' }}>
                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[30px] h-[3px] rounded-full" style={{ background: '#333' }} />
                  </div>
                  <div className="absolute inset-0 rounded-[24px] overflow-hidden">
                    <iframe src={t.url} className="absolute inset-0 w-[300%] h-[300%] origin-top-left"
                      style={{ transform: 'scale(0.3333)', border: 'none', pointerEvents: 'none' }}
                      title={t.name} loading="lazy" />
                  </div>
                  <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[75px] h-[3px] rounded-full z-20" style={{ background: '#444' }} />
                </div>
                <p className="font-sans text-xs text-center mt-3 font-semibold" style={{ color: '#555' }}>{t.name}</p>
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
