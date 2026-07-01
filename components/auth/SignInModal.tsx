'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createClient } from '@/lib/supabase'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SignInModal({ open, onClose }: Props) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'choose' | 'phone' | 'otp'>('choose')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const confirmationRef = useRef<ConfirmationResult | null>(null)
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null)
  const supabase = createClient()

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.clear()
        recaptchaRef.current = null
      }
    }
  }, [])

  const signInWithGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  const sendOTP = async () => {
    if (!phone || phone.length < 10) { setError('Enter valid 10-digit phone number'); return }
    setLoading(true)
    setError('')
    try {
      // Setup invisible reCAPTCHA
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {},
        })
      }
      const phoneNumber = phone.startsWith('+') ? phone : `+91${phone}`
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current)
      confirmationRef.current = confirmation
      setStep('otp')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send OTP'
      setError(msg)
      // Reset recaptcha on error
      if (recaptchaRef.current) {
        recaptchaRef.current.clear()
        recaptchaRef.current = null
      }
    }
    setLoading(false)
  }

  const verifyOTP = async () => {
    if (!otp || otp.length < 6) { setError('Enter 6-digit OTP'); return }
    if (!confirmationRef.current) { setError('Session expired. Please try again.'); setStep('phone'); return }
    setLoading(true)
    setError('')
    try {
      const result = await confirmationRef.current.confirm(otp)
      const firebaseToken = await result.user.getIdToken()
      const phoneNumber = phone.startsWith('+') ? phone : `+91${phone}`

      // Sign into Supabase using custom token (phone as identifier)
      const { error: supaError } = await supabase.auth.signInWithPassword({
        email: `${phoneNumber.replace('+', '')}@phone.vivahpatra.co`,
        password: firebaseToken.slice(0, 64),
      })

      if (supaError) {
        // User doesn't exist yet — create them
        const { error: signUpError } = await supabase.auth.signUp({
          email: `${phoneNumber.replace('+', '')}@phone.vivahpatra.co`,
          password: firebaseToken.slice(0, 64),
          options: { data: { phone: phoneNumber, provider: 'firebase_phone' } },
        })
        if (signUpError) throw new Error(signUpError.message)
      }

      setLoading(false)
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid OTP'
      setError(msg.includes('invalid-verification-code') ? 'Invalid OTP. Please try again.' : msg)
      setLoading(false)
    }
  }

  const reset = () => {
    setStep('choose')
    setPhone('')
    setOtp('')
    setError('')
    if (recaptchaRef.current) {
      recaptchaRef.current.clear()
      recaptchaRef.current = null
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* Invisible reCAPTCHA container */}
          <div id="recaptcha-container" />

          <motion.div className="relative w-full max-w-sm rounded-2xl p-8"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>

            <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-60">
              <X size={20} style={{ color: 'var(--color-muted)' }} />
            </button>

            <h2 className="font-display text-2xl text-center mb-2">Sign In</h2>
            <p className="font-sans text-xs text-center mb-6" style={{ color: 'var(--color-muted)' }}>
              Sign in to purchase and customize your wedding invite
            </p>

            {error && (
              <p className="font-sans text-xs text-center mb-4 p-2 rounded-lg" style={{ background: '#fee', color: '#c00' }}>{error}</p>
            )}

            {step === 'choose' && (
              <div className="flex flex-col gap-3">
                <button onClick={signInWithGoogle} disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-full font-sans text-sm font-semibold border transition-all hover:bg-gray-50 disabled:opacity-50"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                  <span className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>or</span>
                  <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                </div>

                <button onClick={() => setStep('phone')}
                  className="w-full py-3 rounded-full font-sans text-sm font-semibold text-white"
                  style={{ background: 'var(--color-accent)' }}>
                  Sign in with Phone
                </button>
              </div>
            )}

            {step === 'phone' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 border rounded-full px-4 py-2.5" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>+91</span>
                  <input type="tel" placeholder="Phone number" maxLength={10} value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 font-sans text-sm outline-none bg-transparent"
                    onKeyDown={e => e.key === 'Enter' && sendOTP()} />
                </div>
                <button onClick={sendOTP} disabled={loading}
                  className="w-full py-3 rounded-full font-sans text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: 'var(--color-accent)' }}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
                <button onClick={reset} className="font-sans text-xs text-center hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
                  ← Back
                </button>
              </div>
            )}

            {step === 'otp' && (
              <div className="flex flex-col gap-3">
                <p className="font-sans text-xs text-center" style={{ color: 'var(--color-muted)' }}>
                  OTP sent to +91{phone}
                </p>
                <input type="text" placeholder="Enter 6-digit OTP" maxLength={6} value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="border rounded-full px-4 py-2.5 font-sans text-sm text-center tracking-[0.3em] outline-none"
                  style={{ borderColor: 'var(--color-border)' }}
                  onKeyDown={e => e.key === 'Enter' && verifyOTP()} />
                <button onClick={verifyOTP} disabled={loading}
                  className="w-full py-3 rounded-full font-sans text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: 'var(--color-accent)' }}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button onClick={() => setStep('phone')} className="font-sans text-xs text-center hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
                  ← Change number
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
