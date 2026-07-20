import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getTemplate } from '@/lib/templates'
import { createClient } from '@/lib/supabase-server'

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET
  if (!key_id || !key_secret) return null
  return new Razorpay({ key_id, key_secret })
}

export async function POST(req: NextRequest) {
  try {
    const { templateId } = await req.json()

    const razorpay = getRazorpay()
    if (!razorpay) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 503 })
    }

    const template = getTemplate(templateId)
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    // Check for admin price override in Supabase
    let price = template.price
    try {
      const supabase = createClient()
      const { data } = await supabase.from('template_prices').select('price').eq('template_id', templateId).single()
      if (data?.price) price = data.price
    } catch { /* use default price */ }

    const order = await razorpay.orders.create({
      amount: price * 100, // paise
      currency: 'INR',
      receipt: `order_${templateId}_${Date.now()}`,
      notes: { templateId, templateName: template.name },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      templateName: template.name,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Payment error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
