'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEMPLATES } from '@/lib/templates'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const VIDEOS = ['invitation', 'template2', 'template3', 'template4', 'mandala', 'modern']

function PhoneFrame({ templateId, name, size, className = '' }: { templateId: string; name: string; size: 'sm' | 'lg'; className?: string }) {
  const w = size === 'lg' ? 'w-[220px] sm:w-[260px]' : 'w-[140px] sm:w-[170px]'
  const r = size === 'lg' ? 'rounded-[32px]' : 'rounded-[24px]'
  const border = size === 'lg' ? '5px solid #1a1a1a' : '4px solid #1a1a1a'
  const notchW = size === 'lg' ? 'w-[80px] h-[20px]' : 'w-[50px] h-[14px]'
  const barW = size === 'lg' ? 'w-[90px]' : 'w-[55px]'
  const isVideo = VIDEOS.includes(templateId)

  return (
    <div className={`${w} ${className}`}>
      <div className={`relative ${r} overflow-hidden shadow-2xl`}
        style={{ border, aspectRatio: '9/19.5', background: '#000' }}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${notchW} rounded-b-xl z-20`} style={{ background: '#1a1a1a' }}>
          <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[35%] h-[3px] rounded-full" style={{ background: '#333' }} />
        </div>
        <div className={`absolute inset-0 ${r} overflow-hidden`}>
          {isVideo ? (
            <video src={`/templates/${templateId}.mp4`} autoPlay loop muted playsInline preload="metadata"
              className="absolute inset-0 w-full h-full object-cover object-top" />
          ) : (
            <img src={`/templates/${templateId}.png`} alt={name}
              className="absolute inset-0 w-full h-full object-cover object-top" />
          )}
        </div>
        <div className={`absolute bottom-[3px] left-1/2 -translate-x-1/2 ${barW} h-[3px] rounded-full z-20`} style={{ background: '#444' }} />
      </div>
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const total = TEMPLATES.length

  const prev = (current - 1 + total) % total
  const next = (current + 1) % total

  const goNext = useCallback(() => setCurrent(c => (c + 1) % total), [total])
  const goPrev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])

  useEffect(() => {
    const timer = setInterval(goNext, 3500)
    return () => clearInterval(timer)
  }, [goNext])

  return (
    <section className="relative overflow-hidden" style={{ background: '#fff' }}>
      {/* Sale ticker bar */}
      <div className="w-full overflow-hidden py-2" style={{ background: '#e8384f' }}>
        <motion.div className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="font-sans text-xs font-bold tracking-wider text-white uppercase">
              🎉 WEDDING SEASON MEGA SALE — FLAT 60% OFF &nbsp;&nbsp; ✦ &nbsp;&nbsp; Limited Time Offer &nbsp;&nbsp; ✦ &nbsp;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>

            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: '#fff3f3', border: '1px solid #ffd0d5' }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
              <span className="font-sans text-xs font-semibold" style={{ color: '#e8384f' }}>Sale ends soon — 60% OFF all templates</span>
            </motion.div>

            <h1 className="font-display leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1a1a1a' }}>
              <motion.span className="block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                Beautiful Animated
              </motion.span>
              <motion.span className="block" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ color: '#e8384f' }}>
                Wedding Invitations
              </motion.span>
            </h1>

            <motion.p className="font-sans text-base mt-6 leading-relaxed max-w-md"
              style={{ color: '#666' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              9+ stunning templates for every Indian wedding. Customize in minutes. Share via WhatsApp.
            </motion.p>

            <motion.div className="flex items-center gap-3 mt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <span className="font-display text-3xl font-bold" style={{ color: '#e8384f' }}>₹1,499</span>
              <span className="font-sans text-lg line-through" style={{ color: '#bbb' }}>₹3,749</span>
              <span className="font-sans text-xs font-bold px-2 py-1 rounded" style={{ background: '#e8384f', color: '#fff' }}>60% OFF</span>
            </motion.div>

            <motion.div className="flex flex-wrap items-center gap-3 mt-8"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
              <a href="/templates" className="px-7 py-3 rounded-full font-sans text-sm font-semibold text-white transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{ background: '#e8384f' }}>
                Browse Templates →
              </a>
              <a href="/#how-it-works" className="px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all hover:bg-gray-100"
                style={{ border: '1px solid #ddd', color: '#555' }}>
                How It Works
              </a>
            </motion.div>

            <motion.div className="flex items-center gap-6 mt-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              {[['9+', 'Templates'], ['500+', 'Couples'], ['5', 'Cultures']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-xl font-bold" style={{ color: '#1a1a1a' }}>{num}</p>
                  <p className="font-sans text-[10px] tracking-wider uppercase" style={{ color: '#999' }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Phone Carousel — 3 phones, center featured */}
          <motion.div className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative flex items-center gap-3 sm:gap-5">
              {/* Left phone — smaller, faded */}
              <AnimatePresence mode="popLayout">
                <motion.div key={`left-${prev}`}
                  initial={{ opacity: 0, x: -40, scale: 0.85 }}
                  animate={{ opacity: 0.5, x: 0, scale: 0.95 }}
                  exit={{ opacity: 0, x: -40, scale: 0.85 }}
                  transition={{ duration: 0.5 }}
                  className="hidden sm:block">
                  <PhoneFrame templateId={TEMPLATES[prev].id} name={TEMPLATES[prev].name} size="sm" />
                </motion.div>
              </AnimatePresence>

              {/* Center phone — large, featured */}
              <div className="relative">
                <div className="absolute inset-0 blur-[60px] rounded-full -z-10"
                  style={{ background: 'rgba(232,56,79,0.1)', transform: 'scale(1.5)' }} />
                <AnimatePresence mode="popLayout">
                  <motion.div key={`center-${current}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5 }}>
                    <PhoneFrame templateId={TEMPLATES[current].id} name={TEMPLATES[current].name} size="lg" />
                  </motion.div>
                </AnimatePresence>
                {/* Template name badge */}
                <AnimatePresence mode="popLayout">
                  <motion.div key={`name-${current}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-sans text-[10px] tracking-wider font-semibold whitespace-nowrap"
                    style={{ background: '#fff', border: '1px solid #eee', color: '#e8384f', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                    {TEMPLATES[current].name}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right phone — smaller, faded */}
              <AnimatePresence mode="popLayout">
                <motion.div key={`right-${next}`}
                  initial={{ opacity: 0, x: 40, scale: 0.85 }}
                  animate={{ opacity: 0.5, x: 0, scale: 0.95 }}
                  exit={{ opacity: 0, x: 40, scale: 0.85 }}
                  transition={{ duration: 0.5 }}
                  className="hidden sm:block">
                  <PhoneFrame templateId={TEMPLATES[next].id} name={TEMPLATES[next].name} size="sm" />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              <button onClick={goPrev} className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-30 transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <ChevronLeft size={16} style={{ color: '#333' }} />
              </button>
              <button onClick={goNext} className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-30 transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <ChevronRight size={16} style={{ color: '#333' }} />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-10">
              {TEMPLATES.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background: i === current ? '#e8384f' : '#ddd',
                  }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
