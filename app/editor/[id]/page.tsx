'use client'
import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, Share2, ChevronDown, ChevronUp, Monitor, Smartphone } from 'lucide-react'
import { getTemplate } from '@/lib/templates'
import { WeddingFormData, DEFAULT_FORM_DATA, SectionToggle } from '@/lib/editor-types'
import { getDefaultEvents } from '@/lib/template-defaults'
import { useUser } from '@/components/auth/AuthProvider'
import CoupleSection from '@/components/editor/CoupleSection'
import EventsSection from '@/components/editor/EventsSection'
import StorySection from '@/components/editor/StorySection'
import GallerySection from '@/components/editor/GallerySection'
import FamilySection from '@/components/editor/FamilySection'
import VenueRSVPSection from '@/components/editor/VenueRSVPSection'
import MusicSection from '@/components/editor/MusicSection'
import Button from '@/components/shared/Button'

interface EditorSection {
  key: keyof SectionToggle
  label: string
  component: React.ReactNode
}

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user, loading } = useUser()
  const template = getTemplate(id)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [data, setData] = useState<WeddingFormData>({ ...DEFAULT_FORM_DATA, events: getDefaultEvents(id) })
  const [activeSection, setActiveSection] = useState(0)
  const [saved, setSaved] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [deviceView, setDeviceView] = useState<'phone' | 'desktop'>('phone')

  useEffect(() => {
    const s = localStorage.getItem(`editor-${id}`)
    if (s) {
      const saved = JSON.parse(s)
      setData({ ...DEFAULT_FORM_DATA, events: getDefaultEvents(id), ...saved, sections: { ...DEFAULT_FORM_DATA.sections, ...saved.sections } })
    }
  }, [id])

  useEffect(() => {
    if (!loading && !user) router.replace('/templates')
  }, [user, loading, router])

  const sendToPreview = useCallback((formData: WeddingFormData) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'VIVAHPATRA_UPDATE', data: formData }, '*')
    }
  }, [])

  useEffect(() => { sendToPreview(data) }, [data, sendToPreview])

  if (!template) return <div className="min-h-screen flex items-center justify-center"><Button href="/templates">Browse Templates</Button></div>

  const save = () => {
    localStorage.setItem(`editor-${id}`, JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const publish = () => {
    save()
    const slug = `${(data.groomName || 'groom').toLowerCase().replace(/\s/g, '')}-${(data.brideName || 'bride').toLowerCase().replace(/\s/g, '')}-${Date.now().toString(36)}`
    alert(`Your invite will be published at:\nvivahpatra.co/invite/${slug}\n\n(Publishing coming soon!)`)
  }

  const toggleSection = (key: keyof SectionToggle) => {
    setData({ ...data, sections: { ...data.sections, [key]: !data.sections[key] } })
  }

  const sections: EditorSection[] = [
    { key: 'invitation', label: 'Couple Details', component: <CoupleSection data={data} onChange={setData} /> },
    { key: 'events', label: 'Events', component: <EventsSection data={data} onChange={setData} /> },
    { key: 'coupleStory', label: 'Our Story', component: <StorySection data={data} onChange={setData} /> },
    { key: 'gallery', label: 'Photo Gallery', component: <GallerySection data={data} onChange={setData} /> },
    { key: 'family', label: 'Family Members', component: <FamilySection data={data} onChange={setData} /> },
    { key: 'venue', label: 'Venue & RSVP', component: <VenueRSVPSection data={data} onChange={setData} /> },
    { key: 'countdown', label: 'Countdown', component: <div className="p-2"><p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>Countdown uses the wedding date from Couple Details.</p></div> },
    { key: 'rsvp', label: 'RSVP', component: <div className="p-2"><p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>RSVP uses phone number from Venue & RSVP section.</p></div> },
    { key: 'footer', label: 'Music & Social', component: <MusicSection data={data} onChange={setData} /> },
  ]

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Toolbar */}
      <div className="sticky top-[65px] z-40 border-b px-4 py-3 flex items-center justify-between gap-2 flex-wrap"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ background: template.color }} />
          <span className="font-display text-sm hidden sm:block">{template.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 p-1 rounded-full" style={{ background: 'var(--color-bg)' }}>
            <button onClick={() => setDeviceView('phone')} className="p-1.5 rounded-full"
              style={{ background: deviceView === 'phone' ? 'var(--color-accent)' : 'transparent', color: deviceView === 'phone' ? '#fff' : 'var(--color-muted)' }}>
              <Smartphone size={14} />
            </button>
            <button onClick={() => setDeviceView('desktop')} className="p-1.5 rounded-full"
              style={{ background: deviceView === 'desktop' ? 'var(--color-accent)' : 'transparent', color: deviceView === 'desktop' ? '#fff' : 'var(--color-muted)' }}>
              <Monitor size={14} />
            </button>
          </div>
          <button onClick={() => setPreviewMode(!previewMode)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-full font-sans text-xs font-semibold"
            style={{ border: '1px solid var(--color-border)' }}>
            <Eye size={14} /> {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button onClick={save}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full font-sans text-xs font-semibold"
            style={{ border: '1px solid var(--color-border)', color: saved ? '#16a34a' : 'var(--color-text)' }}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save'}
          </button>
          <button onClick={publish}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full font-sans text-xs font-semibold text-white"
            style={{ background: 'var(--color-accent)' }}>
            <Share2 size={14} /> Publish
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 130px)' }}>
        {/* Left: Form */}
        <div className={`${previewMode ? 'hidden lg:block' : ''} w-full lg:w-[420px] lg:min-w-[420px] border-r overflow-y-auto`}
          style={{ borderColor: 'var(--color-border)' }}>
          <div className="p-4">
            {sections.map((section, i) => (
              <div key={section.key} className="mb-1">
                {/* Section header with inline toggle */}
                <div className="flex items-center gap-2">
                  <button onClick={() => setActiveSection(activeSection === i ? -1 : i)}
                    className="flex-1 flex items-center justify-between p-3 rounded-lg font-sans text-sm font-semibold transition-colors"
                    style={{
                      background: activeSection === i ? 'rgba(200,146,42,0.08)' : 'transparent',
                      color: data.sections[section.key] ? (activeSection === i ? 'var(--color-accent)' : 'var(--color-text)') : 'var(--color-muted)',
                      opacity: data.sections[section.key] ? 1 : 0.5,
                    }}>
                    {section.label}
                    {activeSection === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {/* Toggle switch */}
                  <button onClick={() => toggleSection(section.key)} className="relative flex-shrink-0" title={data.sections[section.key] ? 'Hide section' : 'Show section'}>
                    <div className="w-9 h-5 rounded-full transition-colors" style={{ background: data.sections[section.key] ? 'var(--color-accent)' : '#d1d5db' }}>
                      <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                        style={{ transform: data.sections[section.key] ? 'translateX(18px)' : 'translateX(2px)' }} />
                    </div>
                  </button>
                </div>

                {/* Section content */}
                {activeSection === i && data.sections[section.key] && (
                  <div className="px-3 pb-3">
                    {section.component}
                  </div>
                )}

                {activeSection === i && !data.sections[section.key] && (
                  <p className="px-3 pb-3 font-sans text-xs" style={{ color: 'var(--color-muted)' }}>
                    This section is hidden. Toggle on to edit.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live preview */}
        <div className={`${!previewMode ? 'hidden lg:flex' : 'flex'} flex-1 items-start justify-center overflow-auto`}
          style={{ background: '#0a0a0a' }}>
          {deviceView === 'phone' ? (
            <div className="p-8">
              <div className="rounded-[40px] overflow-hidden border-[6px] border-gray-700 shadow-2xl relative"
                style={{ width: 375, height: 812 }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl z-20" style={{ background: '#333' }} />
                <iframe ref={iframeRef} src={`${template.url}`}
                  className="w-full h-full" style={{ border: 'none' }} title="Preview" />
              </div>
            </div>
          ) : (
            <iframe ref={iframeRef} src={`${template.url}`}
              className="w-full h-full" style={{ border: 'none' }} title="Preview" />
          )}
        </div>
      </div>
    </div>
  )
}
