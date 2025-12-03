import type { Job, User } from './models';

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// User from /api/auth/me
// Imported from ./models

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
}

// Auth
export interface SendTelegramCodeRequest {
  phoneNumber: string;
}

export interface SendTelegramCodeResponse {
  phoneCodeHash: string;
  message: string;
}

export interface VerifyTelegramCodeRequest {
  phoneNumber: string;
  code: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Jobs
export interface JobsRequest {
  stack?: string;
  level?: string;
  isRemote?: boolean;
  limit?: number;
  offset?: number;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  limit: number;
  offset: number;
}

// Resume
export interface ResumeUploadResponse {
  message: string;
  resumeText: string;
  fileUrl: string;
}

// Sniper
export interface GenerateTailoredResumeRequest {
  jobId: string;
}

export interface GenerateTailoredResumeResponse {
  pdfUrl: string;
  docxUrl: string;
  telegramMessage: string;
  coverLetter: string;
}
