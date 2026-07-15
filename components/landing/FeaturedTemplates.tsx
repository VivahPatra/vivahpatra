'use client'
import Image from 'next/image'
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
        <div className="relative select-none">
          <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #f8f8f8, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #f8f8f8, transparent)' }} />

          <div className="flex gap-6" style={{ width: 'max-content', animation: 'carouselScroll 45s linear infinite' }}>
            {doubled.map((t, i) => (
              <a key={`${t.id}-${i}`} href={`/preview/${t.id}`} className="flex-shrink-0 w-[200px] block group">
                <div className="rounded-[24px] overflow-hidden shadow-2xl relative transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ aspectRatio: '9/16', background: t.color, border: '2px solid rgba(255,255,255,0.06)' }}>
                  <Image src={`/templates/carousel/${t.id}.webp`} alt={t.name}
                    fill sizes="200px" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 active:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6">
                    <span className="opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: t.color }}>
                      Preview
                    </span>
                  </div>
                </div>
              </a>
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
