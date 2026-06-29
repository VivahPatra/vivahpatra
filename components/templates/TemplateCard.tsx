'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'
import { Template } from '@/lib/templates'
import { useUser } from '@/components/auth/AuthProvider'
import { usePayment } from '@/lib/usePayment'
import { getCloudInstances } from '@/lib/cloud-save'
import { hasPurchased as checkPurchase, recordPurchase } from '@/lib/purchases'
import SignInModal from '@/components/auth/SignInModal'

export default function TemplateCard({ template: t }: { template: Template }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [pendingBuy, setPendingBuy] = useState(() => {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('pendingBuy')
      if (pending === t.id) return true
    }
    return false
  })
  const [purchased, setPurchased] = useState(false)
  const [latestInst, setLatestInst] = useState('')
  const { user } = useUser()
  const { pay, loading: paying } = usePayment()
  const router = useRouter()

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { rootMargin: '100px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (user?.id) {
      // Check purchases table first (source of truth)
      checkPurchase(user.id, t.id).then(bought => {
        if (bought) {
          setPurchased(true)
          // Get latest instance
          getCloudInstances(user.id, t.id).then(insts => {
            if (insts.length > 0) setLatestInst(insts[insts.length - 1].instanceId)
            else {
              const local = JSON.parse(localStorage.getItem(`instances-${t.id}`) || '[]')
              if (local.length > 0) setLatestInst(local[local.length - 1].id)
            }
          })
        } else {
          setPurchased(false)
        }
      })
    } else {
      setPurchased(false)
    }
  }, [t.id, user])

  useEffect(() => {
    if (user && pendingBuy) {
      setPendingBuy(false)
      localStorage.removeItem('pendingBuy')
      // Check if already purchased — skip payment, go to editor
      checkPurchase(user.id, t.id).then(bought => {
        if (bought) {
          getCloudInstances(user.id, t.id).then(insts => {
            const inst = insts.length > 0 ? insts[insts.length - 1].instanceId : ''
            router.push(`/editor/${t.id}?inst=${inst}`)
          })
        } else {
          handlePayment()
        }
      })
    }
  }, [user, pendingBuy])

  const handlePayment = async () => {
    if (!user) return
    const result = await pay(t, user.email || '', user.phone || '')
    if (result.success) {
      const instId = Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
      // Record purchase in Supabase
      await recordPurchase(user.id, t.id, instId, result.orderId || '', result.paymentId || '', t.price)
      // Also save locally for offline access
      const instances = JSON.parse(localStorage.getItem(`instances-${t.id}`) || '[]')
      instances.push({ id: instId, createdAt: new Date().toISOString() })
      localStorage.setItem(`instances-${t.id}`, JSON.stringify(instances))
      setPurchased(true)
      router.push(`/editor/${t.id}?inst=${instId}`)
    }
  }

  const handleBuy = () => {
    if (!user) {
      setPendingBuy(true)
      localStorage.setItem('pendingBuy', t.id)
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
          <a href={`/preview/${t.id}`} className="block xl:pointer-events-none rounded-[32px] overflow-hidden border-[5px] border-gray-800 shadow-2xl relative"
            style={{ aspectRatio: '9/16', background: t.color }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl z-20" style={{ background: '#1a1a1a' }} />
            {visible ? (
              <iframe src={t.url} className="absolute inset-0 w-[300%] h-[300%] origin-top-left"
                style={{ transform: 'scale(0.3333)', border: 'none', pointerEvents: 'none' }}
                title={t.name} loading="lazy" onLoad={() => setIframeLoaded(true)} />
            ) : t.id === 'modern' ? (
              <video src="/templates/modern.mp4" autoPlay loop muted playsInline preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-top" />
            ) : (
              <img src={`/templates/${t.id}.webp`} alt={t.name}
                className="absolute inset-0 w-full h-full object-cover object-top" />
            )}
            {visible && !iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
                <p className="font-display text-white text-lg opacity-50" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{t.name}</p>
              </div>
            )}
          </a>

          {/* Desktop hover overlay */}
          <div className="absolute inset-0 rounded-[32px] bg-transparent group-hover:bg-black/50 transition-all duration-300 hidden xl:flex flex-col items-center justify-center gap-3 z-10">
            <a href={`/preview/${t.id}`}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold bg-white"
              style={{ color: t.color }}>
              Preview
            </a>
            {purchased ? (
              <a href={`/editor/${t.id}?inst=${latestInst}`}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white flex items-center gap-2"
                style={{ background: t.color, transitionDelay: '0.05s' }}>
                <PenLine size={14} /> Edit Template
              </a>
            ) : (
              <button type="button" onClick={handleBuy} disabled={paying}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: t.color, transitionDelay: '0.05s' }}>
                {paying ? 'Processing...' : `Buy ₹${t.price}`}
              </button>
            )}
          </div>
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
          {/* Mobile buttons */}
          <div className="flex items-center justify-center gap-2 xl:hidden flex-wrap">
            <a href={`/preview/${t.id}`}
              className="px-4 py-2 rounded-full text-xs font-semibold"
              style={{ border: `1px solid ${t.color}`, color: t.color }}>
              Preview
            </a>
            {purchased ? (
              <a href={`/editor/${t.id}?inst=${latestInst}`}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white flex items-center gap-1"
                style={{ background: t.color }}>
                <PenLine size={12} /> Edit
              </a>
            ) : (
              <button type="button" onClick={handleBuy} disabled={paying}
                className="px-4 py-2 rounded-full text-xs font-semibold text-white disabled:opacity-50"
                style={{ background: t.color }}>
                {paying ? '...' : `Buy ₹${t.price}`}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <SignInModal open={authOpen} onClose={() => { setAuthOpen(false); if (!user) setPendingBuy(false) }} />
    </>
  )
}
