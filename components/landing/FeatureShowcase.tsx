'use client'
import { motion } from 'framer-motion'
import { Smartphone, Palette, Share2, Sparkles, Globe, Clock } from 'lucide-react'
import { TEMPLATES } from '@/lib/templates'

const SECTIONS = [
  {
    tag: 'Cultural Diversity',
    title: 'Templates for Every Culture',
    desc: 'From South Indian Muhurtham to Punjabi Anand Karaj, Christian Holy Matrimony to Modern minimalist — every tradition beautifully represented with culturally accurate rituals and designs.',
    features: [
      { Icon: Globe, text: 'Hindu, Sikh, Christian & Modern styles' },
      { Icon: Sparkles, text: 'Animated transitions & parallax effects' },
      { Icon: Smartphone, text: 'Mobile-first responsive design' },
    ],
    templateIndex: 0,
    reverse: false,
  },
  {
    tag: 'Real-Time Editor',
    title: 'Customize Everything Live',
    desc: 'Our split-screen editor shows changes instantly. Add couple details, event timings, venue maps, gallery photos, family info, and more — all with a live preview of your actual invitation.',
    features: [
      { Icon: Palette, text: 'Change names, dates, photos & events' },
      { Icon: Clock, text: 'Real-time preview as you type' },
      { Icon: Sparkles, text: 'Toggle sections on/off as needed' },
    ],
    templateIndex: 5,
    reverse: true,
  },
  {
    tag: 'Instant Sharing',
    title: 'Share via WhatsApp in One Tap',
    desc: 'Get a unique link for your invitation. Share via WhatsApp, SMS, email, or any social platform. Guests view it instantly in their browser — no app downloads needed. Works on every device.',
    features: [
      { Icon: Share2, text: 'WhatsApp, SMS, Email & Social media' },
      { Icon: Smartphone, text: 'No app needed — opens in browser' },
      { Icon: Globe, text: 'Update anytime, changes reflect live' },
    ],
    templateIndex: 6,
    reverse: false,
  },
]

export default function FeatureShowcase() {
  return (
    <section className="py-12 relative">
      <div className="max-w-6xl mx-auto px-6">
        {SECTIONS.map((section, idx) => {
          const template = TEMPLATES[section.templateIndex]
          return (
            <motion.div key={section.tag}
              className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 py-16 ${idx < SECTIONS.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>

              {/* Phone mockup */}
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 blur-[60px] rounded-full"
                  style={{ background: `${template.color}15`, transform: 'scale(1.4)' }} />
                <div className="relative w-[220px]">
                  <div className="rounded-[32px] overflow-hidden border-[4px] shadow-2xl"
                    style={{ borderColor: '#2a2a2a', aspectRatio: '9/16', background: template.color }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 rounded-b-lg z-20" style={{ background: '#1a1a1a' }} />
                    <iframe
                      src={template.url}
                      className="absolute inset-0 w-[300%] h-[300%] origin-top-left"
                      style={{ transform: 'scale(0.3333)', border: 'none', pointerEvents: 'none' }}
                      title={template.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 max-w-lg">
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase"
                  style={{ color: '#e8384f' }}>{section.tag}</span>
                <h3 className="font-display text-2xl md:text-3xl mt-3 mb-4">{section.title}</h3>
                <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: '#777' }}>
                  {section.desc}
                </p>
                <div className="flex flex-col gap-3">
                  {section.features.map(f => (
                    <div key={f.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(232,56,79,0.08)' }}>
                        <f.Icon size={14} style={{ color: '#e8384f' }} />
                      </div>
                      <span className="font-sans text-sm" style={{ color: '#777' }}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
