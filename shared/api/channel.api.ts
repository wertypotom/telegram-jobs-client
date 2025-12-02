import { apiClient } from '../lib/api-client';
import type { ApiResponse } from '../types/api';

export interface ChannelInfo {
  username: string;
  title: string;
  description?: string;
  memberCount?: number;
  isJoined: boolean;
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
  ): Promise<SubscribeChannelsResponse & { totalChannels: number }> => {
    const response = await apiClient.post<
      ApiResponse<SubscribeChannelsResponse & { totalChannels: number }>
    >('/api/channels/add', { channels });
    return response.data.data;
  },
};
