'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(async ({ data }: { data: { session: { user: { id: string; email?: string; user_metadata?: Record<string, string> } } | null } }) => {
      const user = data.session?.user
      if (user) {
        // Upsert profile for Google OAuth users
        const name = user.user_metadata?.full_name || user.user_metadata?.name || ''
        await supabase.from('profiles').upsert({
          id: user.id,
          name,
          email: user.email,
          created_at: new Date().toISOString(),
        }, { onConflict: 'id', ignoreDuplicates: false })

        // Send welcome email only on first login
        if (user.email && !localStorage.getItem(`welcomed-${user.id}`)) {
          localStorage.setItem(`welcomed-${user.id}`, '1')
          fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'welcome', to: user.email }),
          }).catch(() => {})
        }
      }
      router.replace('/templates')
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4" />
        <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>Signing you in...</p>
      </div>
    </div>
  )
}
