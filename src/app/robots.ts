import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://www.mileagecarental.com/sitemap.xml',
    host: 'https://www.mileagecarental.com',
  };
}
