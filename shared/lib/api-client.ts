import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { toast } from 'sonner';
import { getErrorMessage, getErrorCode, logError } from './error-utils';

// In production, use Next.js proxy to keep cookies on same domain
// In development, call API directly
const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/backend'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Track if we're already redirecting to prevent infinite loops
let isRedirecting = false;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important: Send cookies with requests
      timeout: 30000, // 30 second timeout
    });

    // Response interceptor - minimal global handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const errorCode = getErrorCode(error);
        const errorMessage = getErrorMessage(error);

        // Log for debugging (future: send to monitoring)
        logError('API Client', error);

        // Global handling for authentication errors only
        if (errorCode === 'UNAUTHORIZED' && !isRedirecting) {
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
