'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Category, filterTemplates, TEMPLATES } from '@/lib/templates'
import CategoryFilter from './CategoryFilter'
import TemplateCard from './TemplateCard'

export default function TemplateGrid() {
  const [category, setCategory] = useState<Category>('All')
  const filtered = filterTemplates(category)

  return (
    <div>
      <CategoryFilter active={category} onChange={setCategory} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map(t => <TemplateCard key={t.id} template={t} />)}
        </AnimatePresence>
      </div>
      <p className="font-sans text-xs text-center mt-10" style={{ color: 'var(--color-muted)' }}>
        Showing {filtered.length} of {TEMPLATES.length} templates
      </p>
    </div>
  )
}
