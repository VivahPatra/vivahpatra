import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'Vivah Patra <pr@vivahpatra.co>'

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ ok: false })

  try {
    const body = await req.json()
    const { type, to, templateName, inviteUrl, amount } = body

    if (!to || !type) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    if (type === 'purchase') {
      await resend.emails.send({
        from: FROM,
        to,
        subject: `🎉 Purchase Confirmed — ${templateName} | Vivah Patra`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #f0f0f0">
            <div style="background:#1a1a1a;padding:28px 32px;text-align:center">
              <p style="color:#e8384f;font-size:22px;font-weight:700;margin:0;letter-spacing:1px">VIVAH PATRA</p>
              <p style="color:#aaa;font-size:12px;margin:4px 0 0">Animated Digital Wedding Invitations</p>
            </div>
            <div style="padding:32px">
              <h2 style="color:#1a1a1a;margin:0 0 8px">Payment Confirmed ✅</h2>
              <p style="color:#555;margin:0 0 24px">Thank you! Your purchase of <strong>${templateName}</strong> is confirmed.</p>
              <div style="background:#f9f9f9;border-radius:8px;padding:16px 20px;margin-bottom:24px">
                <p style="margin:0 0 6px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px">Amount Paid</p>
                <p style="margin:0;color:#e8384f;font-size:24px;font-weight:700">₹${amount}</p>
              </div>
              <p style="color:#555;margin:0 0 20px">You can now customize your invitation in the editor. Once ready, publish your invite link and share it on WhatsApp with your guests.</p>
              <a href="https://vivahpatra.co/templates" style="display:inline-block;background:#e8384f;color:#fff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:14px">
                Go to My Templates →
              </a>
            </div>
            <div style="background:#f9f9f9;padding:20px 32px;text-align:center;border-top:1px solid #f0f0f0">
              <p style="color:#999;font-size:12px;margin:0">Need help? Reply to this email or contact <a href="mailto:pr@vivahpatra.co" style="color:#e8384f">pr@vivahpatra.co</a></p>
            </div>
          </div>
        `,
      })
    }

    if (type === 'publish') {
      await resend.emails.send({
        from: FROM,
        to,
        subject: `💌 Your Wedding Invitation is Live! | Vivah Patra`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #f0f0f0">
            <div style="background:#1a1a1a;padding:28px 32px;text-align:center">
              <p style="color:#e8384f;font-size:22px;font-weight:700;margin:0;letter-spacing:1px">VIVAH PATRA</p>
              <p style="color:#aaa;font-size:12px;margin:4px 0 0">Animated Digital Wedding Invitations</p>
            </div>
            <div style="padding:32px">
              <h2 style="color:#1a1a1a;margin:0 0 8px">Your Invitation is Live! 🎊</h2>
              <p style="color:#555;margin:0 0 24px">Your <strong>${templateName}</strong> wedding invitation has been published and is ready to share.</p>
              <div style="background:#f9f9f9;border-radius:8px;padding:16px 20px;margin-bottom:24px">
                <p style="margin:0 0 6px;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px">Your Invite Link</p>
                <a href="${inviteUrl}" style="color:#e8384f;font-size:14px;font-weight:600;word-break:break-all">${inviteUrl}</a>
              </div>
              <p style="color:#555;margin:0 0 20px">Share this link on WhatsApp, Instagram, or via SMS with all your guests. The link works on all devices!</p>
              <a href="${inviteUrl}" style="display:inline-block;background:#e8384f;color:#fff;text-decoration:none;padding:12px 28px;border-radius:100px;font-weight:600;font-size:14px">
                View Invitation →
              </a>
            </div>
            <div style="background:#f9f9f9;padding:20px 32px;text-align:center;border-top:1px solid #f0f0f0">
              <p style="color:#999;font-size:12px;margin:0">Need help? Reply to this email or contact <a href="mailto:pr@vivahpatra.co" style="color:#e8384f">pr@vivahpatra.co</a></p>
            </div>
          </div>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email error:', err)
    return NextResponse.json({ ok: false })
  }
}
