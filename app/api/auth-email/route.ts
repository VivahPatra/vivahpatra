import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Vivah Patra <pr@vivahpatra.co>'
const SITE = 'https://vivahpatra.co'

// Supabase Auth Hook — called for every auth email event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { user, email_data } = body
    const to = user?.email
    if (!to) return NextResponse.json({ error: 'No email' }, { status: 400 })

    const type = email_data?.email_action_type

    if (type === 'signup' || type === 'email_change') {
      const confirmUrl = email_data?.token_hash
        ? `${SITE}/auth/confirm?token_hash=${email_data.token_hash}&type=email`
        : email_data?.confirmation_url || '#'

      await resend.emails.send({
        from: FROM,
        to,
        subject: 'Confirm your Vivah Patra account',
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
            <div style="background:#1a1a1a;padding:24px;text-align:center">
              <p style="color:#e8384f;font-size:20px;font-weight:700;margin:0">VIVAH PATRA</p>
              <p style="color:#aaa;font-size:12px;margin:4px 0 0">Animated Digital Wedding Invitations</p>
            </div>
            <div style="padding:28px;background:#fff">
              <h2 style="color:#1a1a1a;margin:0 0 12px">Confirm your email 🙏</h2>
              <p style="color:#555;margin:0 0 20px">Click below to verify your account and get started.</p>
              <a href="${confirmUrl}"
                 style="display:inline-block;background:#e8384f;color:#fff;padding:12px 28px;
                        border-radius:100px;font-weight:600;text-decoration:none">
                Confirm Email →
              </a>
              <p style="color:#999;font-size:12px;margin-top:20px">Link expires in 24 hours. If you didn't sign up, ignore this.</p>
            </div>
          </div>
        `,
      })
    }

    if (type === 'recovery') {
      const resetUrl = email_data?.token_hash
        ? `${SITE}/auth/confirm?token_hash=${email_data.token_hash}&type=recovery`
        : email_data?.confirmation_url || '#'

      await resend.emails.send({
        from: FROM,
        to,
        subject: 'Reset your Vivah Patra password',
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
            <div style="background:#1a1a1a;padding:24px;text-align:center">
              <p style="color:#e8384f;font-size:20px;font-weight:700;margin:0">VIVAH PATRA</p>
              <p style="color:#aaa;font-size:12px;margin:4px 0 0">Animated Digital Wedding Invitations</p>
            </div>
            <div style="padding:28px;background:#fff">
              <h2 style="color:#1a1a1a;margin:0 0 12px">Reset your password</h2>
              <p style="color:#555;margin:0 0 20px">Click below to set a new password.</p>
              <a href="${resetUrl}"
                 style="display:inline-block;background:#e8384f;color:#fff;padding:12px 28px;
                        border-radius:100px;font-weight:600;text-decoration:none">
                Reset Password →
              </a>
              <p style="color:#999;font-size:12px;margin-top:20px">Link expires in 1 hour. If you didn't request this, ignore this email.</p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Auth email hook error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
