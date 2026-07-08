'use client'
import { useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface Props {
  templateUrl: string
  data: Record<string, unknown>
  slug: string
}

export default function InviteClient({ templateUrl, data, slug }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const router = useRouter()

  const sendData = useCallback(() => {
    if (!iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage({ type: 'VIVAHPATRA_UPDATE', data }, '*')
  }, [data])

  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (e.data?.type === 'VIVAHPATRA_READY') {
        sendData()
        setTimeout(sendData, 100)
        setTimeout(sendData, 300)
      }
      if (e.data?.type === 'VIVAHPATRA_RSVP') {
        const { guestName, guestCount } = e.data
        fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, guestName, guestCount }),
        }).catch(() => {})
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [sendData, slug])

  const handleLoad = useCallback(() => {
    sendData()
    setTimeout(sendData, 200)
    setTimeout(sendData, 500)
    setTimeout(sendData, 1000)
    setTimeout(sendData, 2000)
  }, [sendData])

  return (
    <div className="min-h-screen relative" style={{ background: '#000' }}>
      <button
        onClick={() => router.push('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium"
        style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Go to home"
      >
        <ArrowLeft size={13} /> Home
      </button>
      <iframe
        ref={iframeRef}
        src={templateUrl}
        className="w-full h-screen"
        style={{ border: 'none' }}
        title="Wedding Invitation"
        allow="autoplay"
        onLoad={handleLoad}
      />
    </div>
  )
}
