'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, User, ShoppingBag } from 'lucide-react'
import { useUser } from '@/components/auth/AuthProvider'
import SignInModal from '@/components/auth/SignInModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { user, loading, signOut } = useUser()
  const pathname = usePathname()
  const isTemplatesPage = pathname === '/templates'
  const isPreviewPage = pathname.startsWith('/preview')
  const isEditorPage = pathname.startsWith('/editor')
  const isInvitePage = pathname.startsWith('/invite')

  const isAdminPage = pathname.startsWith('/admin')

  if (isPreviewPage || isEditorPage || isInvitePage || isAdminPage) return null

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(255,255,255,0.92)', borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" className="font-display text-xl tracking-wide" style={{ color: '#1a1a1a', letterSpacing: '0.06em' }}>
            𝒱ivah 𝒫atra
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href={isTemplatesPage ? '/' : '/templates'} className="font-sans text-sm hover:text-black transition-colors" style={{ color: '#555' }}>
              {isTemplatesPage ? 'Home' : 'Templates'}
            </a>
            <a href="/#how-it-works" className="font-sans text-sm hover:text-black transition-colors" style={{ color: '#555' }}>How It Works</a>
            <a href="/#faq" className="font-sans text-sm hover:text-black transition-colors" style={{ color: '#555' }}>FAQ</a>

            {!loading && (
              user ? (
                <div className="flex items-center gap-2">
                  <a href="/profile" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                    <User size={14} style={{ color: '#555' }} />
                    <span className="font-sans text-xs" style={{ color: '#333' }}>
                      {user.email?.split('@')[0] || user.phone || 'Profile'}
                    </span>
                  </a>
                  <button onClick={signOut} className="hover:opacity-70" title="Sign out">
                    <LogOut size={14} style={{ color: '#999' }} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="font-sans text-sm hover:text-black transition-colors" style={{ color: '#555' }}>
                  Sign In
                </button>
              )
            )}

            <a href="/templates" className="flex items-center gap-2 px-5 py-2 rounded-full font-sans text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ background: '#e8384f' }}>
              <ShoppingBag size={14} /> Shop Templates
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} style={{ color: '#1a1a1a' }} /> : <Menu size={24} style={{ color: '#1a1a1a' }} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ background: '#fff', borderColor: 'rgba(0,0,0,0.06)' }}>
            <a href={isTemplatesPage ? '/' : '/templates'} className="font-sans text-sm" style={{ color: '#333' }}>
              {isTemplatesPage ? 'Home' : 'Templates'}
            </a>
            <a href="/#how-it-works" className="font-sans text-sm" style={{ color: '#333' }}>How It Works</a>
            <a href="/#faq" className="font-sans text-sm" style={{ color: '#333' }}>FAQ</a>
            {user ? (
              <div className="flex items-center justify-between">
                <a href="/profile" className="font-sans text-sm" style={{ color: '#e8384f' }}>My Profile</a>
                <button onClick={signOut} className="font-sans text-xs" style={{ color: '#999' }}>Sign Out</button>
              </div>
            ) : (
              <button onClick={() => { setAuthOpen(true); setMenuOpen(false) }} className="font-sans text-sm text-left" style={{ color: '#555' }}>Sign In</button>
            )}
            <a href="/templates" className="w-full text-center px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-white" style={{ background: '#e8384f' }}>
              Shop Templates
            </a>
          </div>
        )}
      </nav>

      <SignInModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
