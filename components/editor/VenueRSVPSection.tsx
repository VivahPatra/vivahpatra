import { WeddingFormData } from '@/lib/editor-types'
import FormField from './FormField'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function VenueRSVPSection({ data, onChange }: Props) {
  const set = (key: keyof WeddingFormData, val: string) => onChange({ ...data, [key]: val })

  return (
    <div>
      <h3 className="font-display text-lg mb-4">Venue & RSVP</h3>
      <FormField label="Main Venue Name" value={data.venueName} onChange={v => set('venueName', v)} placeholder="The Grand Palace" />
      <FormField label="Venue Address" value={data.venueAddress} onChange={v => set('venueAddress', v)} placeholder="MG Road, New Delhi" />
      <FormField label="Google Maps URL" value={data.venueMapUrl} onChange={v => set('venueMapUrl', v)} placeholder="https://maps.google.com/..." />
      <div className="grid grid-cols-2 gap-4">
        <FormField label="RSVP Phone (WhatsApp)" value={data.rsvpPhone} onChange={v => set('rsvpPhone', v)} type="tel" placeholder="919876543210" />
        <FormField label="RSVP Deadline" value={data.rsvpDeadline} onChange={v => set('rsvpDeadline', v)} type="date" />
      </div>
    </div>
  )
}
