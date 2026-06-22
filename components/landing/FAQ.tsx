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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-sans text-sm font-medium pr-4">{q}</span>
        <ChevronDown size={18} style={{ color: 'var(--color-muted)', transform: open ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="font-sans text-sm pb-5 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">Frequently Asked Questions</h2>
        <p className="font-sans text-sm text-center mb-12" style={{ color: 'var(--color-muted)' }}>Everything you need to know</p>
        <div>{FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}</div>
      </div>
    </section>
  )
}
