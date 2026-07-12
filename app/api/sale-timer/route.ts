import { NextResponse } from 'next/server'

const DURATION_MS = 36 * 60 * 60 * 1000
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function getEndTime(): Promise<number> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/app_settings?key=eq.sale_end_time&select=value`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }, cache: 'no-store' }
  )
  const rows = await res.json()
  if (rows?.[0]?.value) {
    const end = parseInt(rows[0].value, 10)
    if (end > Date.now()) return end
  }
  return 0
}

async function setEndTime(end: number): Promise<void> {
  await fetch(`${SUPABASE_URL}/rest/v1/app_settings`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({ key: 'sale_end_time', value: String(end) }),
  })
}

export async function GET() {
  const now = Date.now()
  let endTime = await getEndTime()
  if (!endTime || endTime <= now) {
    endTime = now + DURATION_MS
    await setEndTime(endTime)
  }
  return NextResponse.json(
    { endsAt: endTime },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
