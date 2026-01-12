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

    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        canonical: `/${locale}/insights/${slug}`,
        languages: {
          en: `/en/insights/${slug}`,
          ru: `/ru/insights/${slug}`,
        },
      },
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'website',
        locale: locale,
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

  return <PageClient meta={data.meta} faq={data.faq} stats={data.stats} />;
}

// Revalidate every hour (ISR)
export const revalidate = 3600;
