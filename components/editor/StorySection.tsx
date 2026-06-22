import { WeddingFormData, StoryItem } from '@/lib/editor-types'
import FormField from './FormField'
import FileUpload from './FileUpload'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function StorySection({ data, onChange }: Props) {
  const updateStory = (index: number, key: keyof StoryItem, val: string) => {
    const coupleStory = [...data.coupleStory]
    coupleStory[index] = { ...coupleStory[index], [key]: val }
    onChange({ ...data, coupleStory })
  }

  const addStory = () => {
    onChange({
      ...data,
      coupleStory: [...data.coupleStory, { date: '', title: '', description: '', icon: '✨', image: '' }],
    })
  }

  const removeStory = (index: number) => {
    onChange({ ...data, coupleStory: data.coupleStory.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg">Our Story</h3>
        <button onClick={addStory} className="flex items-center gap-1 font-sans text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(200,146,42,0.1)', color: 'var(--color-accent)' }}>
          <Plus size={14} /> Add Chapter
        </button>
      </div>

      {data.coupleStory.map((item, i) => (
        <div key={i} className="p-4 rounded-xl mb-3" style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>Chapter {i + 1}</span>
            {data.coupleStory.length > 1 && (
              <button onClick={() => removeStory(i)} className="hover:opacity-70"><Trash2 size={14} style={{ color: '#c00' }} /></button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Title" value={item.title} onChange={v => updateStory(i, 'title', v)} placeholder="How We Met" />
            <FormField label="When" value={item.date} onChange={v => updateStory(i, 'date', v)} placeholder="March 2020" />
          </div>
          <FormField label="Description" value={item.description} onChange={v => updateStory(i, 'description', v)} type="textarea" placeholder="Tell your story..." />
          <FileUpload label="Story Photo" value={item.image || ''} onChange={v => updateStory(i, 'image', v)} />
        </div>
      ))}
    </div>
  )
}
