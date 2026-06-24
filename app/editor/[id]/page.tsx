'use client'
import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Share2, ChevronLeft, ChevronRight, Plus, Trash2, Eye, EyeOff, MapPin } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { WeddingFormData, DEFAULT_FORM_DATA, SectionToggle, WeddingEvent, StoryItem } from '@/lib/editor-types'
import { getDefaultEvents } from '@/lib/template-defaults'
import { useUser } from '@/components/auth/AuthProvider'

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading } = useUser()
  const template = getTemplate(id)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [data, setData] = useState<WeddingFormData>({ ...DEFAULT_FORM_DATA, events: getDefaultEvents(id) })
  const [saved, setSaved] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const s = localStorage.getItem(`editor-${id}`)
    if (s) {
      try {
        const parsed = JSON.parse(s)
        setData({ ...DEFAULT_FORM_DATA, events: getDefaultEvents(id), ...parsed, sections: { ...DEFAULT_FORM_DATA.sections, ...parsed.sections } })
      } catch { /* ignore */ }
    }
  }, [id])

  useEffect(() => { if (!loading && !user) router.replace('/templates') }, [user, loading, router])

  // Send data to template iframe
  const sendToPreview = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'VIVAHPATRA_UPDATE', data }, '*')
    }
  }, [data])

  useEffect(() => {
    const t = setTimeout(sendToPreview, 200)
    return () => clearTimeout(t)
  }, [data, sendToPreview])

  useEffect(() => {
    function onMsg(e: MessageEvent) { if (e.data?.type === 'VIVAHPATRA_READY') sendToPreview() }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [sendToPreview])

  const handleIframeLoad = useCallback(() => {
    setTimeout(sendToPreview, 800)
    setTimeout(sendToPreview, 2000)
  }, [sendToPreview])

  // Auto-save
  useEffect(() => {
    const t = setTimeout(() => localStorage.setItem(`editor-${id}`, JSON.stringify(data)), 1000)
    return () => clearTimeout(t)
  }, [data, id])

  if (!template) return <div className="min-h-screen flex items-center justify-center"><p>Template not found</p></div>
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>

  const save = () => { localStorage.setItem(`editor-${id}`, JSON.stringify(data)); setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const publish = async () => {
    save()
    setPublishing(true)
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: id, data, userId: user?.id }),
      })
      const result = await res.json()
      if (res.ok && result.slug) {
        const url = `${window.location.origin}/invite/${result.slug}`
        setPublishedUrl(url)
      } else {
        alert(result.error || 'Publishing failed')
      }
    } catch {
      alert('Publishing failed. Try again.')
    }
    setPublishing(false)
  }

  const copyUrl = () => {
    if (publishedUrl) {
      navigator.clipboard.writeText(publishedUrl)
      alert('Link copied to clipboard!')
    }
  }

  const set = (key: keyof WeddingFormData, val: string) => setData(prev => ({ ...prev, [key]: val }))

  const toggleSection = (key: keyof SectionToggle) => setData(prev => ({ ...prev, sections: { ...prev.sections, [key]: !prev.sections[key] } }))

  const updateEvent = (i: number, key: keyof WeddingEvent, val: string) => {
    const events = [...data.events]; events[i] = { ...events[i], [key]: val }; setData(prev => ({ ...prev, events }))
  }
  const addEvent = () => setData(prev => ({ ...prev, events: [...prev.events, { id: `ev-${Date.now()}`, name: '', emoji: '🎉', image: '/assets/events/wedding.png', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' }] }))
  const removeEvent = (i: number) => setData(prev => ({ ...prev, events: prev.events.filter((_, j) => j !== i) }))

  const updateStory = (i: number, key: keyof StoryItem, val: string) => {
    const coupleStory = [...data.coupleStory]; coupleStory[i] = { ...coupleStory[i], [key]: val }; setData(prev => ({ ...prev, coupleStory }))
  }
  const addStory = () => setData(prev => ({ ...prev, coupleStory: [...prev.coupleStory, { date: '', title: '', description: '', icon: '✨', image: '' }] }))
  const removeStory = (i: number) => setData(prev => ({ ...prev, coupleStory: prev.coupleStory.filter((_, j) => j !== i) }))

  const inputCls = "w-full px-3 py-2 rounded-lg text-sm outline-none transition-all focus:ring-1 focus:ring-[#c8922a33]"
  const inputStyle = { border: '1px solid rgba(200,146,42,0.15)', background: 'rgba(20,18,32,0.8)', color: '#f0ece4' }
  const labelCls = "text-[10px] font-semibold tracking-wider uppercase mb-1 block"
  const labelStyle = { color: '#7a7068' }

  const Input = ({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
    <div className="mb-3">
      <label className={labelCls} style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} style={inputStyle} />
    </div>
  )

  const TextArea = ({ label, value, onChange, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
    <div className="mb-3">
      <label className={labelCls} style={labelStyle}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${inputCls} min-h-[70px] resize-y`} style={inputStyle} />
    </div>
  )

  const SectionHeader = ({ label, sectionKey }: { label: string; sectionKey: keyof SectionToggle }) => (
    <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
      <h3 className="text-sm font-semibold" style={{ color: '#f0ece4' }}>{label}</h3>
      <button onClick={() => toggleSection(sectionKey)} title={data.sections[sectionKey] ? 'Hide section' : 'Show section'}>
        {data.sections[sectionKey] ? <Eye size={14} style={{ color: '#c8922a' }} /> : <EyeOff size={14} style={{ color: '#7a7068' }} />}
      </button>
    </div>
  )

  const tabs = [
    { label: 'Couple', key: 'invitation' as keyof SectionToggle },
    { label: 'Events', key: 'events' as keyof SectionToggle },
    { label: 'Story', key: 'coupleStory' as keyof SectionToggle },
    { label: 'Gallery', key: 'gallery' as keyof SectionToggle },
    { label: 'Venue', key: 'venue' as keyof SectionToggle },
    { label: 'RSVP', key: 'rsvp' as keyof SectionToggle },
    { label: 'Music', key: 'footer' as keyof SectionToggle },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return (
        <>
          <SectionHeader label="Couple Details" sectionKey="invitation" />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Groom" value={data.groomName} onChange={v => set('groomName', v)} placeholder="Rahul" />
            <Input label="Bride" value={data.brideName} onChange={v => set('brideName', v)} placeholder="Priya" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input label="Groom's Parents" value={data.groomParents} onChange={v => set('groomParents', v)} placeholder="Mr. & Mrs. Sharma" />
            <Input label="Bride's Parents" value={data.brideParents} onChange={v => set('brideParents', v)} placeholder="Mr. & Mrs. Gupta" />
          </div>
          <Input label="Wedding Date" value={data.weddingDate} onChange={v => set('weddingDate', v)} type="date" />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Hashtag" value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#RahulWedsPrivya" />
            <Input label="Groom Subtitle" value={data.groomSubtitle} onChange={v => set('groomSubtitle', v)} placeholder="Sharma" />
          </div>
          <Input label="Tagline" value={data.tagline} onChange={v => set('tagline', v)} placeholder="Two souls, one love story" />
          <TextArea label="Invitation Text" value={data.invitationText} onChange={v => set('invitationText', v)} placeholder="Together with our families..." />
        </>
      )
      case 1: return (
        <>
          <SectionHeader label="Events" sectionKey="events" />
          {data.events.map((ev, i) => (
            <div key={ev.id} className="p-3 rounded-xl mb-2" style={{ border: '1px solid rgba(200,146,42,0.1)', background: 'rgba(12,10,18,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {ev.image && <img src={ev.image} alt="" className="w-6 h-6 rounded object-cover" />}
                  <span className="text-xs font-semibold" style={{ color: '#c8922a' }}>{ev.name || `Event ${i+1}`}</span>
                </div>
                {data.events.length > 1 && <button onClick={() => removeEvent(i)}><Trash2 size={12} style={{ color: '#c00' }} /></button>}
              </div>
              <Input label="Name" value={ev.name} onChange={v => updateEvent(i, 'name', v)} placeholder="Mehendi" />
              <div className="grid grid-cols-2 gap-2">
                <Input label="Date" value={ev.date} onChange={v => updateEvent(i, 'date', v)} type="date" />
                <Input label="Time" value={ev.time} onChange={v => updateEvent(i, 'time', v)} placeholder="6:00 PM" />
              </div>
              <Input label="Venue" value={ev.venue} onChange={v => updateEvent(i, 'venue', v)} placeholder="The Grand Hotel" />
              <Input label="Address" value={ev.venueAddress} onChange={v => updateEvent(i, 'venueAddress', v)} placeholder="MG Road, Delhi" />
              <div className="mb-3">
                <label className={labelCls} style={labelStyle}><MapPin size={10} className="inline mr-1" />Google Maps Link</label>
                <input type="url" value={ev.venueMapLink} onChange={e => updateEvent(i, 'venueMapLink', e.target.value)} placeholder="https://maps.google.com/..." className={inputCls} style={inputStyle} />
              </div>
            </div>
          ))}
          <button onClick={addEvent} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Event
          </button>
        </>
      )
      case 2: return (
        <>
          <SectionHeader label="Our Story" sectionKey="coupleStory" />
          {data.coupleStory.map((s, i) => (
            <div key={i} className="p-3 rounded-xl mb-2" style={{ border: '1px solid rgba(200,146,42,0.1)', background: 'rgba(12,10,18,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: '#c8922a' }}>Chapter {i+1}</span>
                {data.coupleStory.length > 1 && <button onClick={() => removeStory(i)}><Trash2 size={12} style={{ color: '#c00' }} /></button>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input label="Title" value={s.title} onChange={v => updateStory(i, 'title', v)} placeholder="How We Met" />
                <Input label="When" value={s.date} onChange={v => updateStory(i, 'date', v)} placeholder="March 2020" />
              </div>
              <TextArea label="Description" value={s.description} onChange={v => updateStory(i, 'description', v)} placeholder="Tell your story..." />
            </div>
          ))}
          <button onClick={addStory} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Chapter
          </button>
        </>
      )
      case 3: return (
        <>
          <SectionHeader label="Photo Gallery" sectionKey="gallery" />
          <p className="text-xs mb-3" style={{ color: '#7a7068' }}>Gallery photo upload coming soon. Photos will be uploaded to cloud storage.</p>
        </>
      )
      case 4: return (
        <>
          <SectionHeader label="Venue & Location" sectionKey="venue" />
          <Input label="Venue Name" value={data.venueName} onChange={v => set('venueName', v)} placeholder="The Grand Palace" />
          <Input label="Venue Address" value={data.venueAddress} onChange={v => set('venueAddress', v)} placeholder="MG Road, New Delhi" />
          <div className="mb-3">
            <label className={labelCls} style={labelStyle}><MapPin size={10} className="inline mr-1" />Google Maps URL</label>
            <input type="url" value={data.venueMapUrl} onChange={e => set('venueMapUrl', e.target.value)} placeholder="https://maps.google.com/..." className={inputCls} style={inputStyle} />
          </div>
          <SectionHeader label="Countdown" sectionKey="countdown" />
          <p className="text-xs" style={{ color: '#7a7068' }}>Uses wedding date from Couple Details.</p>
        </>
      )
      case 5: return (
        <>
          <SectionHeader label="RSVP" sectionKey="rsvp" />
          <Input label="WhatsApp Number" value={data.rsvpPhone} onChange={v => set('rsvpPhone', v)} type="tel" placeholder="919876543210" />
          <TextArea label="RSVP Message" value={data.rsvpMessage} onChange={v => set('rsvpMessage', v)} />
          <Input label="RSVP Deadline" value={data.rsvpDeadline} onChange={v => set('rsvpDeadline', v)} type="date" />
        </>
      )
      case 6: return (
        <>
          <SectionHeader label="Music & Social" sectionKey="footer" />
          <p className="text-xs mb-3" style={{ color: '#7a7068' }}>Background music upload coming soon.</p>
          <Input label="Instagram URL" value={data.instagram} onChange={v => set('instagram', v)} placeholder="https://instagram.com/..." />
        </>
      )
      default: return null
    }
  }

  return (
    <div className="h-screen flex" style={{ background: '#0a0a0a' }}>
      {/* Template preview */}
      <div className="flex-1 relative">
        <iframe ref={iframeRef} src={template.url} className="w-full h-full" style={{ border: 'none' }} title="Preview" onLoad={handleIframeLoad} />

        {/* Top toolbar */}
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
          <button onClick={() => router.back()} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs text-white/70 hover:text-white transition-colors" style={{ background: 'rgba(12,10,18,0.9)', backdropFilter: 'blur(8px)' }}>
            <ArrowLeft size={14} /> Back
          </button>
        </div>
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2" style={{ right: panelOpen ? '340px' : '16px', transition: 'right 0.3s' }}>
          <button onClick={save} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold" style={{ background: 'rgba(12,10,18,0.9)', backdropFilter: 'blur(8px)', color: saved ? '#16a34a' : '#c8922a' }}>
            <Save size={12} /> {saved ? 'Saved!' : 'Save'}
          </button>
          <button onClick={publish} disabled={publishing} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-white disabled:opacity-50" style={{ background: '#c8922a' }}>
            <Share2 size={12} /> {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>

        {/* Published URL banner */}
        {publishedUrl && (
          <div className="absolute top-16 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs" style={{ background: 'rgba(22,163,74,0.9)', backdropFilter: 'blur(8px)', color: '#fff' }}>
            <span>Live at: {publishedUrl.replace(window.location.origin, '')}</span>
            <button onClick={copyUrl} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.2)' }}>Copy</button>
            <button onClick={() => window.open(publishedUrl, '_blank')} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.2)' }}>Open</button>
          </div>
        )}

        {/* Panel toggle */}
        <button onClick={() => setPanelOpen(!panelOpen)} className="absolute top-1/2 -translate-y-1/2 z-50 w-6 h-12 rounded-l-lg flex items-center justify-center"
          style={{ right: panelOpen ? '320px' : '0', transition: 'right 0.3s', background: 'rgba(20,18,32,0.95)', border: '1px solid rgba(200,146,42,0.2)', borderRight: 'none' }}>
          {panelOpen ? <ChevronRight size={14} style={{ color: '#c8922a' }} /> : <ChevronLeft size={14} style={{ color: '#c8922a' }} />}
        </button>
      </div>

      {/* Edit panel */}
      <div className="h-full overflow-hidden transition-all duration-300 flex flex-col" style={{ width: panelOpen ? 320 : 0, background: 'rgba(14,12,20,0.98)', borderLeft: '1px solid rgba(200,146,42,0.15)' }}>
        {panelOpen && (
          <>
            {/* Tab bar */}
            <div className="flex overflow-x-auto gap-0 shrink-0" style={{ borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
              {tabs.map((tab, i) => (
                <button key={tab.label} onClick={() => setActiveTab(i)}
                  className="px-3 py-3 text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap transition-colors"
                  style={{ color: activeTab === i ? '#c8922a' : '#7a7068', borderBottom: activeTab === i ? '2px solid #c8922a' : '2px solid transparent' }}>
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 font-sans">
              {renderTabContent()}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
