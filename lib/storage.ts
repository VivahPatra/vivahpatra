'use client'
import { createClient } from './supabase'

const BUCKET = 'wedding-photos'

export async function uploadPhoto(file: File, userId: string, folder: string): Promise<string | null> {
  const supabase = createClient()
  if (!supabase) return null

  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${userId}/${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Upload error:', error.message)
    return null
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return publicUrl
}

export async function deletePhoto(url: string): Promise<void> {
  const supabase = createClient()
  if (!supabase) return

  const match = url.match(/wedding-photos\/(.+)$/)
  if (!match) return

  await supabase.storage.from(BUCKET).remove([match[1]])
}
