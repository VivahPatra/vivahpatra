'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { Category, filterTemplates, TEMPLATES, CATEGORIES, Template } from '@/lib/templates'
import CategoryFilter from './CategoryFilter'
import TemplateCard from './TemplateCard'
import { createClient } from '@/lib/supabase'

export default function TemplateGrid() {
  const searchParams = useSearchParams()
  const paramCat = searchParams.get('category') as Category | null
  const [category, setCategory] = useState<Category>(
    paramCat && (CATEGORIES as readonly string[]).includes(paramCat) ? paramCat : 'All'
  )
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({})

  useEffect(() => {
    if (paramCat && (CATEGORIES as readonly string[]).includes(paramCat)) {
      setCategory(paramCat as Category)
    }
  }, [paramCat])

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.from('template_prices').select('template_id, price').then(({ data }: { data: { template_id: string; price: number }[] | null }) => {
      if (data?.length) {
        setPriceOverrides(Object.fromEntries(data.map(r => [r.template_id, r.price])))
      }
    })
  }, [])

  const applyPrices = (templates: Template[]) =>
    templates.map(t => priceOverrides[t.id] !== undefined ? { ...t, price: priceOverrides[t.id] } : t)

  const filtered = applyPrices(filterTemplates(category))

  return (
    <div>
      <CategoryFilter active={category} onChange={setCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
