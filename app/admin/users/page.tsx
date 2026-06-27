'use client'
import { useEffect, useState } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface UserData {
  userId: string
  email: string
  purchaseCount: number
  totalSpent: number
  lastPurchase: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.from('purchases').select('user_id, amount, created_at').order('created_at', { ascending: false }).then(({ data }: { data: { user_id: string; amount: number; created_at: string }[] | null }) => {
      if (!data) return
      const userMap = new Map<string, UserData>()
      for (const p of data) {
        const existing = userMap.get(p.user_id)
        if (existing) {
          existing.purchaseCount++
          existing.totalSpent += p.amount
        } else {
          userMap.set(p.user_id, {
            userId: p.user_id,
            email: p.user_id.slice(0, 8) + '...',
            purchaseCount: 1,
            totalSpent: p.amount,
            lastPurchase: p.created_at,
          })
        }
      }
      setUsers(Array.from(userMap.values()))
    })
  }, [])

  const filtered = search ? users.filter(u => u.userId.includes(search) || u.email.includes(search)) : users

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl mb-1">Users</h1>
          <p className="font-sans text-sm" style={{ color: '#666' }}>{users.length} users with purchases</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <Search size={14} style={{ color: '#666' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user ID..."
            className="bg-transparent outline-none text-sm w-48" style={{ color: '#e0e0e0' }} />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <table className="w-full font-sans text-sm">
          <thead>
            <tr style={{ background: '#141414', color: '#666' }}>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">User ID</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Purchases</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Total Spent</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Last Purchase</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.userId} style={{ borderTop: '1px solid #222' }}>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs">{u.userId}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <ShoppingBag size={12} style={{ color: '#e8384f' }} />
                    <span>{u.purchaseCount}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: '#16a34a' }}>₹{u.totalSpent.toLocaleString()}</td>
                <td className="px-4 py-3" style={{ color: '#888' }}>
                  {new Date(u.lastPurchase).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>No users found</p>}
      </div>
    </div>
  )
}
