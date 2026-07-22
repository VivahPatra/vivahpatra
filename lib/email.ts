// Email sending goes through /api/send-email (Nodemailer + Gmail SMTP)
// This file is kept for any server-side direct calls if needed in future

export async function sendPurchaseEmail(to: string, templateName: string, editorUrl: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivahpatra.co'
  await fetch(`${baseUrl}/api/send-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'purchase', to, templateName, editorUrl }),
  })
}
