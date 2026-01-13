/**
 * Centralized API Configuration
 * Single source of truth for all API URLs across the application
 */

/**
 * Backend API base URL (external server)
 * - Development: localhost:4000
 * - Production: Your backend API URL (e.g., Render, Railway, etc.)
 */
export const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Client-side proxy path (Next.js rewrite)
 * Used in production to keep requests on same domain for cookies
 */
export const CLIENT_PROXY_PATH = '/api/backend';

/**
 * API timeout in milliseconds
 */
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * Get appropriate API URL based on environment
 * Automatically detects server-side vs client-side execution
 * @returns API base URL
 */
export const getApiUrl = (): string => {
  const isServer = typeof window === 'undefined';

  // Server-side (SSR/SSG): Always use absolute URL
  if (isServer) {
    return BACKEND_API_URL;
  }

  // Client-side:
  // - Production: Use proxy to keep cookies on same domain
  // - Development: Direct call to backend
  return process.env.NODE_ENV === 'production' ? CLIENT_PROXY_PATH : BACKEND_API_URL;
};
