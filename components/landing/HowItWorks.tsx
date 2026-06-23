'use client'
import { motion } from 'framer-motion'
import { Palette, PenTool, Send } from 'lucide-react'

const STEPS = [
  { step: '01', title: 'Choose Template', desc: 'Browse our collection of beautifully crafted templates for every culture and style.', Icon: Palette },
  { step: '02', title: 'Customize', desc: 'Add your names, photos, events, and personal touches. Preview changes in real-time.', Icon: PenTool },
  { step: '03', title: 'Share', desc: 'Get your unique link. Share via WhatsApp, SMS, or social media instantly.', Icon: Send },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'rgba(200,146,42,0.04)', top: '20%', right: '-10%' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Simple Process</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">How It Works</h2>
          <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>Three simple steps to your perfect wedding invite</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-14 left-[18%] right-[18%] h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.3), transparent)' }} />

          {STEPS.map((item, i) => (
            <motion.div key={item.step} className="text-center relative px-6 py-8"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center relative"
                style={{ background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.15)' }}>
                <item.Icon size={22} style={{ color: 'var(--color-accent)' }} />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center font-sans text-[9px] font-bold"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}>{item.step}</span>
              </div>
              <h3 className="font-display text-lg mb-2">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
