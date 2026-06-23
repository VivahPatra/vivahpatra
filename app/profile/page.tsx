'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, ExternalLink } from 'lucide-react'
import { useUser } from '@/components/auth/AuthProvider'
import { TEMPLATES } from '@/lib/templates'
import Button from '@/components/shared/Button'
import Footer from '@/components/shared/Footer'

export default function ProfilePage() {
  const { user, loading, signOut } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/')
  }, [user, loading, router])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" /></div>
  if (!user) return null

  // Check localStorage for purchased/edited templates
  const editedTemplates = TEMPLATES.filter(t => {
    const saved = localStorage.getItem(`editor-${t.id}`)
    return saved !== null
  })

  return (
    <>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Profile header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(200,146,42,0.1)', border: '2px solid var(--color-accent)' }}>
            {user.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={32} style={{ color: 'var(--color-accent)' }} />
            )}
          </div>
          <h1 className="font-display text-2xl mb-1">{user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}</h1>
          <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>Member since {new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </motion.div>

        {/* User info */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-lg mb-4">Account Details</h2>
          <div className="flex flex-col gap-3">
            {user.email && (
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: 'var(--color-accent)' }} />
                <span className="font-sans text-sm">{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: 'var(--color-accent)' }} />
                <span className="font-sans text-sm">{user.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar size={16} style={{ color: 'var(--color-accent)' }} />
              <span className="font-sans text-sm">Joined {new Date(user.created_at).toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        </motion.div>

        {/* My templates */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display text-lg mb-4">My Templates</h2>
          {editedTemplates.length > 0 ? (
            <div className="flex flex-col gap-3">
              {editedTemplates.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 rounded-xl"
                  style={{ border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: t.color }}>
                      <span className="text-white text-xs font-bold">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-semibold">{t.name}</p>
                      <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>{t.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`/editor/${t.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-full font-sans text-xs font-semibold"
                      style={{ background: 'rgba(200,146,42,0.1)', color: 'var(--color-accent)' }}>
                      Edit <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="font-sans text-sm mb-4" style={{ color: 'var(--color-muted)' }}>You haven&apos;t purchased any templates yet.</p>
              <Button href="/templates">Browse Templates</Button>
            </div>
          )}
        </motion.div>

        {/* Purchase history placeholder */}
        <motion.div className="rounded-2xl p-6 mb-8"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-lg mb-4">Purchase History</h2>
          <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
            Purchase history will be available once connected to the database.
          </p>
        </motion.div>

        {/* Sign out */}
        <div className="text-center">
          <button onClick={() => { signOut(); router.push('/') }}
            className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
            Sign Out
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}
