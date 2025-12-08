import { apiClient } from '../lib/api-client';
import type { ApiResponse } from '../types/api';

export interface NotificationSettings {
  enabled: boolean;
  subscribed: boolean;
  telegramChatId?: string;
  userId: string;
  filters: {
    stack?: string[];
    level?: string[];
    jobFunction?: string[];
    locationType?: string[];
    experienceYears?: {
      min?: number;
      max?: number;
    };
  };
  quietHours: {
    enabled: boolean;
    startHour: number;
    endHour: number;
    timezone: string;
  };
}

export interface UpdateNotificationSettings {
  enabled?: boolean;
  filters?: {
    stack?: string[];
    level?: string[];
    jobFunction?: string[];
    locationType?: string[];
    experienceYears?: {
      min?: number;
      max?: number;
    };
  };
  quietHours?: {
    enabled: boolean;
    startHour: number;
    endHour: number;
    timezone: string;
  };
}

export const notificationApi = {
  getSettings: async (): Promise<NotificationSettings> => {
    const response = await apiClient.get<ApiResponse<NotificationSettings>>(
      '/api/notifications/settings'
    );
    return response.data.data;
  },

  updateSettings: async (settings: UpdateNotificationSettings): Promise<void> => {
    await apiClient.post<ApiResponse<null>>('/api/notifications/settings', settings);
  },

  sendTestNotification: async (): Promise<void> => {
    await apiClient.post<ApiResponse<null>>('/api/notifications/test');
  },

  generateSubscriptionLink: async (): Promise<{ deepLink: string; token: string }> => {
    const response = await apiClient.post<ApiResponse<{ deepLink: string; token: string }>>(
      '/api/notifications/generate-link'
    );
    return response.data.data;
  },
};
