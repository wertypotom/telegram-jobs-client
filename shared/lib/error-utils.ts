import { ErrorType, ClassifiedError } from '../types/errors';
import { ERROR_MESSAGES, getMessageForStatusCode } from '../constants/error-messages';

/**
 * Classify an error to determine its type and handling strategy
 */
export function classifyError(error: any): ClassifiedError {
  // Network errors
  if (error?.message === 'Network Error' || error?.code === 'ERR_NETWORK') {
    return {
      type: ErrorType.NETWORK,
      message: ERROR_MESSAGES.NETWORK_ERROR,
      originalError: error,
      retryable: true,
    };
  }

  // Timeout errors
  if (error?.code === 'ECONNABORTED') {
    return {
      type: ErrorType.NETWORK,
      message: ERROR_MESSAGES.TIMEOUT,
      originalError: error,
      retryable: true,
    };
  }

  const statusCode = error?.response?.status;

  // HTTP errors
  if (statusCode) {
    if (statusCode === 401) {
      return {
        type: ErrorType.AUTHENTICATION,
        message: ERROR_MESSAGES.UNAUTHORIZED,
        originalError: error,
        statusCode,
        retryable: false,
      };
    }

    if (statusCode === 403) {
      return {
        type: ErrorType.AUTHORIZATION,
        message: ERROR_MESSAGES.FORBIDDEN,
        originalError: error,
        statusCode,
        retryable: false,
      };
    }

    if (statusCode === 429) {
      return {
        type: ErrorType.RATE_LIMIT,
        message: ERROR_MESSAGES.RATE_LIMIT,
        originalError: error,
        statusCode,
        retryable: true,
      };
    }

    if (statusCode >= 500) {
      return {
        type: ErrorType.SERVER,
        message: getMessageForStatusCode(statusCode),
        originalError: error,
        statusCode,
        retryable: true,
      };
    }

    if (statusCode >= 400 && statusCode < 500) {
      // Client error - use server message if available
      const serverMessage = error?.response?.data?.message;
      return {
        type: ErrorType.VALIDATION,
        message: serverMessage || getMessageForStatusCode(statusCode),
        originalError: error,
        statusCode,
        retryable: false,
      };
    }
  }

  // API errors with custom messages
  const apiMessage = error?.response?.data?.message;
  if (apiMessage) {
    return {
      type: ErrorType.API,
      message: apiMessage,
      originalError: error,
      statusCode,
      retryable: false,
    };
  }

  // Unknown errors
  return {
    type: ErrorType.UNKNOWN,
    message: error?.message || ERROR_MESSAGES.UNKNOWN_ERROR,
    originalError: error,
    retryable: false,
  };
}

/**
 * Extract user-friendly error message from any error
 * This is a simplified version for quick use - classifyError provides more detail
 */
export function getErrorMessage(error: any): string {
  const classified = classifyError(error);
  return classified.message;
}

/**
 * Log error with context (for debugging and future monitoring integration)
 */
export function logError(context: string, error: any, additionalInfo?: Record<string, any>) {
  const classified = classifyError(error);

  console.error(`[${context}] Error occurred:`, {
    type: classified.type,
    message: classified.message,
    statusCode: classified.statusCode,
    retryable: classified.retryable,
    additionalInfo,
    originalError: classified.originalError,
  });

  // Future: Send to error monitoring service (Sentry, LogRocket, etc.)
  // if (process.env.NODE_ENV === 'production') {
  //   sendToMonitoring({ context, classified, additionalInfo });
  // }
}

/**
 * Determine if an error is retryable
 */
export function isRetryableError(error: any): boolean {
  const classified = classifyError(error);
  return classified.retryable;
}
