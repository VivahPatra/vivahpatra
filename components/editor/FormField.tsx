interface Props {
  label: string
  value: string
  onChange: (val: string) => void
  type?: 'text' | 'date' | 'tel' | 'textarea'
  placeholder?: string
}

export default function FormField({ label, value, onChange, type = 'text', placeholder }: Props) {
  const base = "w-full px-4 py-2.5 rounded-lg font-sans text-sm outline-none transition-all focus:ring-2 focus:ring-[#c8922a33]"
  const style = { border: '1px solid var(--color-border)', background: 'var(--color-bg)' }

  return (
    <div className="mb-4">
      <label className="font-sans text-xs font-semibold tracking-wider uppercase mb-1.5 block" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={`${base} min-h-[80px] resize-y`} style={style} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={base} style={style} />
      )}
    </div>
  )
}
