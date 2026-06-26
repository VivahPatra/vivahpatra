'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'
import { Template } from '@/lib/templates'
import { useUser } from '@/components/auth/AuthProvider'
import { usePayment } from '@/lib/usePayment'
import SignInModal from '@/components/auth/SignInModal'

export default function TemplateCard({ template: t }: { template: Template }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [pendingBuy, setPendingBuy] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const { user } = useUser()
  const { pay, loading: paying } = usePayment()
  const router = useRouter()

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Check if purchased — only when logged in
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`editor-${t.id}`)
      if (saved) setPurchased(true)
      else setPurchased(false)
    } else {
      setPurchased(false)
    }
  }, [t.id, user])

  useEffect(() => {
    if (user && pendingBuy) {
      setPendingBuy(false)
      handlePayment()
    }
  }, [user, pendingBuy])

  const handlePayment = async () => {
    if (!user) return
    const success = await pay(t, user.email || '', user.phone || '')
    if (success) {
      setPurchased(true)
      router.push(`/editor/${t.id}`)
    }
  }

  const handleBuy = () => {
    if (!user) {
      setPendingBuy(true)
      setAuthOpen(true)
      return
    }
    handlePayment()
  }

  return (
    <>
      <motion.div ref={cardRef} layout
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
        className="flex flex-col items-center">

        <div className="group relative w-full max-w-[260px] mx-auto">
          <a href={`/preview/${t.id}`} className="block md:pointer-events-none rounded-[32px] overflow-hidden border-[5px] border-gray-800 shadow-2xl relative"
            style={{ aspectRatio: '9/16', background: t.color }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl z-20" style={{ background: '#1a1a1a' }} />

            {visible && (
              <iframe
                src={t.url}
                className="absolute inset-0 w-[300%] h-[300%] origin-top-left"
                style={{ transform: 'scale(0.3333)', border: 'none', pointerEvents: 'none' }}
                title={t.name}
                onLoad={() => setIframeLoaded(true)}
              />
            )}

            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                {visible && <div className="w-6 h-6 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />}
                <p className="font-display text-white text-lg opacity-50" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  {t.name}
                </p>
              </div>
            )}

            {/* Desktop: hover overlay */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all duration-300 hidden md:flex flex-col items-center justify-center gap-3 z-10">
              <a href={`/preview/${t.id}`}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold bg-white pointer-events-auto"
                style={{ color: t.color }}>
                Preview
              </a>
              {purchased && (
                <a href={`/editor/${t.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white pointer-events-auto flex items-center gap-2"
                  style={{ background: t.color, transitionDelay: '0.05s' }}>
                  <PenLine size={14} /> Edit
                </a>
              )}
              <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleBuy() }} disabled={paying}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white pointer-events-auto disabled:opacity-50"
                style={{ background: purchased ? '#333' : t.color, transitionDelay: '0.1s' }}>
                {paying ? 'Processing...' : `Buy ₹${t.price}`}
              </button>
            </div>
          </a>
        </div>

        <div className="text-center mt-4 w-full max-w-[260px]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="font-display text-base">{t.name}</h3>
            <span className="font-sans text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{ background: `${t.color}15`, color: t.color }}>{t.category}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-sans text-xs line-through" style={{ color: 'var(--color-muted)' }}>₹{t.originalPrice}</span>
            <span className="font-display text-lg" style={{ color: 'var(--color-accent)' }}>₹{t.price}</span>
            <span className="font-sans text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#16a34a', color: '#fff' }}>60% OFF</span>
          </div>
          {/* Mobile: always-visible buttons */}
          <div className="flex items-center justify-center gap-2 md:hidden flex-wrap">
            <a href={`/preview/${t.id}`}
              className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ border: `1px solid ${t.color}`, color: t.color }}>
              Preview
            </a>
            {purchased && (
              <a href={`/editor/${t.id}`}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white flex items-center gap-1"
                style={{ background: t.color }}>
                <PenLine size={12} /> Edit
              </a>
            )}
            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleBuy() }} disabled={paying}
              className="px-4 py-2 rounded-full text-xs font-semibold text-white disabled:opacity-50"
              style={{ background: purchased ? '#333' : t.color }}>
                {paying ? '...' : `Buy ₹${t.price}`}
              </button>
          </div>
        </div>
      </motion.div>

      <SignInModal open={authOpen} onClose={() => { setAuthOpen(false); if (!user) setPendingBuy(false) }} />
    </>
  )
}
