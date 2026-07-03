'use client'
import { useEffect, useState } from 'react'

const DURATION_MS = 36 * 60 * 60 * 1000 // 36 hours
const STORAGE_KEY = 'vp_sale_end'

function getEndTime(): number {
  if (typeof window === 'undefined') return Date.now() + DURATION_MS
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    const end = parseInt(stored, 10)
    if (end > Date.now()) return end
  }
  const end = Date.now() + DURATION_MS
  localStorage.setItem(STORAGE_KEY, String(end))
  return end
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ h: 36, m: 0, s: 0 })

  useEffect(() => {
    let endTime = getEndTime()

    const tick = () => {
      const diff = endTime - Date.now()
      if (diff <= 0) {
        // Reset
        endTime = Date.now() + DURATION_MS
        localStorage.setItem(STORAGE_KEY, String(endTime))
      }
      const total = Math.max(0, endTime - Date.now())
      const h = Math.floor(total / 3600000)
      const m = Math.floor((total % 3600000) / 60000)
      const s = Math.floor((total % 60000) / 1000)
      setTimeLeft({ h, m, s })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
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
