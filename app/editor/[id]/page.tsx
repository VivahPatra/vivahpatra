'use client'
import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Share2 } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { useUser } from '@/components/auth/AuthProvider'
import Button from '@/components/shared/Button'

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading } = useUser()
  const template = getTemplate(id)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [saved, setSaved] = useState(false)
  const dataRef = useRef<Record<string, unknown> | null>(null)

  // Load saved data
  useEffect(() => {
    const s = localStorage.getItem(`editor-${id}`)
    if (s) {
      try { dataRef.current = JSON.parse(s) } catch { /* ignore */ }
    }
  }, [id])

  useEffect(() => {
    if (!loading && !user) router.replace('/templates')
  }, [user, loading, router])

  // Listen for messages from template iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'VIVAHPATRA_READY') {
        // Template is ready — send any saved data
        if (dataRef.current && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage({ type: 'VIVAHPATRA_RESTORE', data: dataRef.current }, '*')
        }
      }
      if (event.data?.type === 'VIVAHPATRA_SAVE') {
        // Template sent updated data — auto-save
        dataRef.current = event.data.data
        localStorage.setItem(`editor-${id}`, JSON.stringify(event.data.data))
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [id])

  if (!template) return <div className="min-h-screen flex items-center justify-center"><Button href="/templates">Browse Templates</Button></div>

  const save = () => {
    if (dataRef.current) {
      localStorage.setItem(`editor-${id}`, JSON.stringify(dataRef.current))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const publish = () => {
    save()
    const groomName = (dataRef.current as Record<string, string>)?.groomName || 'groom'
    const brideName = (dataRef.current as Record<string, string>)?.brideName || 'bride'
    const slug = `${groomName.toLowerCase().replace(/\s/g, '')}-${brideName.toLowerCase().replace(/\s/g, '')}-${Date.now().toString(36)}`
    alert(`Your invite will be published at:\nvivahpatra.co/invite/${slug}\n\n(Publishing coming soon!)`)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen relative" style={{ background: '#000' }}>
      {/* Full-screen template iframe with edit mode */}
      <iframe
        ref={iframeRef}
        src={`${template.url}?edit=true`}
        className="w-full h-screen"
        style={{ border: 'none' }}
        title={`Edit ${template.name}`}
      />

      {/* Floating toolbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full shadow-2xl"
        style={{ background: 'rgba(12,10,18,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(200,146,42,0.2)' }}>
        <button onClick={() => router.back()} className="flex items-center gap-1.5 font-sans text-xs text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <span className="font-sans text-xs text-white/40">{template.name}</span>
        <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <button onClick={save}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-semibold transition-all"
          style={{ border: '1px solid rgba(200,146,42,0.3)', color: saved ? '#16a34a' : 'var(--color-accent)' }}>
          <Save size={12} /> {saved ? 'Saved!' : 'Save'}
        </button>
        <button onClick={publish}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-semibold text-white"
          style={{ background: 'var(--color-accent)' }}>
          <Share2 size={12} /> Publish
        </button>
      </div>

      {/* Edit mode hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full font-sans text-[11px]"
        style={{ background: 'rgba(12,10,18,0.85)', color: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}>
        Click on any text to edit directly
      </div>
    </div>
  )
}
