import type { MetadataRoute } from 'next';

const locales = ['en', 'ar'];
const publicRoutes = ['', '/blog', '/terms', '/privacy', '/cookies'];
const blogSlugs = ['best-places-to-visit-al-ain', 'renting-vs-taxis-al-ain', 'al-ain-driving-guide'];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedRoutes = locales.flatMap((locale) => [
    ...publicRoutes.map((route) => ({
      url: `https://www.mileagecarental.com/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `https://www.mileagecarental.com/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]);

  return localizedRoutes;
}
