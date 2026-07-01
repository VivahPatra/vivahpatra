'use client'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, PenLine } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { useUser } from '@/components/auth/AuthProvider'
import { usePayment } from '@/lib/usePayment'
import { getCloudInstances } from '@/lib/cloud-save'
import { hasPurchased as checkPurchase, recordPurchase } from '@/lib/purchases'
import SignInModal from '@/components/auth/SignInModal'
import Button from '@/components/shared/Button'

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const template = getTemplate(id)
  const { user } = useUser()
  const { pay, loading: paying } = usePayment()
  const [authOpen, setAuthOpen] = useState(false)
  const [pendingBuy, setPendingBuy] = useState(false)
  const [purchased, setPurchased] = useState(false)
  const [latestInst, setLatestInst] = useState('')

  useEffect(() => {
    if (!user?.id || !template) return
    // Check localStorage first (instant)
    if (localStorage.getItem(`purchased-${template.id}`) === 'true') {
      setPurchased(true)
    }
    checkPurchase(user.id, template.id).then(bought => {
      setPurchased(bought || localStorage.getItem(`purchased-${template.id}`) === 'true')
      if (bought) {
        getCloudInstances(user.id, template.id).then(insts => {
          if (insts.length > 0) {
            setLatestInst(insts[insts.length - 1].instanceId)
          } else {
            const local = JSON.parse(localStorage.getItem(`instances-${template.id}`) || '[]')
            if (local.length > 0) setLatestInst(local[local.length - 1].id)
          }
        })
      }
    })
  }, [user, template])

  useEffect(() => {
    if (user && pendingBuy && template) {
      setPendingBuy(false)
      checkPurchase(user.id, template.id).then(bought => {
        if (bought) {
          setPurchased(true)
          getCloudInstances(user.id, template.id).then(insts => {
            const inst = insts.length > 0 ? insts[insts.length - 1].instanceId : ''
            router.push(`/editor/${template.id}?inst=${inst}`)
          })
        } else {
          handlePayment()
        }
      })
    }
  }, [user, pendingBuy])

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl mb-4">Template not found</h1>
          <Button href="/templates">Browse Templates</Button>
        </div>
      </div>
    )
  }

  const handlePayment = async () => {
    if (!user) return
    const result = await pay(template, user.email || '', user.phone || '')
    if (result.success) {
      const instId = Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
      // Save locally first (instant)
      const instances = JSON.parse(localStorage.getItem(`instances-${template.id}`) || '[]')
      instances.push({ id: instId, createdAt: new Date().toISOString() })
      localStorage.setItem(`instances-${template.id}`, JSON.stringify(instances))
      localStorage.setItem(`purchased-${template.id}`, 'true')
      setPurchased(true)
      setLatestInst(instId)
      // Record in Supabase (async, don't block)
      recordPurchase(user.id, template.id, instId, result.orderId || '', result.paymentId || '', template.price)
      router.push(`/editor/${template.id}?inst=${instId}`)
    }
  }

  const handleBuy = () => {
    if (!user) {
      setPendingBuy(true)
      localStorage.setItem('pendingBuy', template.id)
      setAuthOpen(true)
      return
    }
    handlePayment()
  }

  return (
    <>
      <div className="min-h-screen relative" style={{ background: '#000' }}>
        <iframe
          src={template.url}
          className="w-full"
          style={{ border: 'none', height: 'calc(100vh - 64px)' }}
          title={template.name}
          onLoad={e => {
            const frame = e.currentTarget
            const send = () => frame.contentWindow?.postMessage({ type: 'VIVAHPATRA_PREVIEW_MODE' }, '*')
            send()
            setTimeout(send, 800)
            setTimeout(send, 2000)
          }}
        />

        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
          initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 1, duration: 0.4 }}>
          <button onClick={() => router.back()} className="flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-4">
            <span className="font-sans text-sm text-white/50 hidden sm:block">{template.name}</span>
            {purchased ? (
              <a href={`/editor/${template.id}?inst=${latestInst}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-sans text-sm font-semibold text-white"
                style={{ background: '#e8384f' }}>
                <PenLine size={14} /> Edit Template
              </a>
            ) : (
              <button onClick={handleBuy}
                className="px-6 py-3 rounded-full font-sans text-sm font-semibold text-white disabled:opacity-50"
                style={{ background: '#e8384f' }}
                disabled={paying}>
                {paying ? 'Processing...' : `Buy ₹${template.price}`}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <SignInModal open={authOpen} onClose={() => { setAuthOpen(false); if (!user) setPendingBuy(false) }} />
    </>
  )
}
