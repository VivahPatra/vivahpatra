import { TEMPLATES } from '@/lib/templates'
import type { MetadataRoute } from 'next'

const BASE = 'https://vivahpatra.co'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/templates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
  ]

  const templatePages: MetadataRoute.Sitemap = TEMPLATES.map(t => ({
    url: `${BASE}/preview/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  return [...staticPages, ...templatePages]
}
