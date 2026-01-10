import { type AxiosError } from 'axios';

/**
 * Standardized server error response format
 */
interface ApiErrorResponse {
  success: false;
  error: {
    code: string; // ErrorCode from server
    message: string; // User-friendly message from server
    statusCode: number;
    stack?: string; // Development only
  };
}

/**
 * Extract error message from server response
 * Server is source of truth - client just displays what server sends
 */
export function getErrorMessage(error: unknown): string {
  // Axios error with server response
  if (isAxiosError(error) && error.response?.data) {
    const apiError = error.response.data as ApiErrorResponse;
    if (apiError.error?.message) {
      return apiError.error.message;
    }
  }

  // Network errors (no server response)
  if (isAxiosError(error) && error.message === 'Network Error') {
    return 'Connection lost. Please check your internet connection.';
  }

  // Timeout errors
  if (isAxiosError(error) && error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  // Fallback for unknown errors
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Extract error code from server response (for conditional logic if needed)
 */
export function getErrorCode(error: unknown): string | undefined {
  if (isAxiosError(error) && error.response?.data) {
    const apiError = error.response.data as ApiErrorResponse;
    return apiError.error?.code;
  }
  return undefined;
}

/**
 * Type guard for Axios errors
 */
function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

/**
 * Log error for debugging (future: integrate with monitoring service)
 */
export function logError(context: string, error: unknown) {
  const code = getErrorCode(error);
  const message = getErrorMessage(error);

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, {
      code,
      message,
      error,
    });
  }

  // Send to Sentry in production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.captureException(error, {
        tags: {
          context,
          errorCode: code,
        },
        extra: {
          message,
        },
      });
    });
  }
}
