'use client'
import { useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface Props {
  label: string
  value: string
  onChange: (val: string) => void
  accept?: string
  preview?: boolean
}

export default function FileUpload({ label, value, onChange, accept = 'image/*', preview = true }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onChange(url)
  }

  return (
    <div className="mb-4">
      <label className="font-sans text-xs font-semibold tracking-wider uppercase mb-1.5 block" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>

      {value && preview ? (
        <div className="relative rounded-lg overflow-hidden mb-2" style={{ border: '1px solid var(--color-border)' }}>
          {accept.includes('audio') ? (
            <audio src={value} controls className="w-full" />
          ) : (
            <img src={value} alt="" className="w-full h-32 object-cover" />
          )}
          <button onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80">
            <X size={12} className="text-white" />
          </button>
        </div>
      ) : null}

      <button onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-sans text-xs transition-all hover:opacity-80"
        style={{ border: '1px dashed var(--color-border)', color: 'var(--color-muted)' }}>
        <Upload size={14} /> {value ? 'Change' : 'Upload'} {label}
      </button>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleFile} />
    </div>
  )
}
