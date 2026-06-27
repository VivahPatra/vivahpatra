'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/lib/templates'
import Button from '@/components/shared/Button'

const VIDEOS = ['invitation', 'template2', 'template3', 'template4', 'mandala', 'modern']

function CardMedia({ id, name }: { id: string; name: string }) {
  return VIDEOS.includes(id) ? (
    <video src={`/templates/${id}.mp4`} autoPlay loop muted playsInline preload="none"
      className="absolute inset-0 w-full h-full object-cover object-top" />
  ) : (
    <img src={`/templates/${id}.png`} alt={name}
      className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
  )
}

const GAP = 260

const SLOTS = [
  { offset: -3, rotate: -14, y: 50, scale: 1,    opacity: 0.3 },
  { offset: -2, rotate: -9,  y: 25, scale: 1,    opacity: 0.55 },
  { offset: -1, rotate: -4,  y: 6,  scale: 1,    opacity: 0.85 },
  { offset: 0,  rotate: 0,   y: 0,  scale: 0.75, opacity: 1 },
  { offset: 1,  rotate: 4,   y: 6,  scale: 1,    opacity: 0.85 },
  { offset: 2,  rotate: 9,   y: 25, scale: 1,    opacity: 0.55 },
  { offset: 3,  rotate: 14,  y: 50, scale: 1,    opacity: 0.3 },
]

export default function FeaturedTemplates() {
  const [center, setCenter] = useState(0)
  const total = TEMPLATES.length

  const goNext = useCallback(() => setCenter(c => (c + 1) % total), [total])

  useEffect(() => {
    const timer = setInterval(goNext, 3000)
    return () => clearInterval(timer)
  }, [goNext])

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #fff 0%, #f5f5f5 30%, #f5f5f5 70%, #fff 100%)' }} />

      <div className="relative z-10">
        <motion.div className="max-w-6xl mx-auto px-6 text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>Curated Collection</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Explore Our Templates</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Handpicked designs loved by couples across India</p>
        </motion.div>

        {/* Fan carousel */}
        <div className="relative flex items-end justify-center select-none" style={{ height: 540 }}>
          {SLOTS.map((slot) => {
            const idx = ((center + slot.offset) % total + total) % total
            const t = TEMPLATES[idx]
            return (
              <motion.div
                key={`${center}-${slot.offset}`}
                className="absolute"
                style={{
                  width: 200,
                  bottom: 40,
                  zIndex: 3 - Math.abs(slot.offset),
                  transformOrigin: 'bottom center',
                }}
                initial={false}
                animate={{
                  x: slot.offset * GAP,
                  rotate: slot.rotate,
                  y: slot.y,
                  scale: slot.scale,
                  opacity: slot.opacity,
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}>
                <div className="rounded-[16px] overflow-hidden shadow-xl relative"
                  style={{ aspectRatio: '9/16', background: t.color }}>
                  <CardMedia id={t.id} name={t.name} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {TEMPLATES.map((_, i) => (
            <button key={i} onClick={() => setCenter(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === center ? 20 : 6,
                height: 6,
                background: i === center ? '#e8384f' : '#ddd',
              }} />
          ))}
        </div>

        <div className="text-center mt-10 px-6">
          <Button href="/templates">View All Templates</Button>
        </div>
      </div>
    </section>
  )
}
