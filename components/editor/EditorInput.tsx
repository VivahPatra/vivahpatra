'use client'
import { useRef } from 'react'
import { Upload, X } from 'lucide-react'

const inputCls = "w-full px-3 py-2 rounded-lg text-sm outline-none transition-all focus:ring-1 focus:ring-[#c8922a33]"
const inputStyle: React.CSSProperties = { border: '1px solid rgba(200,146,42,0.15)', background: 'rgba(20,18,32,0.8)', color: '#f0ece4', colorScheme: 'dark' }
const labelCls = "text-[10px] font-semibold tracking-wider uppercase mb-1 block"
const labelStyle: React.CSSProperties = { color: '#7a7068' }

export function EditorInput({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div className="mb-3">
      <label className={labelCls} style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} style={inputStyle} />
    </div>
  )
}

export function EditorTextArea({ label, value, onChange, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div className="mb-3">
      <label className={labelCls} style={labelStyle}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${inputCls} min-h-[70px] resize-y`} style={inputStyle} />
    </div>
  )
}

export function EditorImageUpload({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(URL.createObjectURL(file))
  }

  return (
    <div className="mb-3">
      <label className={labelCls} style={labelStyle}>{label}</label>
      {value ? (
        <div className="relative rounded-lg overflow-hidden mb-1" style={{ border: '1px solid rgba(200,146,42,0.15)' }}>
          <img src={value} alt="" className="w-full h-24 object-cover" />
          <button onClick={() => onChange('')} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-black/70 hover:bg-black/90">
            <X size={10} className="text-white" />
          </button>
        </div>
      ) : null}
      <button onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-semibold"
        style={{ border: '1px dashed rgba(200,146,42,0.25)', color: '#7a7068' }}>
        <Upload size={12} /> {value ? 'Change' : 'Upload'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

export function EditorMultiImageUpload({ label, images, onChange }: {
  label: string; images: { src: string; alt: string }[]; onChange: (imgs: { src: string; alt: string }[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const addPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newImgs = files.map((f, i) => ({ src: URL.createObjectURL(f), alt: `Photo ${images.length + i + 1}` }))
    onChange([...images, ...newImgs])
    if (inputRef.current) inputRef.current.value = ''
  }

  const removePhoto = (i: number) => onChange(images.filter((_, j) => j !== i))

  return (
    <div className="mb-3">
      <label className={labelCls} style={labelStyle}>{label}</label>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-1 mb-2">
          {images.map((img, i) => (
            <div key={i} className="relative rounded overflow-hidden group" style={{ aspectRatio: '1' }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              <button onClick={() => removePhoto(i)} className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={8} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-semibold"
        style={{ border: '1px dashed rgba(200,146,42,0.25)', color: '#7a7068' }}>
        <Upload size={12} /> Add Photos
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={addPhotos} />
      <p className="text-[9px] mt-1" style={{ color: '#7a7068' }}>{images.length} photos</p>
    </div>
  )
}

export function SectionHeader({ label, visible, onToggle }: {
  label: string; visible: boolean; onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(200,146,42,0.15)' }}>
      <h3 className="text-sm font-semibold" style={{ color: '#f0ece4' }}>{label}</h3>
      <button onClick={onToggle} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: visible ? 'rgba(200,146,42,0.15)' : 'rgba(255,255,255,0.05)', color: visible ? '#c8922a' : '#7a7068' }}>
        {visible ? 'Visible' : 'Hidden'}
      </button>
    </div>
  )
}
