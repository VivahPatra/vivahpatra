'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, ExternalLink, Clock } from 'lucide-react'
import { useUser } from '@/components/auth/AuthProvider'
import { TEMPLATES } from '@/lib/templates'
import { getUserPurchases } from '@/lib/purchases'
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

export default function ProfilePage() {
  const { user, loading, signOut } = useUser()
  const router = useRouter()
  const [purchases, setPurchases] = useState<PurchaseEntry[]>([])

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

        {/* Purchase History */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid #eee', background: '#fafafa' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
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
