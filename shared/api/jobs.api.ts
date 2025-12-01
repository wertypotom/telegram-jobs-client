import { apiClient } from '../lib/api-client';
import type {
  JobsRequest,
  JobsResponse,
  ApiResponse,
} from '../types/api';
import type { Job } from '../types/models';

export const jobsApi = {
  getJobs: async (params: JobsRequest = {}): Promise<JobsResponse> => {
    const response = await apiClient.get<ApiResponse<JobsResponse>>('/api/jobs', {
      params,
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
};
