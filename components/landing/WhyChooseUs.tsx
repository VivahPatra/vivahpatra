'use client'
import { motion } from 'framer-motion'
import { Smartphone, Share2, Mail, Palette, IndianRupee, Eye } from 'lucide-react'

const FEATURES = [
  { icon: Smartphone, title: 'Mobile-Friendly', desc: 'Looks stunning on every device — phones, tablets, and desktops.' },
  { icon: Share2, title: 'Instant Sharing', desc: 'Share via WhatsApp, SMS, email, or any social platform in one tap.' },
  { icon: Mail, title: 'Built-in RSVP', desc: 'Guests confirm attendance directly from the invite via WhatsApp.' },
  { icon: Palette, title: 'Fully Customizable', desc: 'Change names, dates, photos, colors, and events easily.' },
  { icon: IndianRupee, title: 'Affordable', desc: 'Starting at ₹1499 — a fraction of printed invitation costs.' },
  { icon: Eye, title: 'Elder-Friendly', desc: 'Readable fonts and intuitive design for guests of all ages.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 relative" style={{ background: '#f8f8f8' }}>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>Benefits</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Why Choose Digital Invites?</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Save money, save trees, share instantly</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="group p-6 rounded-2xl transition-all duration-300"
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: '#fff' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: 'rgba(232,56,79,0.4)' }}>
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: 'rgba(232,56,79,0.08)' }}>
                <f.icon size={22} style={{ color: '#e8384f' }} />
              </div>
              <h3 className="font-display text-base mb-2">{f.title}</h3>
              <p className="font-sans text-xs leading-relaxed" style={{ color: '#777' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
