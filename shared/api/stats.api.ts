import { apiClient } from '../lib/api-client';
import type { ApiResponse } from '../types/api';

export interface PlatformStats {
  activeChannels: number;
  jobsLast7Days: number;
  totalJobs: number;
}

export const statsApi = {
  getPlatformStats: async (): Promise<PlatformStats> => {
    const response = await apiClient.get<ApiResponse<PlatformStats>>('/api/stats/platform');
    return response.data.data;
  },
};
