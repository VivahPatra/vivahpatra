'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { step: '01', title: 'Choose Template', desc: 'Browse our collection of beautifully crafted templates for every culture and style.', icon: '🎨' },
  { step: '02', title: 'Customize', desc: 'Add your names, photos, events, and personal touches. Preview in real-time.', icon: '✏️' },
  { step: '03', title: 'Share', desc: 'Get your unique link. Share via WhatsApp, SMS, or social media instantly.', icon: '🔗' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">How It Works</h2>
        <p className="font-sans text-sm text-center mb-12" style={{ color: 'var(--color-muted)' }}>
          Three simple steps to your perfect wedding invite
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((item, i) => (
            <motion.div key={item.step} className="text-center p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center font-sans text-xs font-bold"
                style={{ background: 'rgba(200,146,42,0.1)', color: 'var(--color-accent)' }}>{item.step}</div>
              <h3 className="font-display text-lg mb-2">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
