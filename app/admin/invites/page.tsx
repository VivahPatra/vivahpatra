'use client'
import { useEffect, useState } from 'react'
import { ExternalLink, Trash2, Edit3, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { TEMPLATES } from '@/lib/templates'

interface Invite {
  id: string
  slug: string
  template_id: string
  user_id: string
  instance_id: string
  created_at: string
  updated_at: string
}

interface UserInvites {
  userId: string
  email: string
  invites: Invite[]
}

export default function AdminInvites() {
  const [groups, setGroups] = useState<UserInvites[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editing, setEditing] = useState<string | null>(null)
  const [editSlug, setEditSlug] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const supabase = createClient()
    if (!supabase) return

    const [invitesRes, profilesRes] = await Promise.all([
      supabase.from('published_invites').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, email'),
    ])

    const invites = (invitesRes.data || []) as Invite[]
    const profiles = (profilesRes.data || []) as { id: string; email: string }[]

    const userMap = new Map<string, UserInvites>()
    for (const inv of invites) {
      if (!userMap.has(inv.user_id)) {
        const profile = profiles.find(p => p.id === inv.user_id)
        userMap.set(inv.user_id, { userId: inv.user_id, email: profile?.email || inv.user_id.slice(0, 12), invites: [] })
      }
      userMap.get(inv.user_id)!.invites.push(inv)
    }

    setGroups(Array.from(userMap.values()))
    setLoading(false)
  }

  const saveSlug = async (id: string) => {
    const supabase = createClient()
    if (!supabase) return
    const { error } = await supabase.from('published_invites').update({ slug: editSlug }).eq('id', id)
    if (error) { alert('Update failed: ' + error.message); return }
    setEditing(null)
    loadData()
  }

  const deleteInvite = async (id: string) => {
    if (!confirm('Delete this invite? The link will stop working.')) return
    const supabase = createClient()
    if (!supabase) return
    const { error } = await supabase.from('published_invites').delete().eq('id', id)
    if (error) { alert('Delete failed: ' + error.message); return }
    loadData()
  }

  const totalInvites = groups.reduce((s, g) => s + g.invites.length, 0)

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl mb-1">Published Invites</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>{totalInvites} published invitations</p>
      </div>

      <div className="space-y-3">
        {groups.map(group => (
          <div key={group.userId} className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
            <button onClick={() => setExpanded(expanded === group.userId ? null : group.userId)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#c8922a', color: '#fff' }}>
                  {group.email[0]?.toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="font-sans text-sm font-semibold">{group.email}</p>
                  <p className="font-sans text-xs" style={{ color: '#666' }}>{group.invites.length} invite{group.invites.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              {expanded === group.userId ? <ChevronUp size={16} style={{ color: '#888' }} /> : <ChevronDown size={16} style={{ color: '#888' }} />}
            </button>

            {expanded === group.userId && (
              <div className="px-5 pb-4">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr style={{ color: '#666' }}>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Slug / Link</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Template</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Published</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider">Updated</th>
                      <th className="text-right py-2 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.invites.map(inv => {
                      const t = TEMPLATES.find(t => t.id === inv.template_id)
                      const isEditing = editing === inv.id
                      return (
                        <tr key={inv.id} style={{ borderTop: '1px solid #222' }}>
                          <td className="py-3">
                            {isEditing ? (
                              <input value={editSlug} onChange={e => setEditSlug(e.target.value)}
                                className="w-48 px-2 py-1 rounded text-xs" style={{ background: '#222', color: '#fff', border: '1px solid #444' }} />
                            ) : (
                              <a href={`/invite/${inv.slug}`} target="_blank" className="flex items-center gap-1 hover:text-white text-xs" style={{ color: '#e8384f' }}>
                                /invite/{inv.slug} <ExternalLink size={10} />
                              </a>
                            )}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded" style={{ background: t?.color || '#555' }} />
                              <span className="text-xs">{t?.name || inv.template_id}</span>
                            </div>
                          </td>
                          <td className="py-3 text-xs" style={{ color: '#888' }}>
                            {new Date(inv.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-3 text-xs" style={{ color: '#888' }}>
                            {new Date(inv.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-3 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => saveSlug(inv.id)} className="p-1 rounded hover:bg-green-500/20"><Check size={14} style={{ color: '#16a34a' }} /></button>
                                <button onClick={() => setEditing(null)} className="p-1 rounded hover:bg-gray-500/20"><X size={14} style={{ color: '#888' }} /></button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => { setEditing(inv.id); setEditSlug(inv.slug) }} className="p-1 rounded hover:bg-blue-500/20"><Edit3 size={14} style={{ color: '#3b82f6' }} /></button>
                                <button onClick={() => deleteInvite(inv.id)} className="p-1 rounded hover:bg-red-500/20"><Trash2 size={14} style={{ color: '#c33' }} /></button>
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
      {!loading && groups.length === 0 && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>No published invites</p>}
    </div>
  )
}
