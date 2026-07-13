'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface Props {
  open: boolean
  onClose: () => void
}

type Step = 'choose' | 'login' | 'register'

export default function SignInModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>('choose')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const supabase = createClient()

  const signInWithGoogle = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  const login = async () => {
    if (!loginEmail || !loginPassword) { setError('Enter email and password'); return }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    setLoading(false)
    if (error) { setError(error.message); return }
    onClose()
  }

  const register = async () => {
    if (!name.trim()) { setError('Full name is required'); return }
    if (!dob) { setError('Date of birth is required'); return }
    if (!gender) { setError('Please select your gender'); return }
    if (!email.includes('@')) { setError('Enter a valid email address'); return }
    if (!mobile || mobile.length < 10) { setError('Enter a valid 10-digit mobile number'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true); setError('')

    try {
      const supabase = createClient()
      if (!supabase) { setError('Service unavailable. Please try again later.'); setLoading(false); return }

      // Check duplicate email in profiles
      const { data: emailCheck, error: emailErr } = await supabase
        .from('profiles').select('id').eq('email', email).maybeSingle()
      if (emailCheck) {
        setError('This email is already registered. Please sign in.')
        setLoading(false); return
      }
      if (emailErr && emailErr.code !== 'PGRST116') {
        // PGRST116 = no rows found, that's fine. Other errors = RLS or DB issue
        console.error('Email check error:', emailErr)
      }

      // Check duplicate mobile in profiles
      const { data: mobileCheck, error: mobileErr } = await supabase
        .from('profiles').select('id').eq('mobile', mobile).maybeSingle()
      if (mobileCheck) {
        setError('This mobile number is already registered. Please sign in or use a different number.')
        setLoading(false); return
      }
      if (mobileErr && mobileErr.code !== 'PGRST116') {
        console.error('Mobile check error:', mobileErr)
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, dob, gender, mobile } },
      })

      if (signUpError) {
        const msg = typeof signUpError.message === 'string' ? signUpError.message : ''
        setError(
          msg.toLowerCase().includes('already') || msg.toLowerCase().includes('registered')
            ? 'This email is already registered. Please sign in.'
            : msg || 'Signup failed. Please try again.'
        )
        setLoading(false); return
      }

      // With email confirmation ON: data.user exists but data.session is null — this is correct
      if (data?.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id, name, dob, gender, email, mobile,
          created_at: new Date().toISOString(),
        })
        setLoading(false)
        setSuccess(`Account created! Check your email (${email}) to confirm your account.`)
        setLoginEmail(email)
        setTimeout(() => { setSuccess(''); setStep('login') }, 3500)
        return
      }

      // Fallback: no user returned
      setError('Could not create account. This email may already be registered.')
      setLoading(false)

    } catch (err: unknown) {
      let msg = 'Something went wrong. Please try again.'
      if (err instanceof Error && err.message) msg = err.message
      else if (typeof err === 'string' && err) msg = err
      setError(msg)
      setLoading(false)
    }
  }

  const reset = () => { setStep('choose'); setError(''); setSuccess('') }

  const inputCls = "w-full border rounded-xl px-4 py-2.5 font-sans text-sm outline-none bg-transparent focus:border-[#e8384f] transition-colors"
  const inputStyle = { borderColor: 'var(--color-border)', color: 'var(--color-text)' }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div className="relative w-full max-w-sm rounded-2xl p-7 max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>

            <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-60">
              <X size={20} style={{ color: 'var(--color-muted)' }} />
            </button>

            <h2 className="font-display text-2xl text-center mb-1">
              {step === 'choose' ? 'Sign In' : step === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="font-sans text-xs text-center mb-5" style={{ color: 'var(--color-muted)' }}>
              {step === 'choose' ? 'Sign in to purchase and manage your invites'
                : step === 'login' ? 'Sign in to your account'
                : 'Create your Vivah Patra account'}
            </p>

            {error && (
              <p className="font-sans text-xs text-center mb-4 p-3 rounded-lg" style={{ background: '#fee', color: '#c00' }}>{error}</p>
            )}
            {success && (
              <p className="font-sans text-xs text-center mb-4 p-3 rounded-lg" style={{ background: '#f0fff4', color: '#16a34a', border: '1px solid #bbf7d0' }}>✓ {success}</p>
            )}

            {/* CHOOSE */}
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

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                  <span className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>or</span>
                  <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                </div>

                <button onClick={() => { setError(''); setStep('login') }}
                  className="w-full py-3 rounded-full font-sans text-sm font-semibold text-white"
                  style={{ background: '#e8384f' }}>
                  Sign in with Email
                </button>
                <button onClick={() => { setError(''); setStep('register') }}
                  className="w-full py-2.5 rounded-full font-sans text-sm font-semibold border transition-all hover:bg-gray-50"
                  style={{ borderColor: '#e8384f', color: '#e8384f' }}>
                  Create Account
                </button>
              </div>
            )}

            {/* LOGIN */}
            {step === 'login' && (
              <div className="flex flex-col gap-3">
                <input type="email" placeholder="Email address" value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className={inputCls} style={inputStyle}
                  onKeyDown={e => e.key === 'Enter' && login()} />
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} placeholder="Password" value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className={inputCls} style={inputStyle}
                    onKeyDown={e => e.key === 'Enter' && login()} />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <button onClick={login} disabled={loading}
                  className="w-full py-3 rounded-full font-sans text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: '#e8384f' }}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <p className="font-sans text-xs text-center" style={{ color: 'var(--color-muted)' }}>
                  Don&apos;t have an account?{' '}
                  <button onClick={() => { setError(''); setStep('register') }} className="font-semibold hover:opacity-70" style={{ color: '#e8384f' }}>Register</button>
                </p>
                <button onClick={reset} className="font-sans text-xs text-center hover:opacity-70" style={{ color: 'var(--color-muted)' }}>← Back</button>
              </div>
            )}

            {/* REGISTER */}
            {step === 'register' && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Full Name *</label>
                  <input type="text" placeholder="e.g. Rahul Sharma" value={name}
                    onChange={e => setName(e.target.value)} className={inputCls} style={inputStyle} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Date of Birth *</label>
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Gender *</label>
                    <select value={gender} onChange={e => setGender(e.target.value)}
                      className={inputCls} style={{ ...inputStyle, background: 'var(--color-surface)' }}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Email Address *</label>
                  <input type="email" placeholder="e.g. rahul@gmail.com" value={email}
                    onChange={e => setEmail(e.target.value)} className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Mobile Number *</label>
                  <div className="flex items-center gap-2 border rounded-xl px-4 py-2.5" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="font-sans text-sm font-medium" style={{ color: 'var(--color-muted)' }}>+91</span>
                    <input type="tel" placeholder="10-digit mobile number" maxLength={10} value={mobile}
                      onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 font-sans text-sm outline-none bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Password * (min 8 characters)</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} placeholder="Create a strong password" value={password}
                      onChange={e => setPassword(e.target.value)} className={inputCls} style={inputStyle} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-wider mb-1 block" style={{ color: 'var(--color-muted)' }}>Confirm Password *</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} placeholder="Re-enter your password" value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)} className={inputCls} style={inputStyle}
                      onKeyDown={e => e.key === 'Enter' && register()} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <button onClick={register} disabled={loading}
                  className="w-full py-3 rounded-full font-sans text-sm font-semibold text-white disabled:opacity-50"
                  style={{ background: '#e8384f' }}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
                <p className="font-sans text-xs text-center" style={{ color: 'var(--color-muted)' }}>
                  Already have an account?{' '}
                  <button onClick={() => { setError(''); setStep('login') }} className="font-semibold hover:opacity-70" style={{ color: '#e8384f' }}>Sign in</button>
                </p>
                <button onClick={reset} className="font-sans text-xs text-center hover:opacity-70" style={{ color: 'var(--color-muted)' }}>← Back</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
