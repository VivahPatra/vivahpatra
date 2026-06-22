'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  { name: 'Priya & Rahul', location: 'Mumbai', quote: 'Our guests were amazed by the animated invitation. So much better than a printed card!' },
  { name: 'Simran & Arjun', location: 'Delhi', quote: 'The South Indian template perfectly captured our wedding vibe. Easy to customize and share.' },
  { name: 'Sarah & James', location: 'Goa', quote: 'We saved over ₹15,000 compared to printed cards and our invite looked incredible.' },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-12">What Couples Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name} className="p-6 rounded-2xl"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="var(--color-accent)" stroke="var(--color-accent)" />
                ))}
              </div>
              <p className="font-sans text-sm leading-relaxed mb-4">"{r.quote}"</p>
              <p className="font-sans text-sm font-semibold">{r.name}</p>
              <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>{r.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
