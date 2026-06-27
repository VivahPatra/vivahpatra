'use client'
import { useEffect, useState } from 'react'
import { Search, ShoppingBag, Mail, Phone, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface UserProfile {
  id: string
  email: string
  phone: string | null
  full_name: string | null
  created_at: string
  last_sign_in_at: string | null
  purchaseCount: number
  totalSpent: number
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return

    Promise.all([
      supabase.from('user_profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('purchases').select('user_id, amount'),
    ]).then(([profilesRes, purchasesRes]) => {
      const profiles = (profilesRes.data || []) as { id: string; email: string; phone: string | null; full_name: string | null; created_at: string; last_sign_in_at: string | null }[]
      const purchases = (purchasesRes.data || []) as { user_id: string; amount: number }[]

      const merged: UserProfile[] = profiles.map(p => {
        const userPurchases = purchases.filter(pu => pu.user_id === p.id)
        return {
          ...p,
          purchaseCount: userPurchases.length,
          totalSpent: userPurchases.reduce((sum, pu) => sum + pu.amount, 0),
        }
      })
      setUsers(merged)
      setLoading(false)
    })
  }, [])

  const filtered = search
    ? users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()) || u.full_name?.toLowerCase().includes(search.toLowerCase()) || u.phone?.includes(search))
    : users

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl mb-1">Users</h1>
          <p className="font-sans text-sm" style={{ color: '#666' }}>{users.length} registered users</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <Search size={14} style={{ color: '#666' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone..."
            className="bg-transparent outline-none text-sm w-56" style={{ color: '#e0e0e0' }} />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <table className="w-full font-sans text-sm">
          <thead>
            <tr style={{ background: '#141414', color: '#666' }}>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">User</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Contact</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Purchases</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Spent</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Joined</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #222' }}>
                <td className="px-4 py-3">
                  <p className="font-semibold">{u.full_name || u.email?.split('@')[0] || '—'}</p>
                  <p className="text-xs font-mono" style={{ color: '#666' }}>{u.id.slice(0, 12)}...</p>
                </td>
                <td className="px-4 py-3">
                  {u.email && <div className="flex items-center gap-1 text-xs mb-0.5"><Mail size={10} style={{ color: '#888' }} />{u.email}</div>}
                  {u.phone && <div className="flex items-center gap-1 text-xs"><Phone size={10} style={{ color: '#888' }} />{u.phone}</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <ShoppingBag size={12} style={{ color: '#e8384f' }} />
                    <span>{u.purchaseCount}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: u.totalSpent > 0 ? '#16a34a' : '#666' }}>
                  {u.totalSpent > 0 ? `₹${u.totalSpent.toLocaleString()}` : '—'}
                </td>
                <td className="px-4 py-3" style={{ color: '#888' }}>
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar size={10} />
                    {new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: '#888' }}>
                  <span className="text-xs">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>Loading users...</p>}
        {!loading && filtered.length === 0 && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>No users found</p>}
      </div>
    </div>
  )
}
