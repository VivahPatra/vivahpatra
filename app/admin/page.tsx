'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, ShoppingBag, IndianRupee, Link2, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import DateTimePicker from '@/components/admin/DateTimePicker'

interface RecentPurchase {
  template_id: string
  amount: number
  created_at: string
  user_email: string
}

interface Stats {
  totalUsers: number
  totalPurchases: number
  totalRevenue: number
  totalInvites: number
  recentPurchases: RecentPurchase[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      if (!supabase) return

      let purchasesQ = supabase.from('purchases').select('*').order('created_at', { ascending: false })
      if (from) purchasesQ = purchasesQ.gte('created_at', new Date(from).toISOString())
      if (to) purchasesQ = purchasesQ.lte('created_at', new Date(to).toISOString())

      const [purchases, invites, profiles] = await Promise.all([
        purchasesQ,
        supabase.from('published_invites').select('id'),
        supabase.from('user_profiles').select('id, email'),
      ])

      const purchaseList = purchases.data || []
      const profileMap = new Map((profiles.data || []).map((p: { id: string; email: string }) => [p.id, p.email]))
      const totalRevenue = purchaseList.reduce((sum: number, p: { amount: number }) => sum + p.amount, 0)

      setStats({
        totalUsers: new Set(purchaseList.map((p: { user_id: string }) => p.user_id)).size,
        totalPurchases: purchaseList.length,
        totalRevenue,
        totalInvites: invites.data?.length || 0,
        recentPurchases: purchaseList.slice(0, 10).map((p: { user_id: string; template_id: string; amount: number; created_at: string }) => ({
          ...p,
          user_email: profileMap.get(p.user_id) || p.user_id.slice(0, 12) + '…',
        })),
      })
    }
    load()
  }, [from, to])

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: '#3b82f6' },
    { label: 'Purchases', value: stats.totalPurchases, icon: ShoppingBag, color: '#e8384f' },
    { label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: '#16a34a' },
    { label: 'Published Invites', value: stats.totalInvites, icon: Link2, color: '#c8922a' },
  ] : []

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl mb-1">Dashboard</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>Overview of Vivah Patra platform</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div key={card.label}
            className="p-5 rounded-xl"
            style={{ background: '#1a1a1a', border: '1px solid #222' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs uppercase tracking-wider" style={{ color: '#666' }}>{card.label}</span>
              <card.icon size={18} style={{ color: card.color }} />
            </div>
            <p className="font-display text-2xl" style={{ color: '#fff' }}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent purchases */}
      <div className="rounded-xl p-5" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} style={{ color: '#e8384f' }} />
            <h2 className="font-sans text-sm font-semibold">Recent Purchases</h2>
          </div>
          <div className="flex items-end gap-3 flex-wrap">
            <DateTimePicker label="From" value={from} onChange={setFrom} />
            <span className="font-sans text-xs pb-2" style={{ color: '#444' }}>→</span>
            <DateTimePicker label="To" value={to} onChange={setTo} />
          </div>
        </div>
        {stats?.recentPurchases.length ? (
          <table className="w-full font-sans text-sm">
            <thead>
              <tr style={{ color: '#666' }}>
                <th className="text-left py-2 text-xs uppercase tracking-wider">User</th>
                <th className="text-left py-2 text-xs uppercase tracking-wider">Template</th>
                <th className="text-left py-2 text-xs uppercase tracking-wider">Amount</th>
                <th className="text-left py-2 text-xs uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentPurchases.map((p, i) => (
                <tr key={i} style={{ borderTop: '1px solid #222' }}>
                  <td className="py-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: '#222', color: '#aaa' }}>{p.user_email}</span>
                  </td>
                  <td className="py-3">{p.template_id}</td>
                  <td className="py-3">₹{p.amount}</td>
                  <td className="py-3" style={{ color: '#888' }}>{new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="font-sans text-sm" style={{ color: '#666' }}>No purchases yet</p>
        )}
      </div>
    </div>
  )
}
