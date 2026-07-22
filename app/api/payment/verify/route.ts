import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendPurchaseEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userEmail, templateName, editorUrl } = await req.json()

    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Send purchase confirmation email
    if (userEmail && templateName) {
      try {
        await sendPurchaseEmail(userEmail, templateName, editorUrl || 'https://vivahpatra.co')
      } catch (emailErr) {
        console.error('Purchase email failed:', emailErr)
        // Don't fail the payment verification if email fails
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Verification error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
