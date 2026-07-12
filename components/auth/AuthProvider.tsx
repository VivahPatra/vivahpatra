'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

interface AuthContext {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  configured: boolean
}

const AuthCtx = createContext<AuthContext>({ user: null, loading: false, signOut: async () => {}, configured: false })

export function useUser() {
  return useContext(AuthCtx)
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) { setLoading(false); return }

    const supabase = createClient()
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: { user: User | null } | null) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [configured])

  const signOut = async () => {
    if (!configured) return
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, loading, signOut, configured }}>
      {children}
    </AuthCtx.Provider>
  )
}
