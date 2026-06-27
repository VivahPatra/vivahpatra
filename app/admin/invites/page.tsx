'use client'
import { useEffect, useState } from 'react'
import { ExternalLink, Trash2 } from 'lucide-react'
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

export default function AdminInvites() {
  const [invites, setInvites] = useState<Invite[]>([])

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.from('published_invites').select('*').order('created_at', { ascending: false }).then(({ data }: { data: Invite[] | null }) => {
      if (data) setInvites(data)
    })
  }, [])

  const deleteInvite = async (id: string) => {
    if (!confirm('Delete this published invite? The link will stop working.')) return
    const supabase = createClient()
    if (!supabase) return
    await supabase.from('published_invites').delete().eq('id', id)
    setInvites(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl mb-1">Published Invites</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>{invites.length} published invitations</p>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
        <table className="w-full font-sans text-sm">
          <thead>
            <tr style={{ background: '#141414', color: '#666' }}>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Slug</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Template</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Published</th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider">Updated</th>
              <th className="text-right px-4 py-3 text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invites.map(inv => {
              const t = TEMPLATES.find(t => t.id === inv.template_id)
              return (
                <tr key={inv.id} style={{ borderTop: '1px solid #222' }}>
                  <td className="px-4 py-3">
                    <a href={`/invite/${inv.slug}`} target="_blank" className="flex items-center gap-1 hover:text-white" style={{ color: '#e8384f' }}>
                      {inv.slug} <ExternalLink size={12} />
                    </a>
                  </td>
                  <td className="px-4 py-3">{t?.name || inv.template_id}</td>
                  <td className="px-4 py-3" style={{ color: '#888' }}>
                    {new Date(inv.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3" style={{ color: '#888' }}>
                    {new Date(inv.updated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => deleteInvite(inv.id)} className="p-1 rounded hover:bg-red-500/20"><Trash2 size={14} style={{ color: '#c33' }} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {invites.length === 0 && <p className="text-center py-8 text-sm" style={{ color: '#666' }}>No published invites</p>}
      </div>
    </div>
  )
}
