'use client'
import { Category, CATEGORIES } from '@/lib/templates'

interface Props {
  active: Category
  onChange: (cat: Category) => void
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {CATEGORIES.map(cat => (
        <button key={cat} onClick={() => onChange(cat)}
          className="px-5 py-2 rounded-full font-sans text-sm transition-all duration-200"
          style={{
            background: active === cat ? 'var(--color-accent)' : 'transparent',
            color: active === cat ? '#fff' : 'var(--color-muted)',
            border: `1px solid ${active === cat ? 'var(--color-accent)' : 'var(--color-border)'}`,
          }}>
          {cat}
        </button>
      ))}
    </div>
  )
}
