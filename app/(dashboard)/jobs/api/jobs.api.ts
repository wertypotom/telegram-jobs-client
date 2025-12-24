import { apiClient } from '@/shared/lib/api-client';
import type { ApiResponse } from '@/shared/types/api';
import type { Job } from '@/shared/types/models';

export interface JobFilters {
  jobFunction?: string[];
  level?: string[];
  stack?: string[];
  locationType?: string[];
  excludedTitles?: string[];
  muteKeywords?: string[];
  experienceYears?: { min: number; max: number };
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  limit: number;
  offset: number;
}

export const jobsApi = {
  getJobs: async (
    filters: JobFilters = {},
    pagination: { limit?: number; offset?: number } = {}
  ): Promise<JobsResponse> => {
    const response = await apiClient.post<ApiResponse<JobsResponse>>('/api/jobs/search', {
      filters,
      pagination,
    });
    return response.data.data;
  },

  getJobById: async (id: string): Promise<Job> => {
    const response = await apiClient.get<ApiResponse<Job>>(`/api/jobs/${id}`);
    return response.data.data;
  },

  markJobAsViewed: async (id: string): Promise<void> => {
    await apiClient.post(`/api/jobs/${id}/view`);
  },

  searchSkills: async (query: string = ''): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/api/jobs/skills/search', {
      params: { q: query },
    });
    return response.data.data;
  },

  searchJobFunctions: async (query: string = ''): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/api/jobs/functions/search', {
      params: { q: query },
    });
    return response.data.data;
  },
};
