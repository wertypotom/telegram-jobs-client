'use client';

import type { InsightsTemplate } from '../types/insights.types';

interface BreadcrumbSchemaProps {
  locale: 'en' | 'ru';
  slug: string;
  template: InsightsTemplate;
  category?: string;
  region?: string;
}

export function BreadcrumbSchema({
  locale,
  slug,
  template,
  category,
  region,
}: BreadcrumbSchemaProps) {
  const siteUrl = 'https://jobsniper.work';

  const t = {
    en: { home: 'Home', insights: 'Insights', jobs: 'Jobs', remote: 'Remote' },
    ru: { home: 'Главная', insights: 'Аналитика', jobs: 'Вакансии', remote: 'Удаленные' },
  };
  const trans = t[locale];

  // Build breadcrumb items
  const items = [
    { name: trans.home, url: `${siteUrl}/${locale}` },
    { name: trans.insights, url: `${siteUrl}/${locale}/insights` },
  ];

  // Add final item based on template
  let finalName = '';
  if (template === 'category-only' && category) {
    finalName = `${category.charAt(0).toUpperCase()}${category.slice(1)} ${trans.jobs}`;
  } else if (template === 'region-only' && region) {
    finalName = `${trans.jobs} in ${region.charAt(0).toUpperCase()}${region.slice(1)}`;
  } else if (template === 'remote-jobs') {
    finalName = `${trans.remote} ${trans.jobs}`;
  } else if (template === 'category-region' && category && region) {
    finalName = `${category.charAt(0).toUpperCase()}${category.slice(1)} in ${region.charAt(0).toUpperCase()}${region.slice(1)}`;
  }

  items.push({ name: finalName, url: `${siteUrl}/${locale}/insights/${slug}` });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
