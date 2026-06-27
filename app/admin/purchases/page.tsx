'use client'
import { useEffect, useState } from 'react'
import { Trash2, Edit3, X, Check } from 'lucide-react'
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

export default function AdminPurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [editAmount, setEditAmount] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.from('purchases').select('*').order('created_at', { ascending: false }).then(({ data }: { data: Purchase[] | null }) => {
      if (data) setPurchases(data)
    })
  }, [])

  const deletePurchase = async (id: string) => {
    if (!confirm('Delete this purchase record? This cannot be undone.')) return
    const supabase = createClient()
    if (!supabase) return
    await supabase.from('purchases').delete().eq('id', id)
    setPurchases(prev => prev.filter(p => p.id !== id))
  }

  const saveEdit = async (id: string) => {
    const supabase = createClient()
    if (!supabase) return
    await supabase.from('purchases').update({ amount: editAmount }).eq('id', id)
    setPurchases(prev => prev.map(p => p.id === id ? { ...p, amount: editAmount } : p))
    setEditing(null)
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl mb-1">Purchases</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>{purchases.length} total purchases</p>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <table className="w-full font-sans text-sm">
          <thead>
            <tr style={{ background: '#141414', color: '#666' }}>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Template</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Amount</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Razorpay Order</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Date</th>
              <th className="text-right px-4 py-3 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(p => {
              const t = TEMPLATES.find(t => t.id === p.template_id)
              return (
                <tr key={p.id} style={{ borderTop: '1px solid #222' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded" style={{ background: t?.color || '#555' }} />
                      <span>{t?.name || p.template_id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {editing === p.id ? (
                      <input type="number" value={editAmount} onChange={e => setEditAmount(Number(e.target.value))}
                        className="w-24 px-2 py-1 rounded text-sm" style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                    ) : (
                      <span>₹{p.amount}</span>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: '#888' }}>
                    <span className="text-xs font-mono">{p.razorpay_order_id?.slice(0, 20) || '—'}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#888' }}>
                    {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editing === p.id ? (
                        <>
                          <button onClick={() => saveEdit(p.id)} className="p-1 rounded hover:bg-green-500/20"><Check size={14} style={{ color: '#16a34a' }} /></button>
                          <button onClick={() => setEditing(null)} className="p-1 rounded hover:bg-gray-500/20"><X size={14} style={{ color: '#888' }} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditing(p.id); setEditAmount(p.amount) }} className="p-1 rounded hover:bg-blue-500/20"><Edit3 size={14} style={{ color: '#3b82f6' }} /></button>
                          <button onClick={() => deletePurchase(p.id)} className="p-1 rounded hover:bg-red-500/20"><Trash2 size={14} style={{ color: '#c33' }} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {purchases.length === 0 && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>No purchases</p>}
      </div>
    </div>
  )
}
