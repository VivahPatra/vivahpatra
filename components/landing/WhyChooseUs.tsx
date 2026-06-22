'use client'
import { motion } from 'framer-motion'
import { Smartphone, Share2, Mail, Palette, IndianRupee, Eye } from 'lucide-react'

const FEATURES = [
  { icon: Smartphone, title: 'Mobile-Friendly', desc: 'Looks stunning on every device — phones, tablets, and desktops.' },
  { icon: Share2, title: 'Instant Sharing', desc: 'Share via WhatsApp, SMS, email, or any social platform in one tap.' },
  { icon: Mail, title: 'Built-in RSVP', desc: 'Guests can confirm attendance directly from the invite.' },
  { icon: Palette, title: 'Fully Customizable', desc: 'Change names, dates, photos, colors, and events easily.' },
  { icon: IndianRupee, title: 'Affordable', desc: 'Starting at ₹1499 — a fraction of printed invitation costs.' },
  { icon: Eye, title: 'Elder-Friendly', desc: 'Readable fonts and intuitive design for guests of all ages.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">Why Choose Digital Invites?</h2>
        <p className="font-sans text-sm text-center mb-12" style={{ color: 'var(--color-muted)' }}>
          Save money, save trees, share instantly
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="p-6 rounded-2xl"
              style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
              <f.icon size={28} style={{ color: 'var(--color-accent)' }} className="mb-3" />
              <h3 className="font-display text-base mb-1">{f.title}</h3>
              <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
