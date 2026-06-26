'use client'
import { createClient } from './supabase'

export async function recordPurchase(
  userId: string,
  templateId: string,
  instanceId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string,
  amount: number
): Promise<boolean> {
  const supabase = createClient()
  if (!supabase) return false

  const { error } = await supabase
    .from('purchases')
    .insert({ user_id: userId, template_id: templateId, instance_id: instanceId, razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, amount })

  if (error) {
    console.error('Purchase record error:', error.message)
    return false
  }
  return true
}

export async function hasPurchased(userId: string, templateId: string): Promise<boolean> {
  const supabase = createClient()
  if (!supabase) return false

  const { data, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .limit(1)

  if (error) return false
  return (data?.length || 0) > 0
}

export async function getUserPurchases(userId: string): Promise<{ templateId: string; instanceId: string; amount: number; createdAt: string }[]> {
  const supabase = createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('purchases')
    .select('template_id, instance_id, amount, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data.map((r: { template_id: string; instance_id: string; amount: number; created_at: string }) => ({
    templateId: r.template_id,
    instanceId: r.instance_id,
    amount: r.amount,
    createdAt: r.created_at,
  }))
}
