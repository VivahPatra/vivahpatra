'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Globe, Search, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { TEMPLATES } from '@/lib/templates'

interface TemplateStats {
  templateId: string
  name: string
  color: string
  purchases: number
  revenue: number
  invites: number
}

function toISO(dt: string) { return dt ? new Date(dt).toISOString() : '' }

export default function AdminAnalytics() {
  const [templateStats, setTemplateStats] = useState<TemplateStats[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  async function loadData(fromVal: string, toVal: string) {
    const supabase = createClient()
    if (!supabase) return

    let purchasesQ = supabase.from('purchases').select('template_id, amount, created_at')
    if (fromVal) purchasesQ = purchasesQ.gte('created_at', toISO(fromVal))
    if (toVal) purchasesQ = purchasesQ.lte('created_at', toISO(toVal))

    const [purchases, invites] = await Promise.all([
      purchasesQ,
      supabase.from('published_invites').select('template_id'),
    ])

    const pData = purchases.data || []
    const iData = invites.data || []

    const stats: TemplateStats[] = TEMPLATES.map(t => ({
      templateId: t.id,
      name: t.name,
      color: t.color,
      purchases: pData.filter((p: { template_id: string }) => p.template_id === t.id).length,
      revenue: pData.filter((p: { template_id: string }) => p.template_id === t.id).reduce((sum: number, p: { amount: number }) => sum + p.amount, 0),
      invites: iData.filter((i: { template_id: string }) => i.template_id === t.id).length,
    })).sort((a, b) => b.purchases - a.purchases)

    setTemplateStats(stats)
    setTotalRevenue(pData.reduce((sum: number, p: { amount: number }) => sum + p.amount, 0))
  }

  useEffect(() => { loadData(from, to) }, [from, to])

  const maxPurchases = Math.max(...templateStats.map(s => s.purchases), 1)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl mb-1">Analytics & SEO</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>Template performance and traffic insights</p>
      </div>

      {/* Date range filter */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-xl" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <Calendar size={15} style={{ color: '#e8384f' }} />
        <span className="font-sans text-xs uppercase tracking-wider" style={{ color: '#666' }}>Revenue Period</span>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <div className="flex flex-col gap-0.5">
            <label className="font-sans text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>From</label>
            <input type="datetime-local" value={from} onChange={e => setFrom(e.target.value)}
              className="px-3 py-1.5 rounded-lg font-sans text-xs" style={{ background: '#111', color: '#fff', border: '1px solid #333' }} />
          </div>
          <div className="flex flex-col gap-0.5">
            <label className="font-sans text-[10px] uppercase tracking-wider" style={{ color: '#555' }}>To</label>
            <input type="datetime-local" value={to} onChange={e => setTo(e.target.value)}
              className="px-3 py-1.5 rounded-lg font-sans text-xs" style={{ background: '#111', color: '#fff', border: '1px solid #333' }} />
          </div>
          {(from || to) && (
            <button onClick={() => { setFrom(''); setTo('') }}
              className="px-3 py-1.5 rounded-lg font-sans text-xs mt-4 hover:bg-white/10 transition-colors"
              style={{ color: '#888', border: '1px solid #333' }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Template performance */}
      <div className="rounded-xl p-5 mb-6" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={16} style={{ color: '#e8384f' }} />
          <h2 className="font-sans text-sm font-semibold">Template Performance</h2>
        </div>
        <div className="space-y-3">
          {templateStats.map((s, i) => (
            <motion.div key={s.templateId} className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="w-28 shrink-0">
                <p className="font-sans text-sm truncate">{s.name}</p>
              </div>
              <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ background: '#222' }}>
                <motion.div className="h-full rounded-full" style={{ background: s.color }}
                  initial={{ width: 0 }} animate={{ width: `${(s.purchases / maxPurchases) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }} />
              </div>
              <div className="w-20 shrink-0 text-right">
                <span className="font-sans text-xs" style={{ color: '#888' }}>{s.purchases} buys</span>
              </div>
              <div className="w-24 shrink-0 text-right">
                <span className="font-sans text-xs" style={{ color: '#16a34a' }}>₹{s.revenue.toLocaleString()}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-xl" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <TrendingUp size={16} style={{ color: '#16a34a' }} className="mb-2" />
          <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: '#666' }}>Total Revenue</p>
          <p className="font-display text-xl" style={{ color: '#16a34a' }}>₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="p-5 rounded-xl" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <Globe size={16} style={{ color: '#3b82f6' }} className="mb-2" />
          <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: '#666' }}>Most Popular</p>
          <p className="font-display text-xl">{templateStats[0]?.name || '—'}</p>
        </div>
        <div className="p-5 rounded-xl" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <Search size={16} style={{ color: '#c8922a' }} className="mb-2" />
          <p className="font-sans text-xs uppercase tracking-wider mb-1" style={{ color: '#666' }}>SEO</p>
          <p className="font-sans text-sm" style={{ color: '#888' }}>Connect Google Search Console for traffic data</p>
        </div>
      </div>

      {/* SEO tips */}
      <div className="rounded-xl p-5" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <h2 className="font-sans text-sm font-semibold mb-3">SEO Recommendations</h2>
        <ul className="space-y-2 font-sans text-sm" style={{ color: '#888' }}>
          <li>✅ Meta title and description set for all pages</li>
          <li>✅ OG images configured for social sharing</li>
          <li>🔲 Connect Google Search Console → <a href="https://search.google.com/search-console" target="_blank" className="underline" style={{ color: '#3b82f6' }}>Setup here</a></li>
          <li>🔲 Submit sitemap.xml to Google</li>
          <li>🔲 Add Google Analytics 4 tracking code</li>
          <li>🔲 Set up Facebook Pixel for ad tracking</li>
        </ul>
      </div>
    </div>
  )
}
