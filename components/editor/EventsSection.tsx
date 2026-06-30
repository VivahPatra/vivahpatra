import { WeddingFormData, WeddingEvent } from '@/lib/editor-types'
import FormField from './FormField'
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function EventsSection({ data, onChange }: Props) {
  const updateEvent = (index: number, key: keyof WeddingEvent, val: string | boolean) => {
    const events = [...data.events]
    events[index] = { ...events[index], [key]: val }
    onChange({ ...data, events })
  }

  const addEvent = () => {
    onChange({
      ...data,
      events: [...data.events, { id: `event-${Date.now()}`, name: '', emoji: '🎉', image: 'https://vivahpatra.co/assets/events/wedding.webp', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' }],
    })
  }

  const removeEvent = (index: number) => {
    onChange({ ...data, events: data.events.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg">Events</h3>
        <button onClick={addEvent} className="flex items-center gap-1 font-sans text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(200,146,42,0.1)', color: 'var(--color-accent)' }}>
          <Plus size={14} /> Add Event
        </button>
      </div>

      {data.events.map((ev, i) => (
        <div key={ev.id} className="p-4 rounded-xl mb-3" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)', opacity: ev.hidden ? 0.5 : 1 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {ev.image && (
                <img src={ev.image} alt={ev.name} className="w-8 h-8 rounded-lg object-cover"
                  style={{ border: '1px solid var(--color-border)' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              )}
              <span className="font-sans text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
                {ev.name || `Event ${i + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateEvent(i, 'hidden', !ev.hidden)}
                title={ev.hidden ? 'Hidden — click to show' : 'Visible — click to hide'}
                className="hover:opacity-70" style={{ color: ev.hidden ? '#999' : 'var(--color-accent)' }}>
                {ev.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              {data.events.length > 1 && (
                <button onClick={() => removeEvent(i)} className="hover:opacity-70"><Trash2 size={14} style={{ color: '#c00' }} /></button>
              )}
            </div>
          </div>
          <FormField label="Event Name" value={ev.name} onChange={v => updateEvent(i, 'name', v)} placeholder="Mehendi" />
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date" value={ev.date} onChange={v => updateEvent(i, 'date', v)} type="date" />
            <FormField label="Time" value={ev.time} onChange={v => updateEvent(i, 'time', v)} placeholder="6:00 PM" />
          </div>
          <FormField label="Venue" value={ev.venue} onChange={v => updateEvent(i, 'venue', v)} placeholder="The Grand Hotel" />
          <FormField label="Address" value={ev.venueAddress} onChange={v => updateEvent(i, 'venueAddress', v)} placeholder="MG Road, Delhi" />
          <FormField label="Google Maps Link" value={ev.venueMapLink} onChange={v => updateEvent(i, 'venueMapLink', v)} placeholder="https://maps.google.com/..." />
        </div>
      ))}
    </div>
  )
}
