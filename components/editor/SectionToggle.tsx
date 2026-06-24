import { SectionToggle as ToggleType } from '@/lib/editor-types'

interface Props {
  sections: ToggleType
  onChange: (sections: ToggleType) => void
}

const SECTION_LABELS: Record<keyof ToggleType, string> = {
  hero: 'Hero / Landing',
  invitation: 'You Are Invited',
  coupleStory: 'Our Story',
  gallery: 'Photo Gallery',
  events: 'Events / Celebrations',
  rsvp: 'RSVP',
  countdown: 'Countdown',
  venue: 'Venue Details',
  family: 'Family Members',
  info: 'Info Cards',
  footer: 'Footer',
}

export default function SectionTogglePanel({ sections, onChange }: Props) {
  const toggle = (key: keyof ToggleType) => {
    onChange({ ...sections, [key]: !sections[key] })
  }

  return (
    <div>
      <h3 className="font-display text-lg mb-4">Section Visibility</h3>
      <p className="font-sans text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
        Toggle sections on/off. Disabled sections won't appear on your invite.
      </p>
      <div className="flex flex-col gap-2">
        {(Object.keys(SECTION_LABELS) as Array<keyof ToggleType>).map(key => (
          <label key={key} className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
            style={{ border: '1px solid var(--color-border)' }}>
            <span className="font-sans text-sm">{SECTION_LABELS[key]}</span>
            <div className="relative">
              <input type="checkbox" checked={sections[key]} onChange={() => toggle(key)} className="sr-only" />
              <div className="w-10 h-5 rounded-full transition-colors" style={{ background: sections[key] ? 'var(--color-accent)' : '#d1d5db' }}>
                <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                  style={{ transform: sections[key] ? 'translateX(22px)' : 'translateX(2px)' }} />
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
