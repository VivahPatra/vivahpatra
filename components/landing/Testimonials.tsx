'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  { name: 'Priya & Rahul', location: 'Mumbai', quote: 'Our guests were amazed by the animated invitation. So much better than a printed card!' },
  { name: 'Simran & Arjun', location: 'Delhi', quote: 'The South Indian template perfectly captured our wedding vibe. Easy to customize and share.' },
  { name: 'Sarah & James', location: 'Goa', quote: 'We saved over ₹15,000 compared to printed cards and our invite looked incredible.' },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'rgba(232,56,79,0.05)', top: '30%', left: '50%', transform: 'translateX(-50%)' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">What Couples Say</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Real stories from real weddings</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name} className="p-6 rounded-2xl relative"
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: '#f8f8f8' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>
              <Quote size={20} style={{ color: '#e8384f', opacity: 0.3 }} className="mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} fill="#e8384f" stroke="#e8384f" />
                ))}
              </div>
              <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: '#1a1a1a' }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} className="pt-4">
                <p className="font-sans text-sm font-semibold">{r.name}</p>
                <p className="font-sans text-xs" style={{ color: '#777' }}>{r.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
