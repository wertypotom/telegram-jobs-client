import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { insightsApi } from '@/app/[locale]/insights/[slug]/api/insights.api';
import { PageClient } from './components/page-client';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ru';
    slug: string;
  }>;
}

// Generate static params for all pages
export async function generateStaticParams() {
  try {
    const slugs = await insightsApi.getAllPageSlugs();
    const locales = ['en', 'ru'];

    return slugs.flatMap((slug) =>
      locales.map((locale) => ({
        locale,
        slug,
      }))
    );
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug, locale } = await params;
    const data = await insightsApi.getPageData(slug, locale);

    if (!data) {
      notFound();
    }

    const meta = data.meta;
    const stats = data.stats;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobsniper.work';

    // Inject live stats into title
    const dynamicTitle =
      stats.jobsLast7Days > 0
        ? `${meta.title} - ${stats.jobsLast7Days} Active Jobs (Updated ${stats.updatedAt})`
        : meta.title;

    // Inject live stats into description
    let dynamicDescription = meta.description;
    if (stats.avgSalary && stats.totalJobs > 0) {
      dynamicDescription = `Avg salary ${stats.avgSalary}. ${stats.totalJobs} jobs analyzed. ${meta.description}`;
    }

    return {
      title: dynamicTitle,
      description: dynamicDescription,
      alternates: {
        canonical: `${siteUrl}/${locale}/insights/${slug}`,
        languages: {
          en: `${siteUrl}/en/insights/${slug}`,
          ru: `${siteUrl}/ru/insights/${slug}`,
        },
      },
      openGraph: {
        title: dynamicTitle,
        description: dynamicDescription,
        type: 'website',
        locale: locale,
        url: `${siteUrl}/${locale}/insights/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default async function InsightsPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const data = await insightsApi.getPageData(slug, locale);

  if (!data) {
    notFound();
  }

  return (
    <PageClient
      locale={locale}
      config={data.config}
      meta={data.meta}
      faq={data.faq}
      stats={data.stats}
      jobs={data.jobs}
    />
  );
}

// Revalidate every hour (ISR)
export const revalidate = 3600;
