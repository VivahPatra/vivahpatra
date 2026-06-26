'use client'
import { createClient } from './supabase'

function generateSlug(groomName: string, brideName: string): string {
  const g = (groomName || 'groom').toLowerCase().replace(/[^a-z0-9]/g, '')
  const b = (brideName || 'bride').toLowerCase().replace(/[^a-z0-9]/g, '')
  const rand = Math.random().toString(36).slice(2, 7)
  return `${g}-weds-${b}-${rand}`
}

export async function publishInvite(templateId: string, instanceId: string, data: unknown, userId: string): Promise<{ slug: string; updated: boolean } | { error: string }> {
  const supabase = createClient()
  if (!supabase) return { error: 'Database not configured' }

  // Check if THIS instance already published
  const { data: existing } = await supabase
    .from('published_invites')
    .select('id, slug')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .eq('instance_id', instanceId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabase
      .from('published_invites')
      .update({ data, updated_at: new Date().toISOString() })
      .eq('id', existing.id)

    if (error) return { error: error.message }
    return { slug: existing.slug, updated: true }
  }

  const d = data as Record<string, string>
  const slug = generateSlug(d.groomName || '', d.brideName || '')

  const { error } = await supabase
    .from('published_invites')
    .insert({ slug, template_id: templateId, instance_id: instanceId, user_id: userId, data })

  if (error) {
    if (error.code === '23505') {
      const retrySlug = slug + Math.random().toString(36).slice(2, 4)
      const { error: retryErr } = await supabase
        .from('published_invites')
        .insert({ slug: retrySlug, template_id: templateId, instance_id: instanceId, user_id: userId, data })
      if (retryErr) return { error: retryErr.message }
      return { slug: retrySlug, updated: false }
    }
    return { error: error.message }
  }

  return { slug, updated: false }
}

export async function checkPublished(templateId: string, instanceId: string, userId: string): Promise<string | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data } = await supabase
    .from('published_invites')
    .select('slug')
    .eq('user_id', userId)
    .eq('template_id', templateId)
    .eq('instance_id', instanceId)
    .maybeSingle()

  return data?.slug || null
}
