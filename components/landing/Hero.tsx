'use client'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/lib/templates'

export default function Hero() {
  const featured = TEMPLATES[0]

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

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

          {/* Right: Mockup with live iframes */}
          <motion.div className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative float-anim" style={{ width: 'clamp(400px, 50vw, 640px)' }}>
              <div className="absolute inset-0 blur-[100px] rounded-full"
                style={{ background: 'rgba(232,56,79,0.06)', transform: 'scale(1.3)' }} />
              <img src="/mockup.png" alt="" className="relative w-full h-auto drop-shadow-2xl" />

              {/* Laptop iframe */}
              <iframe src={TEMPLATES[0].url} className="absolute pointer-events-none"
                style={{ top: '8%', left: '4.5%', width: '52%', height: '58%', border: 'none', borderRadius: '2px' }}
                title="Laptop preview" loading="lazy" />

              {/* Tablet iframe */}
              <iframe src={TEMPLATES[1].url} className="absolute pointer-events-none"
                style={{ top: '10%', left: '59%', width: '24%', height: '62%', border: 'none', borderRadius: '2px' }}
                title="Tablet preview" loading="lazy" />

              {/* Phone iframe */}
              <iframe src={TEMPLATES[2].url} className="absolute pointer-events-none"
                style={{ top: '18%', left: '84%', width: '12%', height: '55%', border: 'none', borderRadius: '2px' }}
                title="Phone preview" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
