import { NextResponse } from 'next/server'

const DURATION_MS = 36 * 60 * 60 * 1000

// Module-level: persists across requests on same serverless instance
// Vercel cold starts reset it — acceptable, timer just restarts
let saleEndTime: number = Date.now() + DURATION_MS

export async function GET() {
  const now = Date.now()
  if (saleEndTime <= now) {
    saleEndTime = now + DURATION_MS
  }
  return NextResponse.json(
    { endsAt: saleEndTime },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
