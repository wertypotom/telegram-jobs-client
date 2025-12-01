export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  JOB_DETAIL: (id: string) => `/jobs/${id}`,
  RESUME: '/resume',
  PROFILE: '/profile',
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  JOBS: {
    LIST: '/api/jobs',
    DETAIL: (id: string) => `/api/jobs/${id}`,
  },
  RESUME: {
    UPLOAD: '/api/resume/upload',
  },
  SNIPER: {
    GENERATE: '/api/sniper/generate',
  },
} as const;
