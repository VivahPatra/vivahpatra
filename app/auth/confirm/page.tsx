'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ConfirmPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'error'>('loading')

  useEffect(() => {
    const token_hash = params.get('token_hash')
    const type = params.get('type') as 'email' | 'recovery' | null

    if (!token_hash || !type) { setStatus('error'); return }

    const supabase = createClient()
    if (!supabase) { setStatus('error'); return }

    supabase.auth.verifyOtp({ token_hash, type }).then(({ error }) => {
      if (error) { setStatus('error'); return }
      // Success — redirect to callback which sends welcome email
      router.replace('/auth/callback')
    })
  }, [params, router])

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <p className="font-display text-2xl mb-3">Link expired</p>
          <p className="font-sans text-sm mb-6" style={{ color: '#666' }}>This confirmation link has expired or is invalid. Please sign up again.</p>
          <a href="/" className="px-6 py-3 rounded-full font-sans text-sm font-semibold text-white" style={{ background: '#e8384f' }}>Go Home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4" />
        <p className="font-sans text-sm" style={{ color: '#666' }}>Confirming your account...</p>
      </div>
    </div>
  )
}
