'use client'
import { useRef, useCallback, useEffect } from 'react'

interface Props {
  templateUrl: string
  data: Record<string, unknown>
  slug: string
}

export default function InviteClient({ templateUrl, data, slug }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const sendData = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'VIVAHPATRA_UPDATE', data }, '*')
    }
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
    <div className="min-h-screen" style={{ background: '#000' }}>
      <iframe
        ref={iframeRef}
        src={templateUrl}
        className="w-full h-screen"
        style={{ border: 'none' }}
        title="Wedding Invitation"
        onLoad={handleLoad}
      />
    </div>
  )
}
