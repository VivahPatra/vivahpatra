'use client'
import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { useUser } from '@/components/auth/AuthProvider'
import { usePayment } from '@/lib/usePayment'
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

  useEffect(() => {
    if (user && pendingBuy) {
      setPendingBuy(false)
      handlePayment()
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
    const success = await pay(template, user.email || '', user.phone || '')
    if (success) {
      router.push(`/editor/${template.id}`)
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
      <div className="min-h-screen relative" style={{ background: '#000' }}>
        <iframe
          src={template.url}
          className="w-full"
          style={{ border: 'none', height: 'calc(100vh - 64px)' }}
          title={template.name}
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
            <Button onClick={handleBuy}>
              {paying ? 'Processing...' : `Buy ₹${template.price}`}
            </Button>
          </div>
        </motion.div>
      </div>

      <SignInModal open={authOpen} onClose={() => { setAuthOpen(false); if (!user) setPendingBuy(false) }} />
    </>
  )
}
