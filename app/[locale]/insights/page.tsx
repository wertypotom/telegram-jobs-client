import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { insightsApi } from './[slug]/api/insights.api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { TrendingUp, Globe, Code, Zap } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: 'en' | 'ru';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobsniper.work';

  const t = {
    en: {
      title: 'Job Market Insights - Live Data from Telegram Channels',
      description:
        'Explore comprehensive job market analysis across technologies and regions. Real-time data from exclusive Telegram channels.',
    },
    ru: {
      title: 'Аналитика рынка вакансий - Данные из Telegram каналов',
      description:
        'Изучайте комплексную аналитику рынка вакансий по технологиям и регионам. Данные в реальном времени из Telegram.',
    },
  };

  return {
    title: t[locale].title,
    description: t[locale].description,
    alternates: {
      canonical: `${siteUrl}/${locale}/insights`,
      languages: {
        en: `${siteUrl}/en/insights`,
        ru: `${siteUrl}/ru/insights`,
      },
    },
  };
}

export default async function InsightsIndexPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch all available insights pages
  const slugs = await insightsApi.getAllPageSlugs();

  if (!slugs || slugs.length === 0) {
    notFound();
  }

  // Fetch preview data for each page
  const pages = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const data = await insightsApi.getPageData(slug, locale);
        return data ? { slug, ...data } : null;
      } catch {
        return null;
      }
    })
  );

  const validPages = pages.filter((p): p is NonNullable<typeof p> => p !== null);

  // Group by template type
  const categories = validPages.filter((p) => p.config.template === 'category-only');
  const regions = validPages.filter((p) => p.config.template === 'region-only');
  const remote = validPages.filter((p) => p.config.template === 'remote-jobs');
  const mixed = validPages.filter((p) => p.config.template === 'category-region');

  const t = {
    en: {
      title: 'Market Insights',
      subtitle: 'Live job market analysis from exclusive Telegram channels',
      categories: 'By Technology',
      regions: 'By Region',
      remote: 'Remote Opportunities',
      mixed: 'Technology & Region',
      jobs: 'jobs',
      active: 'active',
    },
    ru: {
      title: 'Аналитика рынка',
      subtitle: 'Анализ рынка вакансий из Telegram в реальном времени',
      categories: 'По технологиям',
      regions: 'По регионам',
      remote: 'Удаленная работа',
      mixed: 'Технология и регион',
      jobs: 'вакансий',
      active: 'активных',
    },
  };

  const trans = t[locale];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="mb-12 md:mb-16 text-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8 md:p-12 border border-primary/10">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent pb-2 dark:from-white dark:to-gray-400">
            {trans.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            {trans.subtitle}
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      </header>

      <div className="space-y-16">
        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-6 border-b border-border/50 pb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{trans.categories}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Explore opportunities by technology stack
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${locale}/insights/${page.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {page.meta.h1}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {page.stats.jobsLast7Days} {trans.active}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          • {page.stats.totalJobs} {trans.jobs}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                        {page.meta.description}
                      </p>
                      {page.stats.avgSalary && (
                        <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2.5 py-1.5 rounded-md w-fit">
                          💰 Avg: {page.stats.avgSalary}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regions Section */}
        {regions.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-6 border-b border-border/50 pb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{trans.regions}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Market analysis by geographic location
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regions.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${locale}/insights/${page.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {page.meta.h1}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {page.stats.jobsLast7Days} {trans.active}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          • {page.stats.totalJobs} {trans.jobs}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {page.meta.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Remote Section */}
        {remote.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-6 border-b border-border/50 pb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{trans.remote}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Work from anywhere opportunities
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remote.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${locale}/insights/${page.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {page.meta.h1}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {page.stats.jobsLast7Days} {trans.active}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          • {page.stats.totalJobs} {trans.jobs}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {page.meta.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Mixed Section */}
        {mixed.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-6 border-b border-border/50 pb-4">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{trans.mixed}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Specific regional technologies
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mixed.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${locale}/insights/${page.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {page.meta.h1}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          {page.stats.jobsLast7Days} {trans.active}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          • {page.stats.totalJobs} {trans.jobs}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {page.meta.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
