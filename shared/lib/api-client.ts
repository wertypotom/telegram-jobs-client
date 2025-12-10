import axios, { type AxiosInstance, type AxiosError } from 'axios';

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
    });

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login (only once)
          if (typeof window !== 'undefined' && !isRedirecting) {
            isRedirecting = true;
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient().getInstance();
