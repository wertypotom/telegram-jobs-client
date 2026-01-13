import type { MetadataRoute } from 'next';
import { insightsApi } from '@/app/[locale]/insights/[slug]/api/insights.api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobsniper.com';

  try {
    // Fetch all insights page slugs
    const slugs = await insightsApi.getAllPageSlugs();
    const locales = ['en', 'ru'];

    // Generate sitemap entries for insights pages (SEO pages - priority 1.0)
    const insightsEntries: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/insights/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      }))
    );

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/pricing`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}/legal/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/legal/terms`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];

    return [...staticRoutes, ...insightsEntries];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes only if insights API fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
      },
    ];
  }
}
