'use client'
import { useEffect, useState } from 'react'
import { Search, ShoppingBag, Mail, Phone, Calendar, Edit3, Check, X } from 'lucide-react'
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
  const [editing, setEditing] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editPhone, setEditPhone] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const supabase = createClient()
    if (!supabase) return

    const [authProfilesRes, customProfilesRes, purchasesRes] = await Promise.all([
      supabase.from('user_profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*'),
      supabase.from('purchases').select('user_id, amount'),
    ])

    const authProfiles = (authProfilesRes.data || []) as { id: string; email: string; phone: string | null; full_name: string | null; created_at: string; last_sign_in_at: string | null }[]
    const customProfiles = (customProfilesRes.data || []) as { id: string; name?: string; email?: string; mobile?: string; dob?: string; gender?: string; created_at?: string }[]
    const purchases = (purchasesRes.data || []) as { user_id: string; amount: number }[]

    // Build map of custom profiles by id
    const customMap = new Map(customProfiles.map(p => [p.id, p]))

    // Merge: start from auth_profiles, overlay with custom profile data where exists
    // Also include custom profiles not yet in auth_profiles (shouldn't happen, but safety)
    const merged = authProfiles.map(p => {
      const cp = customMap.get(p.id)
      return {
        id: p.id,
        email: p.email || cp?.email || '',
        phone: cp?.mobile || p.phone || null,
        full_name: cp?.name || p.full_name || null,
        created_at: p.created_at,
        last_sign_in_at: p.last_sign_in_at,
        purchaseCount: purchases.filter(pu => pu.user_id === p.id).length,
        totalSpent: purchases.filter(pu => pu.user_id === p.id).reduce((sum, pu) => sum + pu.amount, 0),
      }
    })

    setUsers(merged)
    setLoading(false)
  }

  const startEdit = (u: UserProfile) => {
    setEditing(u.id)
    setEditName(u.full_name || '')
    setEditPhone(u.phone || '')
  }

  const saveEdit = async (id: string) => {
    const supabase = createClient()
    if (!supabase) return
    // Update auth user metadata via admin function
    // Since we can't update auth.users directly from client, update a custom profile
    // For now, store edits in user_templates or a profiles table
    // The user_profiles is a VIEW (read-only), so we note this limitation
    alert('User profile edits require Supabase Admin API. Use Supabase Dashboard → Authentication → Users to edit directly.')
    setEditing(null)
  }

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

      <div className="rounded-xl overflow-x-auto" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <table className="w-full font-sans text-sm">
          <thead>
            <tr style={{ background: '#141414', color: '#666' }}>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">User</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Contact</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Purchases</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Spent</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Joined</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Last Login</th>
              <th className="text-right px-4 py-3 text-xs uppercase tracking-wider">Actions</th>
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
                  <span className="text-xs">{u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <a href={`https://supabase.com/dashboard/project/uipzkfuilpscfbtolkjf/auth/users`} target="_blank"
                    className="p-1 rounded hover:bg-blue-500/20 inline-block" title="Edit in Supabase Auth">
                    <Edit3 size={14} style={{ color: '#3b82f6' }} />
                  </a>
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
