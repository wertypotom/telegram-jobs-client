'use client';

import { useTranslation } from 'react-i18next';
import { StatsOverview } from './stats-overview';
import { TechStackChart } from '@/app/[locale]/insights/[slug]/components/charts/tech-stack-chart';
import { SalaryBandsChart } from '@/app/[locale]/insights/[slug]/components/charts/salary-bands-chart';
import { ExperienceLevelsChart } from '@/app/[locale]/insights/[slug]/components/charts/experience-levels-chart';
import { TrendChart } from '@/app/[locale]/insights/[slug]/components/charts/trend-chart';
import type { FaqItem, InsightsPageMeta, MarketStats } from '../types/insights.types';

interface PageClientProps {
  meta: InsightsPageMeta;
  faq: FaqItem[];
  stats: MarketStats;
}

export function PageClient({ meta, faq, stats }: PageClientProps) {
  const { t } = useTranslation('insights');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{meta.h1}</h1>
        <p className="text-lg text-muted-foreground mb-2">{meta.description}</p>
        <p className="text-sm text-muted-foreground">
          {t('heading.updated', { time: stats.updatedAt })}
        </p>
      </header>

      {/* Stats Overview */}
      <StatsOverview
        totalJobs={stats.totalJobs}
        jobsLast7Days={stats.jobsLast7Days}
        avgSalary={stats.avgSalary}
      />

      {/* Charts Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <TechStackChart data={stats.topSkills} />
        <SalaryBandsChart data={stats.salaryBands} />
        <ExperienceLevelsChart data={stats.experienceLevels} />
        <TrendChart data={stats.trendData} />
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
  );
}
