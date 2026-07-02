import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ error: 'DB not configured' }, { status: 500 })

  try {
    const { slug, guestName, guestCount } = await req.json()
    if (!slug || !guestCount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { error } = await supabase.from('rsvps').insert({
      invite_slug: slug,
      guest_name: guestName || 'Anonymous',
      guest_count: Number(guestCount),
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
