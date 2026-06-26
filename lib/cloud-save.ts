'use client'
import { createClient } from './supabase'
import { WeddingFormData } from './editor-types'

export async function saveToCloud(userId: string, templateId: string, instanceId: string, data: WeddingFormData): Promise<boolean> {
  const supabase = createClient()
  if (!supabase) return false

  const { error } = await supabase
    .from('user_templates')
    .upsert(
      { user_id: userId, template_id: templateId, instance_id: instanceId, data, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,template_id,instance_id' }
    )

  if (error) {
    console.error('Cloud save error:', error.message)
    return false
  }
  return true
}

export async function loadFromCloud(userId: string, templateId: string, instanceId: string): Promise<WeddingFormData | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('user_templates')
    .select('data')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .eq('instance_id', instanceId)
    .maybeSingle()

  if (error || !data) return null
  return data.data as WeddingFormData
}

export interface CloudInstance {
  instanceId: string
  groomName: string
  brideName: string
  updatedAt: string
}

export async function getCloudInstances(userId: string, templateId: string): Promise<CloudInstance[]> {
  const supabase = createClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('user_templates')
    .select('instance_id, data, updated_at')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .order('updated_at', { ascending: true })

  if (error || !data) return []

  return data.map((row: { instance_id: string; data: unknown; updated_at: string }) => {
    const d = row.data as Record<string, string>
    return {
      instanceId: row.instance_id,
      groomName: d.groomName || '',
      brideName: d.brideName || '',
      updatedAt: row.updated_at,
    }
  })
}
