import { WeddingFormData } from '@/lib/editor-types'
import { TemplateEditorConfig } from '@/lib/editor-config'
import FormField from './FormField'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
  config: TemplateEditorConfig
}

export default function CoupleSection({ data, onChange, config }: Props) {
  const set = (key: keyof WeddingFormData, val: string) => onChange({ ...data, [key]: val })

  return (
    <div>
      <h3 className="font-display text-lg mb-4">Couple Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Groom's Name" value={data.groomName} onChange={v => set('groomName', v)} placeholder="Rahul" />
        <FormField label="Bride's Name" value={data.brideName} onChange={v => set('brideName', v)} placeholder="Priya" />
      </div>
      {config.hasSubtitles && (
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Groom's Subtitle" value={data.groomSubtitle} onChange={v => set('groomSubtitle', v)} placeholder="Sharma" />
          <FormField label="Bride's Subtitle" value={data.brideSubtitle} onChange={v => set('brideSubtitle', v)} placeholder="Gupta" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Groom's Parents" value={data.groomParents} onChange={v => set('groomParents', v)} placeholder="Mr. & Mrs. Sharma" />
        <FormField label="Bride's Parents" value={data.brideParents} onChange={v => set('brideParents', v)} placeholder="Mr. & Mrs. Gupta" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormField label="Wedding Date" value={data.weddingDate} onChange={v => set('weddingDate', v)} type="date" />
          <p className="font-sans text-[10px] -mt-2 mb-3" style={{ color: 'var(--color-muted)' }}>
            Used in hero, countdown, invitation &amp; footer
          </p>
        </div>
        <FormField label="Hashtag" value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#RahulWedsPrivya" />
      </div>
      {config.hasTagline && (
        <FormField label="Tagline" value={data.tagline} onChange={v => set('tagline', v)} placeholder="Two souls, one love story" />
      )}
      {config.hasInvitationText && (
        <FormField label="Invitation Text" value={data.invitationText} onChange={v => set('invitationText', v)} type="textarea" />
      )}
    </div>
  )
}
