import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { authApi } from '../api';
import { apiClient } from '../lib/api-client';
import type { 
  SendTelegramCodeRequest, 
  VerifyTelegramCodeRequest, 
  AuthResponse,
  ApiResponse,
} from '../types/api';
import type { User } from '../types/models';

export function useSendTelegramCode() {
  return useMutation({
    mutationFn: (data: SendTelegramCodeRequest) => authApi.sendTelegramCode(data),
  });
}

export function useVerifyTelegramCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyTelegramCodeRequest) => authApi.verifyTelegramCode(data),
    onSuccess: (data) => {
      // Only store token if authentication is complete (not 2FA required)
      if (!('requires2FA' in data) && data.token) {
        localStorage.setItem('auth_token', data.token);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  });
}

export function useVerifyTelegramPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { phoneNumber: string; password: string }) => 
      authApi.verifyTelegramPassword(data),
    onSuccess: (data: AuthResponse) => {
      // Store token
      localStorage.setItem('auth_token', data.token);
      // Invalidate user query
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('auth_token');
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/login';
    },
  });
}

export function useAuth() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>('/api/auth/me');
      const userData = response.data.data;
      return userData;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

}
