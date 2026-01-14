'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { InsightsTemplate } from '../types/insights.types';

interface BreadcrumbProps {
  locale: 'en' | 'ru';
  slug: string;
  template: InsightsTemplate;
  category?: string;
  region?: string;
}

export function Breadcrumb({ locale, slug: _slug, template, category, region }: BreadcrumbProps) {
  const t = {
    en: {
      home: 'Home',
      insights: 'Insights',
      jobs: 'Jobs',
      remote: 'Remote',
      worldwide: 'Worldwide',
    },
    ru: {
      home: 'Главная',
      insights: 'Аналитика',
      jobs: 'Вакансии',
      remote: 'Удаленные',
      worldwide: 'Весь мир',
    },
  };

  const trans = t[locale];

  // Build breadcrumb path based on template
  const items: Array<{ label: string; href?: string }> = [
    { label: trans.home, href: `/` },
    { label: trans.insights, href: `/${locale}/insights` },
  ];

  // Add category/region based on template
  if (template === 'category-only' && category) {
    items.push({ label: `${category.charAt(0).toUpperCase()}${category.slice(1)} ${trans.jobs}` });
  } else if (template === 'region-only' && region) {
    items.push({ label: `${trans.jobs} in ${region.charAt(0).toUpperCase()}${region.slice(1)}` });
  } else if (template === 'remote-jobs') {
    items.push({ label: `${trans.remote} ${trans.jobs}` });
  } else if (template === 'category-region' && category && region) {
    items.push({
      label: `${category.charAt(0).toUpperCase()}${category.slice(1)} in ${region.charAt(0).toUpperCase()}${region.slice(1)}`,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index === 0 && <Home className="h-4 w-4" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
