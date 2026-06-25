'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'How do digital wedding invitations work?', a: 'Choose a template, customize it with your details (names, dates, photos, events), and share the unique link via WhatsApp, SMS, or social media. Your guests open the link to see your beautiful animated invitation.' },
  { q: 'Can I customize the template after purchase?', a: 'Yes! After purchasing, you get access to our editor where you can change names, dates, photos, event details, colors, and more.' },
  { q: 'How do guests view the invitation?', a: 'Guests simply tap the link you share. The invitation opens in their phone browser — no app download needed. It works on every device.' },
  { q: 'Is there an RSVP feature?', a: 'Yes, every template includes a built-in RSVP section where guests can confirm their attendance via WhatsApp message directly from the invite.' },
  { q: 'Can I update the invite after sharing?', a: 'Absolutely. Any changes you make in the editor are instantly reflected on the live invite. Change venue details, add events, or update photos anytime.' },
  { q: 'How much does it cost?', a: 'Templates start at ₹1499 — a one-time payment. No hidden fees, no monthly subscriptions. One purchase gives you lifetime access to your invite.' },
  { q: 'Can I see a preview before buying?', a: 'Yes! Click "Preview" on any template to see the full animated invitation with sample data before making a purchase.' },
  { q: 'What if I need help?', a: 'Our support team is available via WhatsApp and email. We also offer a free customization service if you need help setting up your invite.' },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div className="border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-sans text-sm font-medium pr-4 transition-colors"
          style={{ color: open ? '#e8384f' : '#1a1a1a' }}>{q}</span>
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
          style={{ background: open ? 'rgba(232,56,79,0.15)' : 'rgba(232,56,79,0.05)' }}>
          <ChevronDown size={14} style={{ color: '#e8384f', transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.3s' }} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="font-sans text-sm pb-5 leading-relaxed" style={{ color: '#777' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6" style={{ background: '#f8f8f8' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Frequently Asked Questions</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Everything you need to know</p>
        </motion.div>
        <div>{FAQS.map((faq, i) => <FAQItem key={faq.q} {...faq} index={i} />)}</div>
      </div>
    </section>
  )
}
