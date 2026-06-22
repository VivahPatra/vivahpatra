import { WeddingFormData } from '@/lib/editor-types'
import FileUpload from './FileUpload'
import FormField from './FormField'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function MusicSection({ data, onChange }: Props) {
  const set = (key: keyof WeddingFormData, val: string) => onChange({ ...data, [key]: val })

  return (
    <div>
      <h3 className="font-display text-lg mb-4">Music & Social</h3>
      <FileUpload
        label="Background Music"
        value={data.backgroundMusic}
        onChange={v => set('backgroundMusic', v)}
        accept="audio/*"
      />
      <p className="font-sans text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
        Upload an MP3 file. Music plays softly when guests open your invite.
      </p>
      <FormField label="Instagram URL" value={data.instagram} onChange={v => set('instagram', v)} placeholder="https://instagram.com/youraccount" />
    </div>
  )
}
