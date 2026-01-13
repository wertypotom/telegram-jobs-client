'use client';

import { useTranslation } from 'react-i18next';
import { StatsOverview } from './stats-overview';
import { TechStackChart } from '@/app/[locale]/insights/[slug]/components/charts/tech-stack-chart';
import { SalaryBandsChart } from '@/app/[locale]/insights/[slug]/components/charts/salary-bands-chart';
import { ExperienceLevelsChart } from '@/app/[locale]/insights/[slug]/components/charts/experience-levels-chart';
import { TrendChart } from '@/app/[locale]/insights/[slug]/components/charts/trend-chart';
import { FaqSchema } from './faq-schema';
import { BreadcrumbSchema } from './breadcrumb-schema';
import { Breadcrumb } from './breadcrumb';
import { RecentJobs } from './recent-jobs';
import type {
  FaqItem,
  InsightsPageMeta,
  MarketStats,
  InsightsTemplate,
} from '../types/insights.types';

interface PageClientProps {
  locale: 'en' | 'ru';
  config: { slug: string; template: InsightsTemplate };
  meta: InsightsPageMeta;
  faq: FaqItem[];
  stats: MarketStats;
  jobs: any[];
}

// Extract filters from stats/URL for breadcrumb
interface Filters {
  category?: string;
  region?: string;
  remote?: boolean;
}

export function PageClient({ locale, config, meta, faq, stats, jobs }: PageClientProps) {
  const { t } = useTranslation('insights');

  // Extract filters from config slug (e.g., "python/europe" or "python")
  const filters: Filters = {};
  const slugParts = config.slug.split('/');
  if (config.template === 'category-only') {
    filters.category = slugParts[0];
  } else if (config.template === 'region-only') {
    filters.region = slugParts[0];
  } else if (config.template === 'remote-jobs') {
    filters.remote = true;
  } else if (config.template === 'category-region') {
    filters.category = slugParts[0];
    filters.region = slugParts[1];
  }

  // Empty state check
  const hasActiveJobs = stats.jobsLast7Days > 0;
  const hasHistoricalData = stats.totalJobs > 0;

  return (
    <>
      <FaqSchema faq={faq} />
      <BreadcrumbSchema
        locale={locale}
        slug={config.slug}
        template={config.template}
        category={filters.category}
        region={filters.region}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          locale={locale}
          slug={config.slug}
          template={config.template}
          category={filters.category}
          region={filters.region}
        />
        {/* Header */}
        {/* Header */}
        <header className="mb-10 text-center md:text-left relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent p-8 md:p-12 border border-primary/10">
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-1 dark:from-white dark:to-gray-400">
              {meta.h1}
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </div>

          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </header>

        {/* Empty State Warning */}
        {!hasActiveJobs && hasHistoricalData && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
            <p className="font-medium">No active jobs right now</p>
            <p className="text-sm mt-1">
              {stats.totalJobs} jobs posted in the last 30 days. Subscribe to get alerts when new
              positions are available.
            </p>
          </div>
        )}

        {/* Stats Overview */}
        <section className="mb-8">
          <StatsOverview
            totalJobs={stats.totalJobs}
            jobsLast7Days={stats.jobsLast7Days}
            avgSalary={stats.avgSalary}
          />
        </section>

        {/* Main Charts Layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12 mb-8">
          {/* Trend Chart - Full Width (Hero Chart) */}
          <div className="lg:col-span-12">
            <TrendChart data={stats.trendData} />
          </div>

          {/* Row 1: Skills & Salary */}
          <div className="lg:col-span-7">
            <TechStackChart data={stats.topSkills} />
          </div>
          <div className="lg:col-span-5">
            <SalaryBandsChart data={stats.salaryBands} />
          </div>

          {/* Row 2: Experience & Recent Jobs Side-by-Side */}
          <div className="lg:col-span-4">
            <ExperienceLevelsChart data={stats.experienceLevels} />
          </div>

          {/* Recent Jobs - Moves up to sit next to Experience chart */}
          <div className="lg:col-span-8">
            <RecentJobs jobs={jobs} jobsLast7Days={stats.jobsLast7Days} />
          </div>
        </div>

        {/* FAQ Section */}
        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{t('faq.title')}</h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <details key={index} className="p-4 border rounded-lg">
                  <summary className="font-semibold cursor-pointer">{item.question}</summary>
                  <p className="mt-2 text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
