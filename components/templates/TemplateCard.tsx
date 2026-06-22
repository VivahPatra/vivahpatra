'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Template } from '@/lib/templates'
import { useUser } from '@/components/auth/AuthProvider'
import { usePayment } from '@/lib/usePayment'
import SignInModal from '@/components/auth/SignInModal'

export default function TemplateCard({ template: t }: { template: Template }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { user } = useUser()
  const router = useRouter()
  const { pay, loading: paying } = usePayment()

  const handleBuy = async () => {
    if (!user) {
      setAuthOpen(true)
      return
    }

    const success = await pay(t, user.email || '', user.phone || '')
    if (success) {
      router.push(`/editor/${t.id}`)
    }
  }

  return (
    <>
      <motion.div layout
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
        className="flex flex-col items-center">

        <div className="group relative w-full max-w-[260px] mx-auto">
          <div className="rounded-[32px] overflow-hidden border-[5px] border-gray-800 shadow-2xl relative"
            style={{ aspectRatio: '9/16', background: t.color }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl z-20" style={{ background: '#1a1a1a' }} />

            <iframe
              src={`http://localhost:${t.port}`}
              className="absolute inset-0 w-[300%] h-[300%] origin-top-left"
              style={{ transform: 'scale(0.3333)', border: 'none', pointerEvents: 'none' }}
              loading="lazy" title={t.name}
              onLoad={() => setIframeLoaded(true)}
            />

            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-white text-lg opacity-50" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  {t.name}
                </p>
              </div>
            )}

            <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-10">
              <a href={`/preview/${t.id}`}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold bg-white pointer-events-auto"
                style={{ color: t.color }}>
                Preview
              </a>
              <button onClick={handleBuy} disabled={paying}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-6 py-2.5 rounded-full text-sm font-semibold text-white pointer-events-auto disabled:opacity-50"
                style={{ background: t.color, transitionDelay: '0.05s' }}>
                {paying ? 'Processing...' : `Buy ₹${t.price}`}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 w-full max-w-[260px]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="font-display text-base">{t.name}</h3>
            <span className="font-sans text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{ background: `${t.color}15`, color: t.color }}>{t.category}</span>
          </div>
          <p className="font-display text-lg" style={{ color: 'var(--color-accent)' }}>₹{t.price}</p>
        </div>
      </motion.div>

      <SignInModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
