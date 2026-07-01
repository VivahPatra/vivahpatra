'use client'
import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Share2, ChevronLeft, ChevronRight, Plus, Trash2, MapPin, Music, Play, Check, Eye, EyeOff } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { WeddingFormData, DEFAULT_FORM_DATA, SectionToggle, WeddingEvent, StoryItem, InfoCard } from '@/lib/editor-types'
import { getDefaultEvents, getDefaultInfoCards } from '@/lib/template-defaults'
import { getEditorConfig } from '@/lib/editor-config'
import { useUser } from '@/components/auth/AuthProvider'
import { saveToCloud, loadFromCloud, getCloudInstances, CloudInstance } from '@/lib/cloud-save'
import { publishInvite, checkPublished } from '@/lib/publish'
import { hasPurchased } from '@/lib/purchases'
import { EditorInput, EditorTextArea, EditorImageUpload, EditorMultiImageUpload, SectionHeader } from '@/components/editor/EditorInput'
import { MUSIC_LIBRARY } from '@/lib/music-library'

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading } = useUser()
  const template = getTemplate(id)
  const config = getEditorConfig(id)
  const [instId] = useState(() => typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('inst') || '' : '')
  const storageKey = instId ? `editor-${id}-${instId}` : `editor-${id}`
  const [instances, setInstances] = useState<{id: string; name: string}[]>([])

  useEffect(() => {
    if (!user?.id) return
    getCloudInstances(user.id, id).then(cloudInsts => {
      if (cloudInsts.length > 0) {
        setInstances(cloudInsts.map((ci, i) => ({
          id: ci.instanceId,
          name: ci.groomName && ci.brideName ? `${ci.groomName} & ${ci.brideName}` : `Invite ${i + 1}`,
        })))
      } else {
        // Fallback to localStorage instances
        const list = JSON.parse(localStorage.getItem(`instances-${id}`) || '[]')
        setInstances(list.filter((inst: {id: string}) => inst.id !== 'legacy').map((inst: {id: string}, i: number) => ({ id: inst.id, name: `Invite ${i + 1}` })))
      }
    })
  }, [id, user])
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [data, setData] = useState<WeddingFormData>({
    ...DEFAULT_FORM_DATA,
    events: getDefaultEvents(id),
    infoCards: getDefaultInfoCards(id),
    sections: { ...DEFAULT_FORM_DATA.sections, info: config.infoVisibleByDefault }
  })
  const [saved, setSaved] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [hasPublished, setHasPublished] = useState(false)
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [galleryTarget, setGalleryTarget] = useState(6)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    async function loadData() {
      const defaultInfoCards = getDefaultInfoCards(id)
      const defaultSections = { ...DEFAULT_FORM_DATA.sections, info: config.infoVisibleByDefault }

      function migrateEvents(savedEvents: WeddingEvent[] | undefined): WeddingEvent[] {
        const defaults = getDefaultEvents(id)
        if (!savedEvents || savedEvents.length === 0) return defaults
        const defaultById = new Map(defaults.map(d => [d.id, d]))

        const fixed = savedEvents.map(ev => {
          let next = ev
          // Fix stale "Cocktail Night" name on the old engagement-style event id
          if (next.id === 'cocktail' && next.name === 'Cocktail Night') {
            next = { ...next, name: 'Engagement' }
          }
          // Replace stale/old image paths (.png, blank, relative, or mismatched absolute URL) with current default
          const expectedImage = defaultById.get(next.id)?.image
          const isStale = !next.image || next.image.endsWith('.png') || next.image.startsWith('/assets/events/') || (expectedImage && next.image !== expectedImage && next.image.includes('/assets/events/'))
          if (isStale) {
            const fallback = defaultById.get(next.id)?.image
            if (fallback) next = { ...next, image: fallback }
          }
          return next
        })

        // Inject any new default events (e.g. cocktail-night) missing from old saved data
        const existingIds = new Set(fixed.map(e => e.id))
        const missing = defaults.filter(d => !existingIds.has(d.id))

        return [...fixed, ...missing]
      }

      function merge(saved: Partial<WeddingFormData>) {
        const cards = saved.infoCards?.length ? saved.infoCards : defaultInfoCards
        const secs = { ...defaultSections, ...(saved.sections || {}) }
        return { ...DEFAULT_FORM_DATA, ...saved, events: migrateEvents(saved.events), infoCards: cards, sections: secs } as WeddingFormData
      }

      // Try cloud first (with instanceId)
      if (user?.id && instId) {
        const cloud = await loadFromCloud(user.id, id, instId)
        if (cloud) { setData(merge(cloud)); return }
      }
      // Fallback to localStorage
      const s = localStorage.getItem(storageKey)
      if (s) {
        try { setData(merge(JSON.parse(s))) } catch { /* ignore */ }
      }
    }
    loadData()

    // Check if THIS instance has been published
    if (user?.id && instId) {
      checkPublished(id, instId, user.id).then(slug => {
        if (slug) { setHasPublished(true); setPublishedUrl(`${window.location.origin}/invite/${slug}`) }
      })
    }
  }, [id, user, storageKey, instId])

  const [accessDenied, setAccessDenied] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!loading && !user) { router.replace('/templates'); return }
    if (user?.id) {
      hasPurchased(user.id, id).then(bought => {
        if (!bought) setAccessDenied(true)
      })
    }
  }, [user, loading, router, id])

  useEffect(() => {
    if (!accessDenied) return
    if (countdown <= 0) { router.replace('/templates'); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [accessDenied, countdown, router])

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

  // Auto-save: localStorage immediately, cloud with longer debounce
  useEffect(() => {
    const t1 = setTimeout(() => localStorage.setItem(storageKey, JSON.stringify(data)), 500)
    const t2 = setTimeout(() => { if (user?.id && instId) saveToCloud(user.id, id, instId, data) }, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [data, id, user])

  if (!template) return <div className="min-h-screen flex items-center justify-center"><p>Template not found</p></div>

  if (accessDenied) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      <div className="text-center px-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'rgba(232,56,79,0.1)', border: '2px solid #e8384f' }}>
            <span className="text-3xl">🔒</span>
          </div>
        </motion.div>
        <motion.h1 className="font-display text-2xl mb-3 text-white"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Purchase Required
        </motion.h1>
        <motion.p className="font-sans text-sm mb-6" style={{ color: '#999' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          Please purchase this template to use the editor.
        </motion.p>
        <motion.p className="font-sans text-xs mb-8" style={{ color: '#666' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Redirecting to templates in <span className="font-bold text-white">{countdown}</span> seconds...
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="w-48 h-1 rounded-full mx-auto overflow-hidden" style={{ background: '#333' }}>
            <motion.div className="h-full rounded-full" style={{ background: '#e8384f' }}
              initial={{ width: '100%' }} animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }} />
          </div>
        </motion.div>
        <motion.a href="/templates" className="inline-block mt-6 px-6 py-2 rounded-full font-sans text-sm font-semibold text-white"
          style={{ background: '#e8384f' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Browse Templates
        </motion.a>
      </div>
    </div>
  )
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>

  const save = () => { localStorage.setItem(storageKey, JSON.stringify(data)); setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const resetToDefaults = () => {
    if (!confirm('Reset all fields to default? Groom & Bride names will be kept.')) return
    const fresh: WeddingFormData = {
      ...DEFAULT_FORM_DATA,
      groomName: data.groomName,
      brideName: data.brideName,
      events: getDefaultEvents(id),
      infoCards: getDefaultInfoCards(id),
      sections: { ...DEFAULT_FORM_DATA.sections, info: config.infoVisibleByDefault },
    }
    setData(fresh)
    localStorage.setItem(storageKey, JSON.stringify(fresh))
  }

  const publish = async () => {
    if (!user?.id) { alert('Please sign in to publish'); return }
    save(); setPublishing(true)
    const result = await publishInvite(id, instId || 'default', data, user.id)
    if ('slug' in result) {
      setPublishedUrl(`${window.location.origin}/invite/${result.slug}`)
      setHasPublished(true)
      localStorage.setItem(`published-${storageKey}`, result.slug)
    } else {
      alert(result.error || 'Publishing failed')
    }
    setPublishing(false)
  }

  const set = (key: keyof WeddingFormData, val: string) => setData(prev => ({ ...prev, [key]: val }))
  const toggle = (key: keyof SectionToggle) => setData(prev => ({ ...prev, sections: { ...prev.sections, [key]: !prev.sections[key] } }))

  const updateEvent = (i: number, key: keyof WeddingEvent, val: string | boolean) => setData(prev => {
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

  const allTabs = ['Couple', 'Invitation', 'Events', 'Story', 'Gallery', 'Venue', 'RSVP', ...(config.hasInfoCards ? ['Info'] : []), 'Music', 'Social']
  const tabs = allTabs

  const renderTab = () => {
    const currentTab = tabs[activeTab]
    switch (currentTab) {
      case 'Couple': return (
        <>
          <SectionHeader label="Couple & Hero" visible={data.sections.hero} onToggle={() => toggle('hero')} />
          <div className="grid grid-cols-2 gap-2">
            <EditorInput label="Groom Name" value={data.groomName} onChange={v => set('groomName', v)} placeholder="Rahul" disabled={hasPublished} />
            <EditorInput label="Bride Name" value={data.brideName} onChange={v => set('brideName', v)} placeholder="Priya" disabled={hasPublished} />
          </div>
          {hasPublished && <p className="text-[11px] -mt-1 mb-2" style={{ color: '#c8922a' }}>Names locked after first publish (used in invite URL)</p>}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-semibold" style={{ color: '#9a8a7a' }}>Name order in template</span>
            <button onClick={() => setData(prev => ({ ...prev, groomFirst: !prev.groomFirst }))}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={{ background: 'rgba(200,146,42,0.1)', color: '#c8922a', border: '1px solid rgba(200,146,42,0.15)' }}>
              {data.groomFirst ? `${data.groomName || 'Groom'} & ${data.brideName || 'Bride'}` : `${data.brideName || 'Bride'} & ${data.groomName || 'Groom'}`}
              &nbsp; ↔
            </button>
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
          <p className="text-[11px] -mt-2 mb-3" style={{ color: '#7a7068' }}>Used in hero, invitation, countdown & footer</p>
          <EditorInput label="Hashtag" value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#RahulWedsPrivya" />
          {config.hasTagline && <EditorInput label="Tagline" value={data.tagline} onChange={v => set('tagline', v)} placeholder="Two souls, one love story" />}
          <EditorInput label="Hero Subtitle" value={data.heroSubtitle} onChange={v => set('heroSubtitle', v)} placeholder="✦ Together Forever ✦" />
          {config.hasCouplePhoto && (
            <>
              <EditorImageUpload label="Couple Photo (auto-caricature)" value={data.heroImage} onChange={v => set('heroImage', v)} userId={user?.id} folder="couple" />
              <p className="text-[11px] -mt-1 mb-3" style={{ color: '#7a7068' }}>Photo will be converted to caricature style in template</p>
            </>
          )}
        </>
      )
      case 'Invitation': return (
        <>
          <SectionHeader label="Invitation" visible={data.sections.invitation} onToggle={() => toggle('invitation')} />
          <EditorInput label="Heading" value={data.invitationHeading} onChange={v => set('invitationHeading', v)} placeholder="You Are Invited" />
          <EditorInput label="Subtitle" value={data.invitationSubtitle} onChange={v => set('invitationSubtitle', v)} placeholder="Shubh Vivah" />
          <EditorInput label="Blessing" value={data.invitationBlessing} onChange={v => set('invitationBlessing', v)} placeholder="॥ Shree Ganeshaya Namah ॥" />
          <EditorTextArea label="Invitation Text" value={data.invitationText} onChange={v => set('invitationText', v)} placeholder="Together with our families..." />
        </>
      )
      case 'Events': return (
        <>
          <SectionHeader label="Events" visible={data.sections.events} onToggle={() => toggle('events')} />
          {data.events.map((ev, i) => (
            <div key={ev.id} className="p-3 rounded-xl mb-2" style={{ border: '1px solid rgba(200,146,42,0.1)', background: 'rgba(12,10,18,0.5)', opacity: ev.hidden ? 0.5 : 1 }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {ev.image && <img src={ev.image} alt="" className="w-6 h-6 rounded object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />}
                  <span className="text-xs font-semibold" style={{ color: '#c8922a' }}>{ev.name || `Event ${i+1}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateEvent(i, 'hidden', !ev.hidden)} title={ev.hidden ? 'Hidden — click to show' : 'Visible — click to hide'} style={{ color: ev.hidden ? '#666' : '#c8922a' }}>
                    {ev.hidden ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                  {data.events.length > 1 && <button onClick={() => removeEvent(i)}><Trash2 size={12} style={{ color: '#c00' }} /></button>}
                </div>
              </div>
              <EditorInput label="Name" value={ev.name} onChange={v => updateEvent(i, 'name', v)} placeholder="Mehendi" />
              <div className="grid grid-cols-2 gap-2">
                <EditorInput label="Date" value={ev.date} onChange={v => updateEvent(i, 'date', v)} type="date" />
                <EditorInput label="Time" value={ev.time} onChange={v => updateEvent(i, 'time', v)} placeholder="6:00 PM" />
              </div>
              <EditorInput label="Venue" value={ev.venue} onChange={v => updateEvent(i, 'venue', v)} placeholder="The Grand Hotel" />
              <EditorInput label="Address" value={ev.venueAddress} onChange={v => updateEvent(i, 'venueAddress', v)} placeholder="MG Road" />
              <EditorInput label="Maps Link" value={ev.venueMapLink} onChange={v => updateEvent(i, 'venueMapLink', v)} placeholder="https://maps.google.com/..." />
              <EditorImageUpload label="Event Photo" value={ev.image} onChange={v => updateEvent(i, 'image', v)} userId={user?.id} folder="events" />
            </div>
          ))}
          <button onClick={addEvent} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Event
          </button>
        </>
      )
      case 'Story': return (
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
              <EditorImageUpload label="Story Photo" value={s.image} onChange={v => updateStory(i, 'image', v)} userId={user?.id} folder="stories" />
            </div>
          ))}
          <button onClick={addStory} className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold" style={{ border: '1px dashed rgba(200,146,42,0.3)', color: '#c8922a' }}>
            <Plus size={14} /> Add Chapter
          </button>
        </>
      )
      case 'Gallery': {
        const uploaded = data.galleryImages.length
        const target = galleryTarget
        const remaining = target - uploaded
        const layoutLabel = target <= 4 ? '2×2 Grid' : target <= 6 ? '2×3 Grid' : '2×4 Grid'
        return (
          <>
            <SectionHeader label="Photo Gallery" visible={data.sections.gallery} onToggle={() => toggle('gallery')} />
            <div className="mb-4">
              <label className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: '#9a8a7a' }}>Select Number of Photos</label>
              <div className="flex gap-2">
                {[4, 5, 6, 7, 8].map(n => (
                  <button key={n} onClick={() => {
                    setGalleryTarget(n)
                    if (n < uploaded) setGallery(data.galleryImages.slice(0, n).map(g => ({ src: g.src, alt: g.alt })))
                  }}
                    className="w-10 h-10 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: target === n ? '#c8922a' : 'rgba(200,146,42,0.08)',
                      color: target === n ? '#fff' : '#c8922a',
                      border: `1px solid ${target === n ? '#c8922a' : 'rgba(200,146,42,0.15)'}`,
                    }}>
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-[11px] mt-2" style={{ color: '#7a7068' }}>Layout: {layoutLabel}</p>
            </div>

            <EditorMultiImageUpload
              label={`Upload Photos (${uploaded}/${target})`}
              images={data.galleryImages.map(g => ({ src: g.src, alt: g.alt }))}
              onChange={imgs => { if (imgs.length <= target) setGallery(imgs) }}
              userId={user?.id} folder="gallery"
            />

            {remaining > 0 && uploaded > 0 && (
              <div className="mt-2 px-3 py-2 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(232,168,32,0.1)', color: '#c8922a', border: '1px solid rgba(200,146,42,0.15)' }}>
                {remaining} more photo{remaining > 1 ? 's' : ''} needed to complete your gallery
              </div>
            )}
            {uploaded >= target && uploaded > 0 && (
              <p className="text-xs mt-2 font-semibold" style={{ color: '#16a34a' }}>✓ Gallery complete — {target} photos uploaded</p>
            )}
          </>
        )
      }
      case 'Venue': return (
        <>
          <SectionHeader label="Venue & Location" visible={data.sections.venue} onToggle={() => toggle('venue')} />
          <EditorInput label="Venue Name" value={data.venueName} onChange={v => set('venueName', v)} placeholder="The Grand Palace" />
          <EditorInput label="Address" value={data.venueAddress} onChange={v => set('venueAddress', v)} placeholder="MG Road, New Delhi" />
          <div className="mb-3">
            <label className="text-xs font-semibold tracking-wider uppercase mb-1 flex items-center gap-1" style={{ color: '#7a7068' }}><MapPin size={10} /> Google Maps URL</label>
            <input type="url" value={data.venueMapUrl} onChange={e => set('venueMapUrl', e.target.value)} placeholder="https://maps.google.com/..." className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ border: '1px solid rgba(200,146,42,0.15)', background: 'rgba(20,18,32,0.8)', color: '#f0ece4' }} />
          </div>
          <SectionHeader label="Countdown" visible={data.sections.countdown} onToggle={() => toggle('countdown')} />
          <p className="text-xs" style={{ color: '#7a7068' }}>Uses wedding date from Couple tab.</p>
        </>
      )
      case 'RSVP': return (
        <>
          <SectionHeader label="RSVP" visible={data.sections.rsvp} onToggle={() => toggle('rsvp')} />
          <EditorInput label="Heading" value={data.rsvpHeading} onChange={v => set('rsvpHeading', v)} placeholder="Will You Attend?" />
          <EditorTextArea label="RSVP Text" value={data.rsvpText} onChange={v => set('rsvpText', v)} placeholder="We would be honoured..." />
          <EditorInput label="RSVP Deadline" value={data.rsvpDeadline} onChange={v => set('rsvpDeadline', v)} type="date" />
          <EditorInput label="WhatsApp Number" value={data.rsvpPhone} onChange={v => set('rsvpPhone', v)} type="tel" placeholder="919876543210" />
          <EditorTextArea label="WhatsApp Message" value={data.rsvpMessage} onChange={v => set('rsvpMessage', v)} />
        </>
      )
      case 'Info': return (
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
      case 'Music': return (
        <>
          <SectionHeader label="Background Music" visible={data.sections.music} onToggle={() => toggle('music')} />
          {data.backgroundMusic && (
            <div className="flex items-center gap-2 mb-2 p-2 rounded-lg" style={{ background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.15)' }}>
              <Music size={14} style={{ color: '#c8922a' }} />
              <span className="text-xs flex-1 truncate" style={{ color: '#f0ece4' }}>
                {MUSIC_LIBRARY.find(t => t.url === data.backgroundMusic)?.name || 'Custom track'}
              </span>
              <button onClick={() => set('backgroundMusic', '')} className="text-xs" style={{ color: '#c00' }}>Remove</button>
            </div>
          )}
          <EditorImageUpload label="Upload Custom MP3" value="" onChange={v => set('backgroundMusic', v)} userId={user?.id} folder="music" />

          <label className="text-xs font-semibold tracking-wider uppercase mb-2 mt-3 block" style={{ color: '#7a7068' }}>Music Library</label>
          <div className="flex flex-col gap-1.5">
            {MUSIC_LIBRARY.map(track => {
              const isSelected = data.backgroundMusic === track.url
              const isPlaying = playingTrack === track.id
              return (
                <div key={track.id} className="flex items-center gap-2 p-2 rounded-lg transition-all"
                  style={{ background: isSelected ? 'rgba(200,146,42,0.12)' : 'rgba(12,10,18,0.5)', border: `1px solid ${isSelected ? 'rgba(200,146,42,0.3)' : 'rgba(200,146,42,0.08)'}` }}>
                  <button onClick={() => {
                    if (isPlaying) { audioRef.current?.pause(); setPlayingTrack(null) }
                    else {
                      if (audioRef.current) audioRef.current.pause()
                      const a = new Audio(track.url); a.play().catch(() => {}); audioRef.current = a
                      a.onended = () => setPlayingTrack(null)
                      setPlayingTrack(track.id)
                    }
                  }} className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(200,146,42,0.15)' }}>
                    <Play size={10} style={{ color: '#c8922a' }} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold truncate" style={{ color: '#f0ece4' }}>{track.name}</p>
                    <p className="text-[11px]" style={{ color: '#7a7068' }}>{track.category} · {track.duration}</p>
                  </div>
                  <button onClick={() => { set('backgroundMusic', track.url); if (audioRef.current) { audioRef.current.pause(); setPlayingTrack(null) } }}
                    className="px-2 py-1 rounded-full text-[11px] font-semibold shrink-0"
                    style={{ background: isSelected ? '#c8922a' : 'rgba(200,146,42,0.1)', color: isSelected ? '#fff' : '#c8922a' }}>
                    {isSelected ? <Check size={10} /> : 'Use'}
                  </button>
                </div>
              )
            })}
          </div>
          <p className="text-[11px] mt-2" style={{ color: '#7a7068' }}>Music plays softly when guests open your invite.</p>
        </>
      )
      case 'Social': return (
        <>
          <SectionHeader label="Social & Footer" visible={data.sections.footer} onToggle={() => toggle('footer')} />
          <EditorInput label="Instagram URL" value={data.instagram} onChange={v => set('instagram', v)} placeholder="https://instagram.com/..." />
        </>
      )
      default: return null
    }
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row relative" style={{ background: '#0a0a0a' }}>
      {/* Template preview — full screen on mobile when panel closed */}
      <div className={`flex-1 relative ${panelOpen ? 'hidden lg:block' : ''}`}>
        <iframe ref={iframeRef} src={template.url} className="w-full h-full" style={{ border: 'none' }} title="Preview" onLoad={handleIframeLoad} />
      </div>

      {/* Mobile toolbar — fixed at top */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-3 py-2 safe-area-top"
        style={{ background: 'rgba(14,12,20,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
        <button onClick={() => router.back()} className="flex items-center gap-1 text-[13px] text-white/70">
          <ArrowLeft size={14} />
        </button>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setPanelOpen(!panelOpen)} className="px-3 py-1.5 rounded-full text-[13px] font-semibold"
            style={{ border: '1px solid rgba(200,146,42,0.3)', color: '#c8922a' }}>
            {panelOpen ? '👁 Preview' : '✏️ Edit'}
          </button>
          <button onClick={save} className="px-2.5 py-1.5 rounded-full text-[13px] font-semibold"
            style={{ border: '1px solid rgba(200,146,42,0.3)', color: saved ? '#16a34a' : '#c8922a' }}>
            {saved ? '✓' : '💾'}
          </button>
          <button onClick={publish} disabled={publishing} className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white disabled:opacity-50" style={{ background: '#c8922a' }}>
            {publishing ? '...' : 'Publish'}
          </button>
        </div>
      </div>
      {/* Spacer for fixed toolbar + published URL */}
      <div className="lg:hidden shrink-0" style={{ height: publishedUrl ? 80 : 44 }} />

      {/* Desktop toolbar — on template preview */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 z-50 pointer-events-auto">
          <button onClick={() => router.back()} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs text-white/70 hover:text-white" style={{ background: 'rgba(12,10,18,0.9)', backdropFilter: 'blur(8px)' }}>
            <ArrowLeft size={14} /> Back
          </button>
        </div>
        <div className="absolute top-4 z-50 flex items-center gap-2 pointer-events-auto" style={{ right: panelOpen ? '340px' : '16px', transition: 'right 0.3s' }}>
          <button onClick={save} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold" style={{ background: 'rgba(12,10,18,0.9)', backdropFilter: 'blur(8px)', color: saved ? '#16a34a' : '#c8922a' }}>
            <Save size={12} /> {saved ? 'Saved!' : 'Save'}
          </button>
          <button onClick={publish} disabled={publishing} className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-white disabled:opacity-50" style={{ background: '#c8922a' }}>
            <Share2 size={12} /> {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>

        {publishedUrl && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl text-xs shadow-2xl pointer-events-auto"
            style={{ background: 'rgba(22,163,74,0.95)', color: '#fff', backdropFilter: 'blur(12px)', maxWidth: '90vw' }}>
            <div className="flex-1 min-w-0">
              <p className="text-xs opacity-70 mb-0.5">Your invite is live!</p>
              <p className="font-semibold truncate">{publishedUrl.replace(window.location.origin, '')}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button onClick={() => { navigator.clipboard.writeText(publishedUrl); alert('Link copied!') }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.2)' }}>Copy</button>
              <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Check out our wedding invitation! ' + publishedUrl)}`, '_blank')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.2)' }}>WhatsApp</button>
              <button onClick={() => window.open(publishedUrl, '_blank')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.25)' }}>Open</button>
            </div>
          </div>
        )}

        <button onClick={() => setPanelOpen(!panelOpen)} className="absolute top-1/2 -translate-y-1/2 z-[70] w-8 h-14 rounded-l-lg flex items-center justify-center cursor-pointer pointer-events-auto"
          style={{ right: panelOpen ? '320px' : '0', transition: 'right 0.3s', background: 'rgba(20,18,32,0.95)', border: '1px solid rgba(200,146,42,0.2)', borderRight: 'none' }}>
          {panelOpen ? <ChevronRight size={14} style={{ color: '#c8922a' }} /> : <ChevronLeft size={14} style={{ color: '#c8922a' }} />}
        </button>
      </div>

      {/* Published URL banner — mobile, fixed below toolbar */}
      {publishedUrl && (
        <div className="lg:hidden fixed top-[44px] left-0 right-0 z-[59] flex items-center gap-2 px-4 py-2.5 text-sm"
          style={{ background: 'rgba(22,163,74,0.95)', color: '#fff' }}>
          <span className="flex-1 truncate font-medium">{publishedUrl.replace(window.location.origin, '')}</span>
          <button onClick={() => { navigator.clipboard.writeText(publishedUrl); alert('Copied!') }} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.25)' }}>Copy</button>
          <button onClick={() => window.open(publishedUrl, '_blank')} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.25)' }}>Open</button>
        </div>
      )}

      {/* Edit panel — full screen on mobile, 320px sidebar on desktop */}
      <div className={`${panelOpen ? 'flex' : 'hidden'} flex-col transition-all duration-300 lg:w-[320px] lg:min-w-[320px] ${panelOpen ? 'flex-1 lg:flex-none' : 'w-0'}`}
        style={{ background: 'rgba(14,12,20,0.98)', borderLeft: '1px solid rgba(200,146,42,0.15)' }}>
        {/* Instance switcher */}
        {instances.length > 1 && (
          <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ borderBottom: '1px solid rgba(200,146,42,0.1)', background: 'rgba(200,146,42,0.05)' }}>
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#7a7068' }}>Invite:</span>
            <select value={instId} onChange={e => { window.location.href = `/editor/${id}?inst=${e.target.value}` }}
              className="flex-1 text-xs rounded px-2 py-1 outline-none" style={{ background: 'rgba(20,18,32,0.8)', color: '#f0ece4', border: '1px solid rgba(200,146,42,0.15)' }}>
              {instances.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-wrap gap-0 shrink-0 px-1 pt-1" style={{ borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className="px-3 py-2.5 text-[11px] font-semibold tracking-wider uppercase"
              style={{ color: activeTab === i ? '#c8922a' : '#7a7068', background: activeTab === i ? 'rgba(200,146,42,0.1)' : 'transparent', borderRadius: '6px 6px 0 0' }}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-4 font-sans">
          {renderTab()}
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(200,146,42,0.1)' }}>
            <button onClick={resetToDefaults} className="w-full py-2 rounded-lg text-xs font-semibold transition-all hover:bg-red-500/10"
              style={{ border: '1px solid rgba(200,50,50,0.2)', color: '#c33' }}>
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
