import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { toast } from 'sonner';
import { getErrorMessage, getErrorCode, logError } from './error-utils';
import { getApiUrl, API_TIMEOUT } from '@/shared/config/api.config';

// Track if we're already redirecting to prevent infinite loops
let isRedirecting = false;

/**
 * Universal API client for both client-side and server-side usage
 * Automatically uses correct URL based on environment:
 * - Server (SSR/SSG): Absolute URL to backend
 * - Client (Browser): Next.js proxy in production, direct in dev
 */
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: getApiUrl(), // Auto-detects server vs client
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important: Send cookies with requests
      timeout: API_TIMEOUT,
    });

    // Response interceptor - only for client-side errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const errorCode = getErrorCode(error);
        const errorMessage = getErrorMessage(error);

        // Log for debugging
        logError('API Client', error);

        // Global handling for authentication errors only (client-side only)
        if (typeof window !== 'undefined' && errorCode === 'UNAUTHORIZED' && !isRedirecting) {
          isRedirecting = true;
          toast.error(errorMessage);
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }

        // Always reject so hooks can handle errors individually
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient().getInstance();
