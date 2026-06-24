'use client'
import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Share2, ChevronLeft, ChevronRight, Plus, Trash2, MapPin } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { WeddingFormData, DEFAULT_FORM_DATA, SectionToggle, WeddingEvent, StoryItem, InfoCard } from '@/lib/editor-types'
import { getDefaultEvents } from '@/lib/template-defaults'
import { getEditorConfig } from '@/lib/editor-config'
import { useUser } from '@/components/auth/AuthProvider'
import { EditorInput, EditorTextArea, EditorImageUpload, EditorMultiImageUpload, SectionHeader } from '@/components/editor/EditorInput'

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading } = useUser()
  const template = getTemplate(id)
  const config = getEditorConfig(id)
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
        const p = JSON.parse(s)
        setData({ ...DEFAULT_FORM_DATA, events: getDefaultEvents(id), ...p, sections: { ...DEFAULT_FORM_DATA.sections, ...p.sections } })
      } catch { /* ignore */ }
    }
  }, [id])

  useEffect(() => { if (!loading && !user) router.replace('/templates') }, [user, loading, router])

  const sendToPreview = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'VIVAHPATRA_UPDATE', data }, '*')
    }
  }, [data])

  useEffect(() => { const t = setTimeout(sendToPreview, 200); return () => clearTimeout(t) }, [data, sendToPreview])
  useEffect(() => {
    const onMsg = (e: MessageEvent) => { if (e.data?.type === 'VIVAHPATRA_READY') sendToPreview() }
    window.addEventListener('message', onMsg); return () => window.removeEventListener('message', onMsg)
  }, [sendToPreview])
  const handleIframeLoad = useCallback(() => { setTimeout(sendToPreview, 800); setTimeout(sendToPreview, 2000) }, [sendToPreview])

  useEffect(() => { const t = setTimeout(() => localStorage.setItem(`editor-${id}`, JSON.stringify(data)), 1000); return () => clearTimeout(t) }, [data, id])

  if (!template) return <div className="min-h-screen flex items-center justify-center"><p>Template not found</p></div>
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>

  const save = () => { localStorage.setItem(`editor-${id}`, JSON.stringify(data)); setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const publish = async () => {
    save(); setPublishing(true)
    try {
      const res = await fetch('/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ templateId: id, data, userId: user?.id }) })
      const result = await res.json()
      if (res.ok && result.slug) setPublishedUrl(`${window.location.origin}/invite/${result.slug}`)
      else alert(result.error || 'Publishing failed')
    } catch { alert('Publishing failed. Try again.') }
    setPublishing(false)
  }

  const set = (key: keyof WeddingFormData, val: string) => setData(prev => ({ ...prev, [key]: val }))
  const toggle = (key: keyof SectionToggle) => setData(prev => ({ ...prev, sections: { ...prev.sections, [key]: !prev.sections[key] } }))

  const updateEvent = (i: number, key: keyof WeddingEvent, val: string) => setData(prev => {
    const events = [...prev.events]; events[i] = { ...events[i], [key]: val }; return { ...prev, events }
  })
  const addEvent = () => setData(prev => ({ ...prev, events: [...prev.events, { id: `ev-${Date.now()}`, name: '', emoji: '🎉', image: '', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' }] }))
  const removeEvent = (i: number) => setData(prev => ({ ...prev, events: prev.events.filter((_, j) => j !== i) }))

  const updateStory = (i: number, key: keyof StoryItem, val: string) => setData(prev => {
    const coupleStory = [...prev.coupleStory]; coupleStory[i] = { ...coupleStory[i], [key]: val }; return { ...prev, coupleStory }
  })
  const addStory = () => setData(prev => ({ ...prev, coupleStory: [...prev.coupleStory, { date: '', title: '', description: '', icon: '✨', image: '' }] }))
  const removeStory = (i: number) => setData(prev => ({ ...prev, coupleStory: prev.coupleStory.filter((_, j) => j !== i) }))

  const updateInfoCard = (i: number, key: keyof InfoCard, val: string) => setData(prev => {
    const infoCards = [...prev.infoCards]; infoCards[i] = { ...infoCards[i], [key]: val }; return { ...prev, infoCards }
  })
  const addInfoCard = () => setData(prev => ({ ...prev, infoCards: [...prev.infoCards, { icon: '📌', title: '', description: '' }] }))
  const removeInfoCard = (i: number) => setData(prev => ({ ...prev, infoCards: prev.infoCards.filter((_, j) => j !== i) }))

  const setGallery = (imgs: { src: string; alt: string }[]) => setData(prev => ({ ...prev, galleryImages: imgs.map(img => ({ ...img, span: 'normal' as const })) }))

  const tabs = ['Couple', 'Invitation', 'Events', 'Story', 'Gallery', 'Venue', 'RSVP', 'Info', 'Social']

  const renderTab = () => {
    switch (activeTab) {
      case 0: return (
        <>
          <SectionHeader label="Couple & Hero" visible={data.sections.hero} onToggle={() => toggle('hero')} />
          <div className="grid grid-cols-2 gap-2">
            <EditorInput label="Groom Name" value={data.groomName} onChange={v => set('groomName', v)} placeholder="Rahul" />
            <EditorInput label="Bride Name" value={data.brideName} onChange={v => set('brideName', v)} placeholder="Priya" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <EditorInput label="Groom's Parents" value={data.groomParents} onChange={v => set('groomParents', v)} placeholder="Mr. & Mrs. Sharma" />
            <EditorInput label="Bride's Parents" value={data.brideParents} onChange={v => set('brideParents', v)} placeholder="Mr. & Mrs. Gupta" />
          </div>
          {config.hasSubtitles && (
            <div className="grid grid-cols-2 gap-2">
              <EditorInput label="Groom Subtitle" value={data.groomSubtitle} onChange={v => set('groomSubtitle', v)} placeholder="Nair" />
              <EditorInput label="Bride Subtitle" value={data.brideSubtitle} onChange={v => set('brideSubtitle', v)} placeholder="Menon" />
            </div>
          )}
          <EditorInput label="Wedding Date" value={data.weddingDate} onChange={v => set('weddingDate', v)} type="date" />
          <p className="text-[9px] -mt-2 mb-3" style={{ color: '#7a7068' }}>Used in hero, invitation, countdown & footer</p>
          <EditorInput label="Hashtag" value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#RahulWedsPrivya" />
          {config.hasTagline && <EditorInput label="Tagline" value={data.tagline} onChange={v => set('tagline', v)} placeholder="Two souls, one love story" />}
          <EditorInput label="Hero Subtitle" value={data.heroSubtitle} onChange={v => set('heroSubtitle', v)} placeholder="✦ Together Forever ✦" />
        </>
      )
      case 1: return (
        <>
          <SectionHeader label="Invitation" visible={data.sections.invitation} onToggle={() => toggle('invitation')} />
          <EditorInput label="Heading" value={data.invitationHeading} onChange={v => set('invitationHeading', v)} placeholder="You Are Invited" />
          <EditorInput label="Subtitle" value={data.invitationSubtitle} onChange={v => set('invitationSubtitle', v)} placeholder="Shubh Vivah" />
          <EditorInput label="Blessing" value={data.invitationBlessing} onChange={v => set('invitationBlessing', v)} placeholder="॥ Shree Ganeshaya Namah ॥" />
          <EditorTextArea label="Invitation Text" value={data.invitationText} onChange={v => set('invitationText', v)} placeholder="Together with our families..." />
        </>
      )
      case 2: return (
        <>
          <SectionHeader label="Events" visible={data.sections.events} onToggle={() => toggle('events')} />
          {data.events.map((ev, i) => (
            <div key={ev.id} className="p-3 rounded-xl mb-2" style={{ border: '1px solid rgba(200,146,42,0.1)', background: 'rgba(12,10,18,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {ev.image && <img src={ev.image} alt="" className="w-6 h-6 rounded object-cover" />}
                  <span className="text-xs font-semibold" style={{ color: '#c8922a' }}>{ev.name || `Event ${i+1}`}</span>
                </div>
                {data.events.length > 1 && <button onClick={() => removeEvent(i)}><Trash2 size={12} style={{ color: '#c00' }} /></button>}
              </div>
              <EditorInput label="Name" value={ev.name} onChange={v => updateEvent(i, 'name', v)} placeholder="Mehendi" />
              <div className="grid grid-cols-2 gap-2">
                <EditorInput label="Date" value={ev.date} onChange={v => updateEvent(i, 'date', v)} type="date" />
                <EditorInput label="Time" value={ev.time} onChange={v => updateEvent(i, 'time', v)} placeholder="6:00 PM" />
              </div>
              <EditorInput label="Venue" value={ev.venue} onChange={v => updateEvent(i, 'venue', v)} placeholder="The Grand Hotel" />
              <EditorInput label="Address" value={ev.venueAddress} onChange={v => updateEvent(i, 'venueAddress', v)} placeholder="MG Road" />
              <EditorInput label="Maps Link" value={ev.venueMapLink} onChange={v => updateEvent(i, 'venueMapLink', v)} placeholder="https://maps.google.com/..." />
              <EditorImageUpload label="Event Photo" value={ev.image} onChange={v => updateEvent(i, 'image', v)} />
            </div>
          ))}
          <button onClick={addEvent} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Event
          </button>
        </>
      )
      case 3: return (
        <>
          <SectionHeader label="Our Story" visible={data.sections.coupleStory} onToggle={() => toggle('coupleStory')} />
          {data.coupleStory.map((s, i) => (
            <div key={i} className="p-3 rounded-xl mb-2" style={{ border: '1px solid rgba(200,146,42,0.1)', background: 'rgba(12,10,18,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: '#c8922a' }}>Chapter {i+1}</span>
                {data.coupleStory.length > 1 && <button onClick={() => removeStory(i)}><Trash2 size={12} style={{ color: '#c00' }} /></button>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <EditorInput label="Title" value={s.title} onChange={v => updateStory(i, 'title', v)} placeholder="How We Met" />
                <EditorInput label="When" value={s.date} onChange={v => updateStory(i, 'date', v)} placeholder="March 2020" />
              </div>
              <EditorTextArea label="Description" value={s.description} onChange={v => updateStory(i, 'description', v)} placeholder="Tell your story..." />
              <EditorImageUpload label="Story Photo" value={s.image} onChange={v => updateStory(i, 'image', v)} />
            </div>
          ))}
          <button onClick={addStory} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Chapter
          </button>
        </>
      )
      case 4: return (
        <>
          <SectionHeader label="Photo Gallery" visible={data.sections.gallery} onToggle={() => toggle('gallery')} />
          <EditorMultiImageUpload label="Gallery Photos" images={data.galleryImages.map(g => ({ src: g.src, alt: g.alt }))} onChange={setGallery} />
        </>
      )
      case 5: return (
        <>
          <SectionHeader label="Venue & Location" visible={data.sections.venue} onToggle={() => toggle('venue')} />
          <EditorInput label="Venue Name" value={data.venueName} onChange={v => set('venueName', v)} placeholder="The Grand Palace" />
          <EditorInput label="Address" value={data.venueAddress} onChange={v => set('venueAddress', v)} placeholder="MG Road, New Delhi" />
          <div className="mb-3">
            <label className="text-[10px] font-semibold tracking-wider uppercase mb-1 flex items-center gap-1" style={{ color: '#7a7068' }}><MapPin size={10} /> Google Maps URL</label>
            <input type="url" value={data.venueMapUrl} onChange={e => set('venueMapUrl', e.target.value)} placeholder="https://maps.google.com/..." className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid rgba(200,146,42,0.15)', background: 'rgba(20,18,32,0.8)', color: '#f0ece4' }} />
          </div>
          <SectionHeader label="Countdown" visible={data.sections.countdown} onToggle={() => toggle('countdown')} />
          <p className="text-[10px]" style={{ color: '#7a7068' }}>Uses wedding date from Couple tab.</p>
        </>
      )
      case 6: return (
        <>
          <SectionHeader label="RSVP" visible={data.sections.rsvp} onToggle={() => toggle('rsvp')} />
          <EditorInput label="Heading" value={data.rsvpHeading} onChange={v => set('rsvpHeading', v)} placeholder="Will You Attend?" />
          <EditorTextArea label="RSVP Text" value={data.rsvpText} onChange={v => set('rsvpText', v)} placeholder="We would be honoured..." />
          <EditorInput label="RSVP Deadline" value={data.rsvpDeadline} onChange={v => set('rsvpDeadline', v)} type="date" />
          <EditorInput label="WhatsApp Number" value={data.rsvpPhone} onChange={v => set('rsvpPhone', v)} type="tel" placeholder="919876543210" />
          <EditorTextArea label="WhatsApp Message" value={data.rsvpMessage} onChange={v => set('rsvpMessage', v)} />
        </>
      )
      case 7: return (
        <>
          <SectionHeader label="Info Cards" visible={data.sections.info} onToggle={() => toggle('info')} />
          {data.infoCards.map((card, i) => (
            <div key={i} className="p-3 rounded-xl mb-2" style={{ border: '1px solid rgba(200,146,42,0.1)', background: 'rgba(12,10,18,0.5)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: '#c8922a' }}>{card.icon} {card.title || `Card ${i+1}`}</span>
                <button onClick={() => removeInfoCard(i)}><Trash2 size={12} style={{ color: '#c00' }} /></button>
              </div>
              <EditorInput label="Icon (emoji)" value={card.icon} onChange={v => updateInfoCard(i, 'icon', v)} placeholder="👗" />
              <EditorInput label="Title" value={card.title} onChange={v => updateInfoCard(i, 'title', v)} placeholder="Dress Code" />
              <EditorTextArea label="Description" value={card.description} onChange={v => updateInfoCard(i, 'description', v)} placeholder="Traditional attire preferred..." />
            </div>
          ))}
          <button onClick={addInfoCard} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Card
          </button>
        </>
      )
      case 8: return (
        <>
          <SectionHeader label="Music & Social" visible={data.sections.footer} onToggle={() => toggle('footer')} />
          <EditorInput label="Instagram URL" value={data.instagram} onChange={v => set('instagram', v)} placeholder="https://instagram.com/..." />
          <p className="text-[10px] mt-2" style={{ color: '#7a7068' }}>Background music upload coming soon.</p>
        </>
      )
      default: return null
    }
  }

  return (
    <div className="h-screen flex" style={{ background: '#0a0a0a' }}>
      <div className="flex-1 relative">
        <iframe ref={iframeRef} src={template.url} className="w-full h-full" style={{ border: 'none' }} title="Preview" onLoad={handleIframeLoad} />

        <div className="absolute top-4 left-4 z-50">
          <button onClick={() => router.back()} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs text-white/70 hover:text-white" style={{ background: 'rgba(12,10,18,0.9)', backdropFilter: 'blur(8px)' }}>
            <ArrowLeft size={14} /> Back
          </button>
        </div>
        <div className="absolute top-4 z-50 flex items-center gap-2" style={{ right: panelOpen ? '340px' : '16px', transition: 'right 0.3s' }}>
          <button onClick={save} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold" style={{ background: 'rgba(12,10,18,0.9)', backdropFilter: 'blur(8px)', color: saved ? '#16a34a' : '#c8922a' }}>
            <Save size={12} /> {saved ? 'Saved!' : 'Save'}
          </button>
          <button onClick={publish} disabled={publishing} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-white disabled:opacity-50" style={{ background: '#c8922a' }}>
            <Share2 size={12} /> {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>

        {publishedUrl && (
          <div className="absolute top-16 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs" style={{ background: 'rgba(22,163,74,0.9)', color: '#fff' }}>
            <span>Live: {publishedUrl.replace(window.location.origin, '')}</span>
            <button onClick={() => { navigator.clipboard.writeText(publishedUrl); alert('Copied!') }} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.2)' }}>Copy</button>
            <button onClick={() => window.open(publishedUrl, '_blank')} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(255,255,255,0.2)' }}>Open</button>
          </div>
        )}

        <button onClick={() => setPanelOpen(!panelOpen)} className="absolute top-1/2 -translate-y-1/2 z-50 w-6 h-12 rounded-l-lg flex items-center justify-center"
          style={{ right: panelOpen ? '320px' : '0', transition: 'right 0.3s', background: 'rgba(20,18,32,0.95)', border: '1px solid rgba(200,146,42,0.2)', borderRight: 'none' }}>
          {panelOpen ? <ChevronRight size={14} style={{ color: '#c8922a' }} /> : <ChevronLeft size={14} style={{ color: '#c8922a' }} />}
        </button>
      </div>

      <div className="h-full overflow-hidden transition-all duration-300 flex flex-col" style={{ width: panelOpen ? 320 : 0, background: 'rgba(14,12,20,0.98)', borderLeft: '1px solid rgba(200,146,42,0.15)' }}>
        {panelOpen && (
          <>
            <div className="flex overflow-x-auto gap-0 shrink-0" style={{ borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
              {tabs.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)}
                  className="px-2.5 py-3 text-[9px] font-semibold tracking-wider uppercase whitespace-nowrap"
                  style={{ color: activeTab === i ? '#c8922a' : '#7a7068', borderBottom: activeTab === i ? '2px solid #c8922a' : '2px solid transparent' }}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-sans">
              {renderTab()}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
