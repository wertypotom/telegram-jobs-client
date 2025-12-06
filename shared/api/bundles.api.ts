import { apiClient } from '../lib/api-client';
import type { ApiResponse } from '../types/api';

export interface Bundle {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name from Lucide
  channels: string[];
  order: number;
  category: string;
}

export const bundlesApi = {
  getBundles: async (): Promise<Bundle[]> => {
    const response = await apiClient.get<ApiResponse<Bundle[]>>('/api/bundles');
    return response.data.data;
  },

  getBundleById: async (id: string): Promise<Bundle> => {
    const response = await apiClient.get<ApiResponse<Bundle>>(`/api/bundles/${id}`);
    return response.data.data;
  },
};
