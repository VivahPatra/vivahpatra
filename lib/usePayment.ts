'use client'
import { useState } from 'react'
import { Template } from './templates'

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
}

export interface PaymentResult {
  success: boolean
  orderId?: string
  paymentId?: string
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function usePayment() {
  const [loading, setLoading] = useState(false)

  const pay = async (template: Template, userEmail: string, userPhone: string): Promise<PaymentResult> => {
    setLoading(true)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please try again.')
      setLoading(false)
      return { success: false }
    }

    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template.id }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to create order')
        setLoading(false)
        return { success: false }
      }

      const { orderId, amount, currency } = await res.json()

      return new Promise((resolve) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount,
          currency,
          name: 'Vivah Patra',
          description: `${template.name} Template`,
          order_id: orderId,
          prefill: {
            ...(userEmail ? { email: userEmail } : {}),
            ...(userPhone ? { contact: userPhone } : {}),
            name: userEmail?.split('@')[0] || '',
          },
          theme: { color: '#e8384f' },
          handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'Purchase', { value: template.price, currency: 'INR', content_name: template.name, content_ids: [template.id], content_type: 'product' })
            }
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })

            if (verifyRes.ok) {
              setLoading(false)
              resolve({ success: true, orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id })
            } else {
              alert('Payment verification failed. Contact support.')
              setLoading(false)
              resolve({ success: false })
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(false)
              resolve({ success: false })
            },
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      })
    } catch {
      alert('Payment error. Please try again.')
      setLoading(false)
      return { success: false }
    }
  }

  return { pay, loading }
}
