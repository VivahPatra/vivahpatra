'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, User } from 'lucide-react'
import Button from './Button'
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

  if (isPreviewPage || isEditorPage || isInvitePage) return null

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ background: 'rgba(12,10,18,0.9)', borderColor: 'rgba(200,146,42,0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl tracking-wide" style={{ color: 'var(--color-accent)', letterSpacing: '0.08em' }}>
            𝒱ivah 𝒫atra
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href={isTemplatesPage ? '/' : '/templates'} className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
              {isTemplatesPage ? 'Home' : 'Templates'}
            </a>
            <a href="/#how-it-works" className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>How It Works</a>
            <a href="/#faq" className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>FAQ</a>

            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  <a href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
                    style={{ background: 'rgba(200,146,42,0.1)' }}>
                    <User size={14} style={{ color: 'var(--color-accent)' }} />
                    <span className="font-sans text-xs" style={{ color: 'var(--color-text)' }}>
                      {user.email?.split('@')[0] || user.phone || 'Profile'}
                    </span>
                  </a>
                  <button onClick={signOut} className="hover:opacity-70" title="Sign out">
                    <LogOut size={16} style={{ color: 'var(--color-muted)' }} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
                  Sign In
                </button>
              )
            )}

            <Button href="/templates">Choose Template</Button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} style={{ color: 'var(--color-text)' }} /> : <Menu size={24} style={{ color: 'var(--color-text)' }} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ background: 'var(--color-bg)', borderColor: 'rgba(200,146,42,0.15)' }}>
            <a href={isTemplatesPage ? '/' : '/templates'} className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>
              {isTemplatesPage ? 'Home' : 'Templates'}
            </a>
            <a href="/#how-it-works" className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>How It Works</a>
            <a href="/#faq" className="font-sans text-sm" style={{ color: 'var(--color-text)' }}>FAQ</a>
            {user ? (
              <div className="flex items-center justify-between">
                <a href="/profile" className="font-sans text-sm" style={{ color: 'var(--color-accent)' }}>My Profile</a>
                <button onClick={signOut} className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>Sign Out</button>
              </div>
            ) : (
              <button onClick={() => { setAuthOpen(true); setMenuOpen(false) }} className="font-sans text-sm text-left" style={{ color: 'var(--color-muted)' }}>Sign In</button>
            )}
            <Button href="/templates" fullWidth>Choose Template</Button>
          </div>
        )}
      </nav>

      <SignInModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
