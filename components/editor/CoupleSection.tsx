import { WeddingFormData } from '@/lib/editor-types'
import FormField from './FormField'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function CoupleSection({ data, onChange }: Props) {
  const set = (key: keyof WeddingFormData, val: string) => onChange({ ...data, [key]: val })

  return (
    <div>
      <h3 className="font-display text-lg mb-4">Couple Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Groom's Name" value={data.groomName} onChange={v => set('groomName', v)} placeholder="Rahul" />
        <FormField label="Bride's Name" value={data.brideName} onChange={v => set('brideName', v)} placeholder="Priya" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Groom's Subtitle" value={data.groomSubtitle} onChange={v => set('groomSubtitle', v)} placeholder="Sharma" />
        <FormField label="Bride's Subtitle" value={data.brideSubtitle} onChange={v => set('brideSubtitle', v)} placeholder="Gupta" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Groom's Parents" value={data.groomParents} onChange={v => set('groomParents', v)} placeholder="Mr. & Mrs. Sharma" />
        <FormField label="Bride's Parents" value={data.brideParents} onChange={v => set('brideParents', v)} placeholder="Mr. & Mrs. Gupta" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Wedding Date" value={data.weddingDate} onChange={v => set('weddingDate', v)} type="date" />
        <FormField label="Hashtag" value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#RahulWedsPriva" />
      </div>
      <FormField label="Tagline" value={data.tagline} onChange={v => set('tagline', v)} placeholder="Two souls, one love story" />
      <FormField label="Invitation Text" value={data.invitationText} onChange={v => set('invitationText', v)} type="textarea" />
    </div>
  )
}
