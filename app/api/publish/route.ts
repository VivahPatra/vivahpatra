import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function generateSlug(groomName: string, brideName: string): string {
  const g = (groomName || 'groom').toLowerCase().replace(/[^a-z0-9]/g, '')
  const b = (brideName || 'bride').toLowerCase().replace(/[^a-z0-9]/g, '')
  const rand = Math.random().toString(36).slice(2, 7)
  return `${g}-weds-${b}-${rand}`
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

  try {
    const { templateId, data, userId } = await req.json()
    if (!templateId || !data) return NextResponse.json({ error: 'Missing templateId or data' }, { status: 400 })

    const slug = generateSlug(data.groomName, data.brideName)

    // Check if user already published this template — update instead of insert
    const { data: existing } = await supabase
      .from('published_invites')
      .select('id, slug')
      .eq('user_id', userId)
      .eq('template_id', templateId)
      .maybeSingle()

    if (existing) {
      await supabase
        .from('published_invites')
        .update({ data, updated_at: new Date().toISOString() })
        .eq('id', existing.id)

      return NextResponse.json({ slug: existing.slug, updated: true })
    }

    const { error } = await supabase
      .from('published_invites')
      .insert({ slug, template_id: templateId, user_id: userId, data })

    if (error) {
      if (error.code === '23505') {
        const retrySlug = slug + Math.random().toString(36).slice(2, 4)
        const { error: retryErr } = await supabase
          .from('published_invites')
          .insert({ slug: retrySlug, template_id: templateId, user_id: userId, data })
        if (retryErr) return NextResponse.json({ error: retryErr.message }, { status: 500 })
        return NextResponse.json({ slug: retrySlug })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ slug })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
