import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/editor/', '/api/'],
      },
    ],
    sitemap: 'https://www.vivahpatra.co/sitemap.xml',
  }
}
