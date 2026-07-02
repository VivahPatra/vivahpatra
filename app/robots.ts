import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/editor/', '/api/', '/profile/'],
      },
    ],
    sitemap: 'https://vivahpatra.co/sitemap.xml',
    host: 'https://vivahpatra.co',
  }
}
