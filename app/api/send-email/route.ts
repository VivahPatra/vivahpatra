import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const FROM = `Vivah Patra <${process.env.GMAIL_USER}>`

export async function POST(req: NextRequest) {
  try {
    const { type, to, templateName, editorUrl } = await req.json()

    if (!to) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    let subject = ''
    let html = ''

    if (type === 'welcome') {
      subject = 'Welcome to Vivah Patra! 🎊'
      html = welcomeHtml()
    } else if (type === 'purchase') {
      subject = `Your ${templateName} invitation is ready! 🎉`
      html = purchaseHtml(templateName, editorUrl)
    } else {
      return NextResponse.json({ error: 'Unknown email type' }, { status: 400 })
    }

    await transporter.sendMail({ from: FROM, to, subject, html })
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Email send failed'
    console.error('Email error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function welcomeHtml() {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;overflow:hidden;border:1px solid #222">
        <tr>
          <td style="background:linear-gradient(135deg,#e8384f,#c8922a);padding:40px;text-align:center">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:3px;text-transform:uppercase">Vivah Patra</p>
            <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700">Welcome! 🎊</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px">
            <p style="margin:0 0 16px;color:#ccc;font-size:16px;line-height:1.6">
              Thank you for joining <strong style="color:#fff">Vivah Patra</strong> — India's most beautiful digital wedding invitation platform.
            </p>
            <p style="margin:0 0 32px;color:#888;font-size:14px;line-height:1.6">
              Browse our collection of stunning templates and create your perfect wedding invitation in minutes.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px">
              <tr>
                <td style="background:#e8384f;border-radius:50px">
                  <a href="https://vivahpatra.co/templates" style="display:inline-block;padding:14px 36px;color:#fff;text-decoration:none;font-size:15px;font-weight:600">
                    Explore Templates →
                  </a>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #222;margin:0 0 24px">
            <p style="margin:0;color:#555;font-size:12px;text-align:center">
              <a href="https://vivahpatra.co" style="color:#e8384f;text-decoration:none">vivahpatra.co</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function purchaseHtml(templateName: string, editorUrl: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;overflow:hidden;border:1px solid #222">
        <tr>
          <td style="background:linear-gradient(135deg,#e8384f,#c8922a);padding:40px;text-align:center">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:3px;text-transform:uppercase">Vivah Patra</p>
            <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700">Payment Successful! 🎉</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px">
            <p style="margin:0 0 16px;color:#ccc;font-size:16px;line-height:1.6">
              Your <strong style="color:#fff">${templateName}</strong> wedding invitation template is ready to customise.
            </p>
            <p style="margin:0 0 32px;color:#888;font-size:14px;line-height:1.6">
              Click below to open the editor and personalise every detail — names, dates, venue, photos and more.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px">
              <tr>
                <td style="background:#e8384f;border-radius:50px">
                  <a href="${editorUrl}" style="display:inline-block;padding:14px 36px;color:#fff;text-decoration:none;font-size:15px;font-weight:600">
                    Open Editor →
                  </a>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #222;margin:0 0 24px">
            <p style="margin:0;color:#555;font-size:12px;text-align:center">
              Questions? Reply to this email — we're happy to help.<br>
              <a href="https://vivahpatra.co" style="color:#e8384f;text-decoration:none">vivahpatra.co</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}
