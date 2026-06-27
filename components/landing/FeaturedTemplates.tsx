'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const POSITIONS = [
  { x: -520, rotate: -18, scale: 0.7, z: 0, opacity: 0.4 },
  { x: -340, rotate: -12, scale: 0.78, z: 1, opacity: 0.6 },
  { x: -185, rotate: -6, scale: 0.88, z: 2, opacity: 0.85 },
  { x: 0, rotate: 0, scale: 1, z: 3, opacity: 1 },
  { x: 185, rotate: 6, scale: 0.88, z: 2, opacity: 0.85 },
  { x: 340, rotate: 12, scale: 0.78, z: 1, opacity: 0.6 },
  { x: 520, rotate: 18, scale: 0.7, z: 0, opacity: 0.4 },
]

export default function FeaturedTemplates() {
  const [center, setCenter] = useState(0)
  const total = TEMPLATES.length

  const goNext = useCallback(() => setCenter(c => (c + 1) % total), [total])

  useEffect(() => {
    const timer = setInterval(goNext, 3000)
    return () => clearInterval(timer)
  }, [goNext])

  const getVisible = () => {
    const items: { template: typeof TEMPLATES[0]; pos: typeof POSITIONS[0]; key: string }[] = []
    for (let i = -3; i <= 3; i++) {
      const idx = ((center + i) % total + total) % total
      items.push({
        template: TEMPLATES[idx],
        pos: POSITIONS[i + 3],
        key: `${idx}-${i}`,
      })
    }
    return items
  }

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #fff 0%, #f5f5f5 30%, #f5f5f5 70%, #fff 100%)' }} />

      <div className="relative z-10">
        <motion.div className="max-w-6xl mx-auto px-6 text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>Curated Collection</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Explore Our Templates</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Handpicked designs loved by couples across India</p>
        </motion.div>

        {/* Fan carousel */}
        <div className="relative flex items-center justify-center" style={{ height: 480, perspective: 1200 }}>
          <AnimatePresence mode="popLayout">
            {getVisible().map(({ template: t, pos, key }) => (
              <motion.div key={key}
                className="absolute"
                style={{ width: 230, zIndex: pos.z }}
                initial={{ x: pos.x, rotateY: pos.rotate, scale: pos.scale, opacity: 0 }}
                animate={{ x: pos.x, rotateY: pos.rotate, scale: pos.scale, opacity: pos.opacity }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}>
                <div className="rounded-[20px] overflow-hidden shadow-2xl relative"
                  style={{ aspectRatio: '9/16', background: t.color }}>
                  <CardMedia id={t.id} name={t.name} />
                </div>
                {pos.z === 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-sans text-sm font-semibold text-center mt-3"
                    style={{ color: '#555' }}>
                    {t.name}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="text-center mt-8 px-6">
          <Button href="/templates">View All Templates</Button>
        </div>
      </div>
    </section>
  )
}
