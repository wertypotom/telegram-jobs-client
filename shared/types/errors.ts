/**
 * Error Type Definitions
 */

export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface ClassifiedError {
  type: ErrorType;
  message: string;
  originalError: any;
  statusCode?: number;
  retryable: boolean;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: any;
}
