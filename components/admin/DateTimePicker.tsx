'use client'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Clock, X } from 'lucide-react'

interface Props {
  label: string
  value: string
  onChange: (val: string) => void
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function pad(n: number) { return String(n).padStart(2, '0') }

function toLocal(iso: string): { y: number; m: number; d: number; h: number; min: number } | null {
  if (!iso) return null
  const dt = new Date(iso)
  return { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate(), h: dt.getHours(), min: dt.getMinutes() }
}

export default function DateTimePicker({ label, value, onChange }: Props) {
  const parsed = toLocal(value)
  const now = new Date()

  const [open, setOpen] = useState(false)
  const [viewY, setViewY] = useState(parsed?.y ?? now.getFullYear())
  const [viewM, setViewM] = useState(parsed?.m ?? now.getMonth())
  const [selY, setSelY] = useState(parsed?.y ?? now.getFullYear())
  const [selM, setSelM] = useState(parsed?.m ?? now.getMonth())
  const [selD, setSelD] = useState(parsed?.d ?? now.getDate())
  const [hour, setHour] = useState(parsed?.h ?? 0)
  const [minute, setMinute] = useState(parsed?.min ?? 0)
  const [tab, setTab] = useState<'cal' | 'time'>('cal')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOut)
    return () => document.removeEventListener('mousedown', onClickOut)
  }, [])

  function commit(y: number, m: number, d: number, h: number, min: number) {
    const dt = new Date(y, m, d, h, min)
    onChange(dt.toISOString())
  }

  function selectDay(d: number) {
    setSelY(viewY); setSelM(viewM); setSelD(d)
    commit(viewY, viewM, d, hour, minute)
    setTab('time')
  }

  function changeHour(h: number) {
    const v = Math.max(0, Math.min(23, h))
    setHour(v); commit(selY, selM, selD, v, minute)
  }

  function changeMinute(min: number) {
    const v = Math.max(0, Math.min(59, min))
    setMinute(v); commit(selY, selM, selD, hour, v)
  }

  function prevMonth() {
    if (viewM === 0) { setViewM(11); setViewY(viewY - 1) }
    else setViewM(viewM - 1)
  }
  function nextMonth() {
    if (viewM === 11) { setViewM(0); setViewY(viewY + 1) }
    else setViewM(viewM + 1)
  }

  const firstDay = new Date(viewY, viewM, 1).getDay()
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate()

  const displayLabel = value
    ? `${pad(selD)} ${MONTHS[selM]} ${selY}  ${pad(hour)}:${pad(minute)}`
    : 'Select date & time'

  return (
    <div className="relative flex flex-col gap-0.5" ref={ref}>
      <label className="font-sans text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg font-sans text-xs transition-colors"
        style={{ background: '#111', color: value ? '#fff' : '#555', border: `1px solid ${open ? '#e8384f' : '#333'}`, minWidth: 188 }}>
        <Calendar size={12} style={{ color: '#e8384f', flexShrink: 0 }} />
        <span className="flex-1 text-left">{displayLabel}</span>
        {value && (
          <span onClick={e => { e.stopPropagation(); onChange(''); }} className="hover:text-white transition-colors" style={{ color: '#555' }}>
            <X size={11} />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full mt-2 z-50 rounded-xl overflow-hidden shadow-2xl"
          style={{ background: '#111', border: '1px solid #2a2a2a', width: 280 }}>

          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid #222' }}>
            {(['cal', 'time'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 font-sans text-xs font-medium transition-colors"
                style={{ color: tab === t ? '#e8384f' : '#555', borderBottom: tab === t ? '2px solid #e8384f' : '2px solid transparent' }}>
                {t === 'cal' ? <><Calendar size={12} /> Date</> : <><Clock size={12} /> Time</>}
              </button>
            ))}
          </div>

          {tab === 'cal' && (
            <div className="p-3">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-3">
                <button onClick={prevMonth} className="p-1 rounded hover:bg-white/10 transition-colors">
                  <ChevronLeft size={14} style={{ color: '#888' }} />
                </button>
                <span className="font-sans text-xs font-semibold" style={{ color: '#ddd' }}>
                  {MONTHS[viewM]} {viewY}
                </span>
                <button onClick={nextMonth} className="p-1 rounded hover:bg-white/10 transition-colors">
                  <ChevronRight size={14} style={{ color: '#888' }} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                  <div key={d} className="text-center font-sans text-[10px] py-1" style={{ color: '#444' }}>{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const d = i + 1
                  const selected = d === selD && viewM === selM && viewY === selY
                  const isToday = d === now.getDate() && viewM === now.getMonth() && viewY === now.getFullYear()
                  return (
                    <button key={d} onClick={() => selectDay(d)}
                      className="aspect-square flex items-center justify-center rounded-lg font-sans text-xs transition-colors hover:bg-white/10"
                      style={{
                        background: selected ? '#e8384f' : 'transparent',
                        color: selected ? '#fff' : isToday ? '#e8384f' : '#bbb',
                        fontWeight: isToday ? 700 : 400,
                      }}>
                      {d}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'time' && (
            <div className="p-4 flex flex-col items-center gap-4">
              <p className="font-sans text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>
                {selD ? `${pad(selD)} ${MONTHS[selM]} ${selY}` : 'Pick date first'}
              </p>
              {/* Clock display */}
              <div className="font-display text-4xl tracking-widest" style={{ color: '#fff' }}>
                {pad(hour)}<span style={{ color: '#e8384f' }}>:</span>{pad(minute)}
              </div>
              {/* Sliders */}
              <div className="w-full space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[10px] uppercase w-6" style={{ color: '#555' }}>Hr</span>
                  <input type="range" min={0} max={23} value={hour} onChange={e => changeHour(Number(e.target.value))}
                    className="flex-1 accent-red-500" style={{ accentColor: '#e8384f' }} />
                  <input type="number" min={0} max={23} value={hour} onChange={e => changeHour(Number(e.target.value))}
                    className="w-10 px-1 py-0.5 rounded text-center font-sans text-xs"
                    style={{ background: '#222', color: '#fff', border: '1px solid #333' }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[10px] uppercase w-6" style={{ color: '#555' }}>Min</span>
                  <input type="range" min={0} max={59} value={minute} onChange={e => changeMinute(Number(e.target.value))}
                    className="flex-1" style={{ accentColor: '#e8384f' }} />
                  <input type="number" min={0} max={59} value={minute} onChange={e => changeMinute(Number(e.target.value))}
                    className="w-10 px-1 py-0.5 rounded text-center font-sans text-xs"
                    style={{ background: '#222', color: '#fff', border: '1px solid #333' }} />
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-full py-2 rounded-lg font-sans text-xs font-semibold transition-colors hover:opacity-90"
                style={{ background: '#e8384f', color: '#fff' }}>
                Done
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
