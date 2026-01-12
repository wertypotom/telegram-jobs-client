'use client';

import { useQuery } from '@tanstack/react-query';
import type { InsightsPageData } from '../types/insights.types';
import { insightsApi } from '../api/insights.api';

export function useInsightsPage(slug: string, locale: string) {
  return useQuery<InsightsPageData>({
    queryKey: ['insights-page', slug, locale],
    queryFn: () => insightsApi.getPageData(slug, locale),
    staleTime: 1000 * 60 * 60,
  });
}
