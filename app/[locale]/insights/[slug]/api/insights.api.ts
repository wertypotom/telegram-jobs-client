import { apiClient } from '@/shared/lib/api-client';
import { InsightsPageData } from '../types/insights.types';

export const insightsApi = {
  /**
   * Get page configuration and stats by slug
   * Single endpoint returns both config and stats
   */
  async getPageData(slug: string, locale: string): Promise<InsightsPageData> {
    const response = await apiClient.get<{ data: InsightsPageData }>(
      `/api/market-insights/page/${slug}`,
      { params: { locale } }
    );
    return response.data.data;
  },

  /**
   * Get all active page slugs (for static params generation)
   */
  async getAllPageSlugs(): Promise<string[]> {
    const response = await apiClient.get<{ data: { slugs: string[] } }>(
      '/api/market-insights/slugs'
    );
    return response.data.data.slugs;
  },
};
