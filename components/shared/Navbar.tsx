'use client'
import { useState } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'
import Button from './Button'
import { useUser } from '@/components/auth/AuthProvider'
import SignInModal from '@/components/auth/SignInModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { user, loading, signOut } = useUser()

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b" style={{ background: 'rgba(250,249,246,0.9)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-xl" style={{ color: 'var(--color-accent)' }}>
            Vivah Patra
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/templates" className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>Templates</a>
            <a href="/#how-it-works" className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>How It Works</a>
            <a href="/#faq" className="font-sans text-sm hover:opacity-70" style={{ color: 'var(--color-muted)' }}>FAQ</a>

            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(200,146,42,0.08)' }}>
                    <User size={14} style={{ color: 'var(--color-accent)' }} />
                    <span className="font-sans text-xs" style={{ color: 'var(--color-text)' }}>
                      {user.email?.split('@')[0] || user.phone || 'User'}
                    </span>
                  </div>
                  <button onClick={signOut} className="hover:opacity-70" title="Sign out">
                    <LogOut size={16} style={{ color: 'var(--color-muted)' }} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="font-sans text-sm font-semibold hover:opacity-70" style={{ color: 'var(--color-text)' }}>
                  Sign In
                </button>
              )
            )}

            <Button href="/templates">Choose Template</Button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <a href="/templates" className="font-sans text-sm">Templates</a>
            <a href="/#how-it-works" className="font-sans text-sm">How It Works</a>
            <a href="/#faq" className="font-sans text-sm">FAQ</a>
            {user ? (
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm">{user.email?.split('@')[0] || user.phone || 'User'}</span>
                <button onClick={signOut} className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>Sign Out</button>
              </div>
            ) : (
              <button onClick={() => { setAuthOpen(true); setMenuOpen(false) }} className="font-sans text-sm font-semibold text-left">Sign In</button>
            )}
            <Button href="/templates" fullWidth>Choose Template</Button>
          </div>
        )}
      </nav>

      <SignInModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
