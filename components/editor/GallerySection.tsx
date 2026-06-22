'use client'
import { useRef } from 'react'
import { WeddingFormData, GalleryImage } from '@/lib/editor-types'
import { Plus, X, ImageIcon } from 'lucide-react'

interface Props {
  data: WeddingFormData
  onChange: (data: WeddingFormData) => void
}

export default function GallerySection({ data, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const addPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImages: GalleryImage[] = files.map((file, i) => ({
      src: URL.createObjectURL(file),
      alt: `Photo ${data.galleryImages.length + i + 1}`,
      span: 'normal' as const,
    }))
    onChange({ ...data, galleryImages: [...data.galleryImages, ...newImages] })
    if (inputRef.current) inputRef.current.value = ''
  }

  const removePhoto = (index: number) => {
    onChange({ ...data, galleryImages: data.galleryImages.filter((_, i) => i !== index) })
  }

  const updateSpan = (index: number, span: GalleryImage['span']) => {
    const images = [...data.galleryImages]
    images[index] = { ...images[index], span }
    onChange({ ...data, galleryImages: images })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg">Photo Gallery</h3>
        <button onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1 font-sans text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(200,146,42,0.1)', color: 'var(--color-accent)' }}>
          <Plus size={14} /> Add Photos
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={addPhotos} />

      {data.galleryImages.length === 0 ? (
        <button onClick={() => inputRef.current?.click()}
          className="w-full py-10 rounded-xl flex flex-col items-center gap-2"
          style={{ border: '2px dashed var(--color-border)' }}>
          <ImageIcon size={32} style={{ color: 'var(--color-muted)' }} />
          <span className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>Click to add gallery photos</span>
          <span className="font-sans text-xs" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>Upload up to 10 photos</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {data.galleryImages.map((img, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden group" style={{ aspectRatio: '1', border: '1px solid var(--color-border)' }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-1">
                <button onClick={() => removePhoto(i)}
                  className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                  <X size={12} className="text-white" />
                </button>
              </div>
              <select value={img.span} onChange={e => updateSpan(i, e.target.value as GalleryImage['span'])}
                className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 text-[10px] bg-black/70 text-white rounded px-1 py-0.5">
                <option value="normal">Normal</option>
                <option value="wide">Wide</option>
                <option value="tall">Tall</option>
              </select>
            </div>
          ))}
        </div>
      )}
      <p className="font-sans text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
        {data.galleryImages.length}/10 photos • Hover to delete or change layout
      </p>
    </div>
  )
}
