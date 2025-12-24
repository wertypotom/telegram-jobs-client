import { apiClient } from '@/shared/lib/api-client';
import type { ApiResponse } from '@/shared/types/api';

export interface ChannelInfo {
  username: string;
  title: string;
  description?: string;
  memberCount?: number | string; // Can be number or string (e.g. "80K+")
  isJoined: boolean;
  dailyJobCount?: number; // Average jobs per day
}

export interface SubscribeChannelsRequest {
  channels: string[];
}

export interface SubscribeChannelsResponse {
  success: boolean;
  jobsCount: number;
}

export interface ExploreChannelsRequest {
  searchQuery?: string;
  categories?: string[];
}

export interface ExploreChannelsResponse {
  channels: ChannelInfo[];
  missedJobsCount: number;
}

export const channelApi = {
  getUserChannels: async (): Promise<ChannelInfo[]> => {
    const response = await apiClient.get<ApiResponse<ChannelInfo[]>>('/api/channels/user-channels');
    return response.data.data;
  },

  getAvailableChannels: async (): Promise<ChannelInfo[]> => {
    const response = await apiClient.get<ApiResponse<ChannelInfo[]>>('/api/channels/available');
    return response.data.data;
  },

  subscribeToChannels: async (channels: string[]): Promise<SubscribeChannelsResponse> => {
    const response = await apiClient.post<ApiResponse<SubscribeChannelsResponse>>(
      '/api/channels/subscribe',
      { channels }
    );
    return response.data.data;
  },

  addChannels: async (
    channels: string[]
  ): Promise<SubscribeChannelsResponse & { totalChannels: number; swapsRemaining?: number }> => {
    const response = await apiClient.post<
      ApiResponse<SubscribeChannelsResponse & { totalChannels: number; swapsRemaining?: number }>
    >('/api/channels/add', { channels });
    return response.data.data;
  },

  exploreChannels: async (params: ExploreChannelsRequest): Promise<ExploreChannelsResponse> => {
    const response = await apiClient.get<ApiResponse<ExploreChannelsResponse>>(
      '/api/channels/explore',
      { params: { searchQuery: params.searchQuery, categories: params.categories?.join(',') } }
    );
    return response.data.data;
  },

  unsubscribeChannel: async (
    channelUsername: string
  ): Promise<{ success: boolean; totalChannels: number; swapsRemaining?: number }> => {
    const response = await apiClient.post<
      ApiResponse<{ success: boolean; totalChannels: number; swapsRemaining?: number }>
    >('/api/channels/unsubscribe', { channel: channelUsername });
    return response.data.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/api/channels/categories');
    return response.data.data;
  },
};
