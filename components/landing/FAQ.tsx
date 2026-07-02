'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'What is a digital wedding invitation?', a: 'A digital wedding invitation is an animated, interactive e-card shared via a link. Instead of printed cards, you send a WhatsApp link that opens a beautiful animated wedding invite in your guests\' phone browser — no app download needed.' },
  { q: 'How much does a digital wedding invitation cost in India?', a: 'Vivah Patra\'s animated digital wedding invitations start at ₹1499 — a one-time payment. This is 90% cheaper than printed invitation sets which cost ₹15,000–₹50,000. No hidden fees, no monthly subscriptions, lifetime access.' },
  { q: 'How do I share my digital wedding invitation on WhatsApp?', a: 'After customizing your invitation, you get a unique shareable link. Copy and paste it into WhatsApp, SMS, or any social platform. Guests tap the link and your animated invitation opens instantly in their browser.' },
  { q: 'Can I customize the wedding invitation template?', a: 'Yes! Our live editor lets you change couple names, wedding date, venue, event timings, photos, and more. Every change reflects instantly in a real-time preview of your invitation.' },
  { q: 'Do you have South Indian, Punjabi, and Christian wedding invitation templates?', a: 'Yes. We have templates for South Indian (Kerala kasavu gold), Punjabi Sikh (Anand Karaj with Ik Onkar & Golden Temple), Christian beach wedding, and many more Hindu, Modern, and regional styles.' },
  { q: 'Can guests RSVP through the digital invitation?', a: 'Yes, every Vivah Patra invitation has a built-in RSVP section. Guests tap a button and confirm attendance via WhatsApp message directly from the invite.' },
  { q: 'Can I update my wedding invitation after sharing it?', a: 'Yes. Any changes in the editor reflect live on the shared link instantly. You can update venue details, add events, or change photos even after the invite has been sent.' },
  { q: 'What happens if I need help setting up my invitation?', a: 'Our support team is available via WhatsApp and email at support@vivahpatra.co. We also offer a free assisted setup service for couples who need help personalizing their invitation.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section id="faq" className="py-24 px-6" style={{ background: '#f8f8f8' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#e8384f' }}>FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">Frequently Asked Questions</h2>
          <p className="font-sans text-sm" style={{ color: '#777' }}>Everything you need to know about digital wedding invitations</p>
        </motion.div>
        <div>
          {FAQS.map((faq, i) => (
            <motion.div key={faq.q} className="border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group">
                <span className="font-sans text-sm font-medium pr-4 transition-colors"
                  style={{ color: open === i ? '#e8384f' : '#1a1a1a' }}>{faq.q}</span>
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                  style={{ background: open === i ? 'rgba(232,56,79,0.15)' : 'rgba(232,56,79,0.05)' }}>
                  <ChevronDown size={14} style={{ color: '#e8384f', transform: open === i ? 'rotate(180deg)' : '', transition: 'transform 0.3s' }} />
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="font-sans text-sm pb-5 leading-relaxed" style={{ color: '#777' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
