'use client'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import Button from '@/components/shared/Button'

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const template = getTemplate(id)

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

  return (
    <div className="min-h-screen relative" style={{ background: '#000' }}>
      <iframe
        src={`http://localhost:${template.port}`}
        className="w-full h-screen"
        style={{ border: 'none' }}
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
          <Button onClick={() => alert('Sign in to purchase — coming soon!')}>
            Buy ₹{template.price}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
