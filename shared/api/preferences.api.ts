import { apiClient } from '../lib/api-client';
import type { ApiResponse } from '../types/api';
import type { JobFilters } from './jobs.api';

export const preferencesApi = {
  getFilters: async (): Promise<JobFilters> => {
    const response = await apiClient.get<ApiResponse<JobFilters>>('/api/users/preferences/filters');
    return response.data.data;
  },

  saveFilters: async (filters: JobFilters): Promise<JobFilters> => {
    const response = await apiClient.put<ApiResponse<JobFilters>>(
      '/api/users/preferences/filters',
      { filters }
    );
    return response.data.data;
  },
};
