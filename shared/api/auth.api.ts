import { apiClient } from '../lib/api-client';
import type {
  SendTelegramCodeRequest,
  SendTelegramCodeResponse,
  VerifyTelegramCodeRequest,
  AuthResponse,
  ApiResponse,
} from '../types/api';

export const authApi = {
  sendTelegramCode: async (data: SendTelegramCodeRequest): Promise<SendTelegramCodeResponse> => {
    const response = await apiClient.post<ApiResponse<SendTelegramCodeResponse>>(
      '/api/auth/telegram/send-code',
      data
    );
    return response.data.data;
  },

  verifyTelegramCode: async (data: VerifyTelegramCodeRequest): Promise<AuthResponse | { requires2FA: true }> => {
    const response = await apiClient.post<ApiResponse<AuthResponse | { requires2FA: true }>>(
      '/api/auth/telegram/verify-code',
      data
    );
    return response.data.data;
  },

  verifyTelegramPassword: async (data: { phoneNumber: string; password: string }): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/api/auth/telegram/verify-password',
      data
    );
    return response.data.data;
  },
};
