'use client'
import { useEffect, useState } from 'react'
import { Trash2, Edit3, X, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { TEMPLATES } from '@/lib/templates'

interface Purchase {
  id: string
  user_id: string
  template_id: string
  instance_id: string
  razorpay_order_id: string
  razorpay_payment_id: string
  amount: number
  created_at: string
}

interface UserGroup {
  userId: string
  email: string
  purchases: Purchase[]
  totalSpent: number
}

export default function AdminPurchases() {
  const [groups, setGroups] = useState<UserGroup[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Purchase>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const supabase = createClient()
    if (!supabase) return

    const [purchasesRes, profilesRes] = await Promise.all([
      supabase.from('purchases').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*'),
    ])

    const purchases = (purchasesRes.data || []) as Purchase[]
    const profiles = (profilesRes.data || []) as Record<string, string>[]

    const userMap = new Map<string, UserGroup>()
    for (const p of purchases) {
      if (!userMap.has(p.user_id)) {
        const profile = profiles.find(pr => pr.id === p.user_id)
        const label = profile ? (profile.name || profile.full_name || profile.email || p.user_id.slice(0, 8)) : p.user_id.slice(0, 8)
        userMap.set(p.user_id, { userId: p.user_id, email: label, purchases: [], totalSpent: 0 })
      }
      const group = userMap.get(p.user_id)!
      group.purchases.push(p)
      group.totalSpent += p.amount
    }

    setGroups(Array.from(userMap.values()))
    setLoading(false)
  }

  const startEdit = (p: Purchase) => {
    setEditing(p.id)
    setEditData({ amount: p.amount, template_id: p.template_id, razorpay_order_id: p.razorpay_order_id, razorpay_payment_id: p.razorpay_payment_id })
  }

  const saveEdit = async (id: string) => {
    const supabase = createClient()
    if (!supabase) return
    const { error } = await supabase.from('purchases').update({
      amount: editData.amount,
      template_id: editData.template_id,
      razorpay_order_id: editData.razorpay_order_id,
      razorpay_payment_id: editData.razorpay_payment_id,
    }).eq('id', id)

    if (error) { alert('Update failed: ' + error.message); return }
    setEditing(null)
    loadData()
  }

  const deletePurchase = async (id: string) => {
    if (!confirm('Delete this purchase? Cannot be undone.')) return
    const supabase = createClient()
    if (!supabase) return
    const { error } = await supabase.from('purchases').delete().eq('id', id)
    if (error) { alert('Delete failed: ' + error.message); return }
    loadData()
  }

  const totalRevenue = groups.reduce((s, g) => s + g.totalSpent, 0)
  const totalPurchases = groups.reduce((s, g) => s + g.purchases.length, 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl mb-1">Purchases</h1>
          <p className="font-sans text-sm" style={{ color: '#666' }}>{totalPurchases} purchases · ₹{totalRevenue.toLocaleString()} revenue</p>
        </div>
      </div>

      <div className="space-y-3">
        {groups.map(group => (
          <div key={group.userId} className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
            {/* User header */}
            <button onClick={() => setExpanded(expanded === group.userId ? null : group.userId)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#e8384f', color: '#fff' }}>
                  {group.email[0]?.toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="font-sans text-sm font-semibold">{group.email}</p>
                  <p className="font-sans text-xs" style={{ color: '#666' }}>{group.purchases.length} purchases · ₹{group.totalSpent.toLocaleString()}</p>
                </div>
              </div>
              {expanded === group.userId ? <ChevronUp size={16} style={{ color: '#888' }} /> : <ChevronDown size={16} style={{ color: '#888' }} />}
            </button>

            {/* Expanded purchases */}
            {expanded === group.userId && (
              <div className="px-5 pb-4">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr style={{ color: '#666' }}>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Template</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Amount</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Razorpay Order</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Payment ID</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Date</th>
                      <th className="text-right py-2 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.purchases.map(p => {
                      const t = TEMPLATES.find(t => t.id === p.template_id)
                      const isEditing = editing === p.id
                      return (
                        <tr key={p.id} style={{ borderTop: '1px solid #222' }}>
                          <td className="py-3">
                            {isEditing ? (
                              <select value={editData.template_id} onChange={e => setEditData({ ...editData, template_id: e.target.value })}
                                className="px-2 py-1 rounded text-xs" style={{ background: '#222', color: '#fff', border: '1px solid #444' }}>
                                {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                              </select>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded" style={{ background: t?.color || '#555' }} />
                                {t?.name || p.template_id}
                              </div>
                            )}
                          </td>
                          <td className="py-3">
                            {isEditing ? (
                              <input type="number" value={editData.amount} onChange={e => setEditData({ ...editData, amount: Number(e.target.value) })}
                                className="w-20 px-2 py-1 rounded text-xs" style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                            ) : `₹${p.amount}`}
                          </td>
                          <td className="py-3">
                            {isEditing ? (
                              <input value={editData.razorpay_order_id || ''} onChange={e => setEditData({ ...editData, razorpay_order_id: e.target.value })}
                                className="w-32 px-2 py-1 rounded text-xs" style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                            ) : <span className="text-xs font-mono" style={{ color: '#888' }}>{p.razorpay_order_id?.slice(0, 18) || '—'}</span>}
                          </td>
                          <td className="py-3">
                            {isEditing ? (
                              <input value={editData.razorpay_payment_id || ''} onChange={e => setEditData({ ...editData, razorpay_payment_id: e.target.value })}
                                className="w-32 px-2 py-1 rounded text-xs" style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                            ) : <span className="text-xs font-mono" style={{ color: '#888' }}>{p.razorpay_payment_id?.slice(0, 18) || '—'}</span>}
                          </td>
                          <td className="py-3" style={{ color: '#888' }}>
                            <span className="text-xs">{new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          </td>
                          <td className="py-3 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => saveEdit(p.id)} className="p-1 rounded hover:bg-green-500/20"><Check size={14} style={{ color: '#16a34a' }} /></button>
                                <button onClick={() => setEditing(null)} className="p-1 rounded hover:bg-gray-500/20"><X size={14} style={{ color: '#888' }} /></button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => startEdit(p)} className="p-1 rounded hover:bg-blue-500/20"><Edit3 size={14} style={{ color: '#3b82f6' }} /></button>
                                <button onClick={() => deletePurchase(p.id)} className="p-1 rounded hover:bg-red-500/20"><Trash2 size={14} style={{ color: '#c33' }} /></button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {loading && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>Loading...</p>}
      {!loading && groups.length === 0 && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>No purchases yet</p>}
    </div>
  )
}
