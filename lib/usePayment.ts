'use client'
import { useState } from 'react'
import { Template } from './templates'

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void }
  }
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

  const pay = async (template: Template, userEmail: string, userPhone: string): Promise<boolean> => {
    setLoading(true)

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please try again.')
      setLoading(false)
      return false
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
        return false
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
          theme: { color: '#c8922a' },
          handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            })

            if (verifyRes.ok) {
              setLoading(false)
              resolve(true)
            } else {
              alert('Payment verification failed. Contact support.')
              setLoading(false)
              resolve(false)
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(false)
              resolve(false)
            },
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      })
    } catch {
      alert('Payment error. Please try again.')
      setLoading(false)
      return false
    }
  }

  return { pay, loading }
}
