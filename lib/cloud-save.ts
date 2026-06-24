'use client'
import { createClient } from './supabase'
import { WeddingFormData } from './editor-types'

export async function saveToCloud(userId: string, templateId: string, data: WeddingFormData): Promise<boolean> {
  const supabase = createClient()
  if (!supabase) return false

  const { error } = await supabase
    .from('user_templates')
    .upsert(
      { user_id: userId, template_id: templateId, data, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,template_id' }
    )

  if (error) {
    console.error('Cloud save error:', error.message)
    return false
  }
  return true
}

export async function loadFromCloud(userId: string, templateId: string): Promise<WeddingFormData | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('user_templates')
    .select('data')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .maybeSingle()

  if (error || !data) return null
  return data.data as WeddingFormData
}
