'use client'
import { useEffect, useState } from 'react'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function SaleBanner() {
  // Start with 36h so banner renders immediately — server time syncs silently
  const [timeLeft, setTimeLeft] = useState({ h: 36, m: 0, s: 0 })

  useEffect(() => {
    // Start countdown immediately from 36h, then silently sync with server
    let endTime = Date.now() + 36 * 60 * 60 * 1000
    let intervalId: ReturnType<typeof setInterval>

    function tick() {
      const total = Math.max(0, endTime - Date.now())
      if (total === 0) {
        endTime = Date.now() + 36 * 60 * 60 * 1000
      }
      setTimeLeft({
        h: Math.floor(total / 3600000),
        m: Math.floor((total % 3600000) / 60000),
        s: Math.floor((total % 60000) / 1000),
      })
    }

    // Start ticking immediately
    tick()
    intervalId = setInterval(tick, 1000)

    // Silently sync with server in background — updates endTime without blocking
    fetch('/api/sale-timer')
      .then(r => r.json())
      .then(({ endsAt }: { endsAt: number }) => { endTime = endsAt })
      .catch(() => {})

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full py-3 px-4" style={{ background: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#e8384f' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#e8384f' }} />
          </span>
          <span className="font-sans text-xs font-semibold tracking-wide text-white uppercase">
            Wedding Season Sale — Flat 60% OFF
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-sans text-[11px]" style={{ color: '#888' }}>Ends in</span>
          {[
            { val: pad(timeLeft.h), label: 'HRS' },
            { val: pad(timeLeft.m), label: 'MIN' },
            { val: pad(timeLeft.s), label: 'SEC' },
          ].map(({ val, label }, i) => (
            <span key={label} className="flex items-center gap-1">
              {i > 0 && <span className="font-mono font-bold text-sm" style={{ color: '#e8384f' }}>:</span>}
              <span className="flex flex-col items-center px-2 py-1 rounded-lg" style={{ background: '#2a2a2a', minWidth: 38 }}>
                <span className="font-mono font-bold text-sm leading-none text-white">{val}</span>
                <span className="font-sans text-[8px] tracking-widest mt-0.5" style={{ color: '#666' }}>{label}</span>
              </span>
            </span>
          ))}
        </div>

        <a href="/templates"
          className="font-sans text-xs font-bold px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
          style={{ background: '#e8384f', color: '#fff' }}>
          Grab Deal →
        </a>
      </div>
    </div>
  )
}
