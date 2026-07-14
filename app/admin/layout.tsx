'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/components/auth/AuthProvider'
import { LayoutDashboard, Users, ShoppingBag, Link2, BarChart3, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

const ADMIN_EMAIL = 'pr@vivahpatra.co'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Purchases', href: '/admin/purchases', icon: ShoppingBag },
  { label: 'Invites', href: '/admin/invites', icon: Link2 },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (loading) return
    if (!user) { router.replace('/'); return }
    if (user.email?.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase()) { router.replace('/'); return }
    setAuthorized(true)
  }, [user, loading, router])

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f0f' }}>
        <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0f0f0f', color: '#e0e0e0' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col border-r" style={{ background: '#141414', borderColor: '#222' }}>
        <div className="px-5 py-5">
          <h1 className="font-display text-lg" style={{ color: '#e8384f' }}>𝒱𝒫 Admin</h1>
          <p className="font-sans text-[10px] mt-1" style={{ color: '#666' }}>{user?.email}</p>
        </div>
        <nav className="flex-1 px-3">
          {NAV.map(item => {
            const active = pathname === item.href
            return (
              <a key={item.href} href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-sans transition-colors"
                style={{ background: active ? 'rgba(232,56,79,0.1)' : 'transparent', color: active ? '#e8384f' : '#888' }}>
                <item.icon size={16} />
                {item.label}
              </a>
            )
          })}
        </nav>
        <div className="px-5 py-4 border-t" style={{ borderColor: '#222' }}>
          <a href="/" className="font-sans text-xs hover:text-white transition-colors" style={{ color: '#666' }}>← Back to Site</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
