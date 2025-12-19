/**
 * User-friendly error message catalog
 */

export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Connection lost. Please check your internet connection.',
  TIMEOUT: 'Request timed out. Please try again.',

  // Authentication/Authorization
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: "You don't have permission to perform this action.",

  // Resource limits
  SWAP_LIMIT:
    "You've reached your monthly swap limit (6/month). Upgrade to Pro for unlimited swaps.",
  CHANNEL_LIMIT: "You've hit the 5 channel limit. Upgrade to Pro for unlimited channels.",

  // Rate limiting
  RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',

  // Server errors
  SERVER_ERROR: 'Something went wrong on our end. Please try again.',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.',

  // Generic fallback
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * Map HTTP status codes to user-friendly messages
 */
export function getMessageForStatusCode(statusCode: number): string {
  switch (statusCode) {
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 429:
      return ERROR_MESSAGES.RATE_LIMIT;
    case 503:
      return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
    case 500:
    case 502:
    case 504:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}
