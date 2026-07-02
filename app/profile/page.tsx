'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, ExternalLink, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { useUser } from '@/components/auth/AuthProvider'
import { TEMPLATES } from '@/lib/templates'
import { getUserPurchases } from '@/lib/purchases'
import { createClient } from '@/lib/supabase'
import Button from '@/components/shared/Button'
import Footer from '@/components/shared/Footer'

interface ProfileInstance {
  instanceId: string
  groomName: string
  brideName: string
  updatedAt: string
}

interface PurchaseEntry {
  templateId: string
  templateName: string
  templateColor: string
  instances: ProfileInstance[]
}

interface RsvpRow {
  id: string
  invite_slug: string
  guest_name: string
  guest_count: number
  created_at: string
}

interface InviteRsvp {
  slug: string
  groomName?: string
  brideName?: string
  templateName: string
  rsvps: RsvpRow[]
  totalGuests: number
}

export default function ProfilePage() {
  const { user, loading, signOut } = useUser()
  const router = useRouter()
  const [purchases, setPurchases] = useState<PurchaseEntry[]>([])
  const [inviteRsvps, setInviteRsvps] = useState<InviteRsvp[]>([])
  const [rsvpLoading, setRsvpLoading] = useState(true)
  const [rsvpError, setRsvpError] = useState('')
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.replace('/')
  }, [user, loading, router])

  useEffect(() => {
    if (!user?.id) return
    getUserPurchases(user.id).then(pList => {
      const entries: PurchaseEntry[] = []
      for (const p of pList) {
        const t = TEMPLATES.find(t => t.id === p.templateId)
        if (!t) continue
        let entry = entries.find(e => e.templateId === p.templateId)
        if (!entry) {
          entry = { templateId: p.templateId, templateName: t.name, templateColor: t.color, instances: [] }
          entries.push(entry)
        }
        entry.instances.push({ instanceId: p.instanceId, groomName: '', brideName: '', updatedAt: p.createdAt })
      }
      setPurchases(entries)
    })
  }, [user])

  useEffect(() => {
    if (!user?.id) return
    async function loadRsvps() {
      setRsvpLoading(true)
      setRsvpError('')
      try {
        const supabase = createClient()
        if (!supabase) { setRsvpError('DB not configured'); setRsvpLoading(false); return }

        const { data: invites, error: invErr } = await supabase
          .from('published_invites')
          .select('slug, template_id, data')
          .eq('user_id', user!.id)

        if (invErr) { setRsvpError(invErr.message); setRsvpLoading(false); return }

        if (!invites?.length) { setInviteRsvps([]); setRsvpLoading(false); return }

        const slugs = invites.map((i: { slug: string }) => i.slug)
        const { data: rsvpRows, error: rsvpErr } = await supabase
          .from('rsvps')
          .select('*')
          .in('invite_slug', slugs)
          .order('created_at', { ascending: false })

        if (rsvpErr) { setRsvpError('rsvps table missing — run the SQL in Supabase: ' + rsvpErr.message); setRsvpLoading(false); return }

        const rows = (rsvpRows || []) as RsvpRow[]

        const result: InviteRsvp[] = invites.map((inv: { slug: string; template_id: string; data: Record<string, string> }) => {
          const t = TEMPLATES.find(t => t.id === inv.template_id)
          const invRsvps = rows.filter(r => r.invite_slug === inv.slug)
          return {
            slug: inv.slug,
            groomName: inv.data?.groomName,
            brideName: inv.data?.brideName,
            templateName: t?.name || inv.template_id,
            rsvps: invRsvps,
            totalGuests: invRsvps.reduce((s, r) => s + r.guest_count, 0),
          }
        })

        setInviteRsvps(result)
      } catch (e: unknown) {
        setRsvpError(e instanceof Error ? e.message : 'Unknown error')
      }
      setRsvpLoading(false)
    }
    loadRsvps()
  }, [user])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>
  if (!user) return null

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Profile header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(232,56,79,0.1)', border: '2px solid #e8384f' }}>
            {user.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={32} style={{ color: '#e8384f' }} />
            )}
          </div>
          <h1 className="font-display text-2xl mb-1">{user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}</h1>
          <p className="font-sans text-sm" style={{ color: '#999' }}>Member since {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </motion.div>

        {/* User info */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #eee', background: '#fafafa' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-lg mb-4">Account Details</h2>
          <div className="flex flex-col gap-3">
            {user.email && (
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#e8384f' }} />
                <span className="font-sans text-sm">{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#e8384f' }} />
                <span className="font-sans text-sm">{user.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar size={16} style={{ color: '#e8384f' }} />
              <span className="font-sans text-sm">Joined {new Date(user.created_at).toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </motion.div>

        {/* RSVP Responses */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #eee', background: '#fafafa' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-5">
            <Users size={18} style={{ color: '#e8384f' }} />
            <h2 className="font-display text-lg">RSVP Responses</h2>
          </div>

          {rsvpLoading && <p className="font-sans text-sm text-center py-4" style={{ color: '#bbb' }}>Loading...</p>}

          {rsvpError && (
            <div className="rounded-lg px-4 py-3 font-sans text-xs" style={{ background: '#fff5f5', color: '#c33', border: '1px solid #fcc' }}>
              {rsvpError}
            </div>
          )}

          {!rsvpLoading && !rsvpError && inviteRsvps.length === 0 && (
            <p className="font-sans text-sm text-center py-4" style={{ color: '#bbb' }}>
              No RSVP responses yet. Share your invite link with guests.
            </p>
          )}

          {!rsvpLoading && !rsvpError && inviteRsvps.length > 0 && (
            <div className="flex flex-col gap-3">
              {inviteRsvps.map(inv => (
                <div key={inv.slug} className="rounded-xl overflow-hidden" style={{ border: '1px solid #eee' }}>
                  {/* Invite header */}
                  <button
                    onClick={() => setExpandedSlug(expandedSlug === inv.slug ? null : inv.slug)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="text-left">
                      <p className="font-sans text-sm font-semibold">
                        {inv.groomName && inv.brideName ? `${inv.groomName} & ${inv.brideName}` : inv.templateName}
                      </p>
                      <p className="font-sans text-xs" style={{ color: '#999' }}>
                        {inv.rsvps.length} {inv.rsvps.length === 1 ? 'response' : 'responses'} · {inv.totalGuests} guests attending
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-xs px-3 py-1 rounded-full font-semibold"
                        style={{ background: 'rgba(232,56,79,0.1)', color: '#e8384f' }}>
                        {inv.totalGuests} guests
                      </span>
                      {expandedSlug === inv.slug ? <ChevronUp size={15} style={{ color: '#bbb' }} /> : <ChevronDown size={15} style={{ color: '#bbb' }} />}
                    </div>
                  </button>

                  {/* RSVP list */}
                  {expandedSlug === inv.slug && (
                    <div className="border-t" style={{ borderColor: '#f0f0f0' }}>
                      <table className="w-full font-sans text-sm">
                        <thead>
                          <tr style={{ background: '#f8f8f8' }}>
                            <th className="text-left px-4 py-2 text-xs uppercase tracking-wider" style={{ color: '#aaa' }}>Guest Name</th>
                            <th className="text-center px-4 py-2 text-xs uppercase tracking-wider" style={{ color: '#aaa' }}>Guests</th>
                            <th className="text-right px-4 py-2 text-xs uppercase tracking-wider" style={{ color: '#aaa' }}>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inv.rsvps.map(r => (
                            <tr key={r.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                              <td className="px-4 py-2.5 font-medium">{r.guest_name}</td>
                              <td className="px-4 py-2.5 text-center">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                                  style={{ background: 'rgba(232,56,79,0.08)', color: '#e8384f' }}>
                                  <Users size={10} /> {r.guest_count}
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-right text-xs" style={{ color: '#bbb' }}>
                                {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ background: '#f8f8f8', borderTop: '1px solid #eee' }}>
                            <td className="px-4 py-2 text-xs font-semibold" style={{ color: '#666' }}>Total</td>
                            <td className="px-4 py-2 text-center text-xs font-bold" style={{ color: '#e8384f' }}>{inv.totalGuests}</td>
                            <td />
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Purchase History */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #eee', background: '#fafafa' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-lg mb-4">Purchase History</h2>
          {purchases.length > 0 ? (
            <div className="flex flex-col gap-3">
              {purchases.map(p => (
                <div key={p.templateId}>
                  {p.instances.map(inst => (
                    <div key={inst.instanceId} className="flex items-center justify-between p-4 rounded-xl mb-2"
                      style={{ border: '1px solid #eee' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: p.templateColor }}>
                          <span className="text-white text-xs font-bold">{p.templateName[0]}</span>
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold">
                            {inst.groomName && inst.brideName ? `${inst.groomName} & ${inst.brideName}` : p.templateName}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-xs" style={{ color: '#999' }}>{p.templateName}</span>
                            <span className="font-sans text-xs flex items-center gap-1" style={{ color: '#bbb' }}>
                              <Clock size={10} /> {new Date(inst.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a href={`/editor/${p.templateId}?inst=${inst.instanceId}`}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full font-sans text-xs font-semibold"
                        style={{ background: 'rgba(232,56,79,0.1)', color: '#e8384f' }}>
                        Edit <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-sans text-sm mb-4" style={{ color: '#999' }}>No purchases yet.</p>
              <Button href="/templates">Browse Templates</Button>
            </div>
          )}
        </motion.div>

        {/* Sign out */}
        <div className="text-center">
          <button onClick={() => { signOut(); router.push('/') }}
            className="font-sans text-sm hover:opacity-70" style={{ color: '#999' }}>
            Sign Out
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
