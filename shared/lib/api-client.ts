import axios, { type AxiosInstance, type AxiosError } from 'axios';
import { toast } from 'sonner';
import { logError, classifyError } from './error-utils';
import { ErrorType } from '../types/errors';

// In production, use Next.js proxy to keep cookies on same domain
// In development, call API directly
const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/backend'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

//Track if we're already redirecting to prevent infinite loops
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

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Classify the error
        const classified = classifyError(error);

        // Log all errors
        logError('API Client', error, {
          url: error.config?.url,
          method: error.config?.method,
        });

        // Handle specific error types globally
        switch (classified.type) {
          case ErrorType.AUTHENTICATION:
            // Unauthorized - redirect to login (only once)
            if (typeof window !== 'undefined' && !isRedirecting) {
              isRedirecting = true;
              toast.error('Session expired. Please log in again.');
              setTimeout(() => {
                window.location.href = '/';
              }, 1000);
            }
            break;

          case ErrorType.RATE_LIMIT:
            // Show rate limit toast (don't need to show in hooks)
            toast.error(classified.message);
            break;

          case ErrorType.SERVER:
            // Server errors - show global toast
            // Individual hooks can override with custom messages
            if (classified.statusCode && classified.statusCode >= 500) {
              toast.error(classified.message);
            }
            break;

          case ErrorType.NETWORK:
            // Network errors - important to surface
            toast.error(classified.message);
            break;

          // For other types, let individual hooks handle the messaging
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
