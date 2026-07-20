'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, IndianRupee } from 'lucide-react'
import { TEMPLATES } from '@/lib/templates'
import { createClient } from '@/lib/supabase'

interface PriceRow {
  template_id: string
  price: number
}

export default function AdminTemplates() {
  const [prices, setPrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(TEMPLATES.map(t => [t.id, t.price]))
  )
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.from('template_prices').select('template_id, price').then(({ data }: { data: PriceRow[] | null }) => {
      if (data?.length) {
        const overrides = Object.fromEntries(data.map(r => [r.template_id, r.price]))
        setPrices(prev => ({ ...prev, ...overrides }))
      }
    })
  }, [])

  const handleSave = async (templateId: string) => {
    setSaving(templateId)
    const supabase = createClient()
    if (!supabase) { setSaving(null); return }
    await supabase.from('template_prices').upsert({ template_id: templateId, price: prices[templateId] }, { onConflict: 'template_id' })
    setSaving(null)
    setSaved(templateId)
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl mb-1">Templates</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>Manage template pricing</p>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #222' }}>
        <table className="w-full font-sans text-sm">
          <thead style={{ background: '#1a1a1a' }}>
            <tr>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: '#666' }}>Template</th>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: '#666' }}>Category</th>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: '#666' }}>Price (₹)</th>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: '#666' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {TEMPLATES.map((t, i) => (
              <motion.tr key={t.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                style={{ borderTop: '1px solid #1a1a1a', background: '#111' }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: t.color }} />
                    <span style={{ color: '#e0e0e0' }}>{t.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4" style={{ color: '#888' }}>{t.category}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <IndianRupee size={14} style={{ color: '#888' }} />
                    <input
                      type="number"
                      min={1}
                      value={prices[t.id]}
                      onChange={e => setPrices(prev => ({ ...prev, [t.id]: Number(e.target.value) }))}
                      className="w-28 px-3 py-1.5 rounded-lg font-sans text-sm outline-none"
                      style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#e0e0e0' }}
                    />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => handleSave(t.id)}
                    disabled={saving === t.id}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-sans text-xs font-semibold transition-all"
                    style={{
                      background: saved === t.id ? '#16a34a' : '#e8384f',
                      color: '#fff',
                      opacity: saving === t.id ? 0.6 : 1,
                    }}>
                    <Save size={12} />
                    {saved === t.id ? 'Saved!' : saving === t.id ? 'Saving…' : 'Save'}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-sans text-xs mt-4" style={{ color: '#444' }}>
        Prices are saved to Supabase and override the default. Changes apply immediately on next page load.
      </p>
    </div>
  )
}
