import { apiClient } from '../lib/api-client';
import type { ApiResponse } from '../types/api';

export interface ChannelInfo {
  username: string;
  title: string;
  description?: string;
  memberCount?: number;
  isJoined: boolean;
}

export interface RecommendedChannel {
  username: string;
  title: string;
  description: string;
  category: string;
  memberCount: string;
}

export interface SubscribeChannelsRequest {
  channels: string[];
}

export interface SubscribeChannelsResponse {
  success: boolean;
  jobsCount: number;
}

export const channelApi = {
  getUserChannels: async (): Promise<ChannelInfo[]> => {
    const response = await apiClient.get<ApiResponse<ChannelInfo[]>>('/api/channels/user-channels');
    return response.data.data;
  },

  getRecommendedChannels: async (): Promise<RecommendedChannel[]> => {
    const response = await apiClient.get<ApiResponse<RecommendedChannel[]>>(
      '/api/channels/recommended'
    );
    return response.data.data;
  },

  searchChannels: async (query: string): Promise<ChannelInfo[]> => {
    const response = await apiClient.post<ApiResponse<ChannelInfo[]>>('/api/channels/search', {
      query,
    });
    return response.data.data;
  },

  subscribeToChannels: async (channels: string[]): Promise<SubscribeChannelsResponse> => {
    const response = await apiClient.post<ApiResponse<SubscribeChannelsResponse>>(
      '/api/channels/subscribe',
      { channels }
    );
    return response.data.data;
  },

  getSubscribedChannels: async (): Promise<string[]> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/api/channels/subscribed');
    return response.data.data;
  },

  addChannels: async (
    channels: string[]
  ): Promise<SubscribeChannelsResponse & { totalChannels: number }> => {
    const response = await apiClient.post<
      ApiResponse<SubscribeChannelsResponse & { totalChannels: number }>
    >('/api/channels/add', { channels });
    return response.data.data;
  },
};
