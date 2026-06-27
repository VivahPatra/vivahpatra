import { TEMPLATES } from '@/lib/templates'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vivahpatra.co'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/templates`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
  ]

  const templatePages = TEMPLATES.map(t => ({
    url: `${baseUrl}/preview/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...templatePages]
}
