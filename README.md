# Telegram Job Scraper Frontend

> A Next.js 15 application for browsing Telegram job postings and generating AI-tailored resumes with Telegram authentication.

## 🎯 Project Overview

This is a modern, production-ready Next.js 15 application built with React 19, TypeScript, Tailwind CSS 4, and React Query. The application connects to a backend API to browse job postings scraped from Telegram channels and generate AI-powered tailored resumes for each position.

## 🏗️ Architecture

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS with OKLCH colors
- **React Query** (@tanstack/react-query) - Server state management
- **Zustand** - Client state management (if needed)
- **Axios** - HTTP client
- **shadcn/ui** - Component system

### Design Patterns

1. **Centralized API Client**: All API calls go through a single axios instance with interceptors
2. **React Query for Data Fetching**: All server state managed with React Query hooks
3. **Structured Routes**: Each route has `api/`, `components/`, `ui/`, `hooks/`, `utils/`, `page.tsx`, `layout.tsx`
4. **Reusable Components**: UI components separated from business logic

## 📦 Folder Structure

```
app/
├── (auth)/                      # Authentication routes
│   ├── login/
│   │   ├── components/
│   │   │   └── telegram-login-button.tsx
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/                 # Protected dashboard routes
│   ├── jobs/
│   │   ├── [id]/
│   │   │   └── page.tsx        # Job detail + tailoring
│   │   ├── components/
│   │   │   ├── job-list.tsx
│   │   │   └── job-filters.tsx
│   │   └── page.tsx
│   ├── resume/
│   │   └── page.tsx            # Resume upload
│   ├── profile/
│   │   └── page.tsx
│   └── layout.tsx
├── components/                  # Landing page components
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── features-section.tsx
│   ├── how-it-works-section.tsx
│   ├── cta-section.tsx
│   └── footer.tsx
├── layout.tsx                   # Root layout
├── page.tsx                     # Landing page
└── globals.css

shared/
├── api/                         # API functions
│   ├── auth.api.ts
│   ├── jobs.api.ts
│   ├── resume.api.ts
│   ├── sniper.api.ts
│   └── index.ts
├── hooks/                       # React Query hooks
│   ├── use-auth.ts
│   ├── use-jobs.ts
│   ├── use-resume.ts
│   ├── use-sniper.ts
│   └── index.ts
├── lib/
│   └── api-client.ts           # Centralized axios instance
├── providers/
│   └── query-provider.tsx      # React Query provider
├── types/
│   ├── api.ts                  # API types
│   └── models.ts               # Domain models
├── ui/                          # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── skeleton.tsx
│   └── index.ts
├── utils/
│   └── cn.ts                   # Class name utility
└── constants/
    └── routes.ts               # Route constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Backend API running (default: http://localhost:3000)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your values
# NEXT_PUBLIC_API_URL=http://localhost:3000
# NEXT_PUBLIC_TELEGRAM_BOT_NAME=your_bot_name
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## 🎨 Features

### Landing Page
- Hero section with CTA
- Features showcase
- How it works section
- Responsive design

### Authentication
- Telegram Login Widget integration
- JWT token management
- Protected routes

### Job Feed
- Browse jobs from Telegram channels
- Filter by tech stack, level, remote status
- Pagination
- Real-time data with React Query

### Job Detail & Tailoring
- View full job description
- Generate tailored resume with AI
- Download PDF and DOCX
- Get Telegram message template
- View cover letter

### Resume Management
- Drag-and-drop file upload
- PDF and DOCX support
- File validation (type, size)
- Resume preview

### Profile
- Account information
- Logout functionality

## 🔧 Configuration

### Environment Variables

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Telegram Bot Name for Login Widget
NEXT_PUBLIC_TELEGRAM_BOT_NAME=your_bot_name
```

### API Client

The centralized API client (`shared/lib/api-client.ts`) handles:
- Base URL configuration
- Token injection from localStorage
- 401 error handling (auto-redirect to login)
- Request/response interceptors

### React Query

Default configuration in `shared/providers/query-provider.tsx`:
- Stale time: 1 minute
- Refetch on window focus: disabled

## 📝 Code Style

### TypeScript
- Strict mode enabled
- Explicit types for all functions
- Type imports with `import type`

### Components
- Server components by default
- Client components marked with `'use client'`
- Named exports for components
- Arrow functions for event handlers

### Styling
- Tailwind CSS utilities
- OKLCH color space for design tokens
- Dark mode support via CSS variables
- `cn()` utility for conditional classes

### API Integration
- All API calls through centralized client
- React Query hooks for data fetching
- Separate API functions from components
- TypeScript types for all requests/responses

## 🎯 Key Patterns

### Data Fetching with React Query

```typescript
// In shared/hooks/use-jobs.ts
export function useJobs(params: JobsRequest = {}) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => jobsApi.getJobs(params),
  });
}

// In component
const { data, isLoading, error } = useJobs({ stack: 'react' });
```

### API Functions

```typescript
// In shared/api/jobs.api.ts
export const jobsApi = {
  getJobs: async (params: JobsRequest = {}): Promise<JobsResponse> => {
    const response = await apiClient.get<ApiResponse<JobsResponse>>('/api/jobs', {
      params,
    });
    return response.data.data;
  },
};
```

### Component Structure

```typescript
// Reusable component (receives data as props)
export function JobList({ jobs, total }: JobListProps) {
  // Pure presentational logic
}

// Page component (fetches data)
export default function JobsPage() {
  const { data } = useJobs();
  return <JobList jobs={data.jobs} total={data.total} />;
}
```

## 🔒 Authentication Flow

1. User clicks "Login with Telegram" on `/login`
2. Telegram Widget loads and user authenticates
3. Callback receives Telegram user data
4. Frontend calls `/api/auth/login` with Telegram data
5. Backend returns JWT token
6. Token stored in localStorage
7. API client injects token in all requests
8. Protected routes check for token

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Environment Variables

Set in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_TELEGRAM_BOT_NAME`

## 📚 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Design System

### Colors (OKLCH)
- Primary: `oklch(45% 0.2 264)` / `oklch(70% 0.2 264)` (dark)
- Background: `oklch(100% 0 0)` / `oklch(10% 0 0)` (dark)
- Muted: `oklch(96% 0 0)` / `oklch(20% 0 0)` (dark)

### Typography
- Font: Inter (Google Fonts)
- Responsive sizing with Tailwind utilities

### Components
- Button variants: default, destructive, outline, secondary, ghost, link
- Card with header, content, footer
- Input with focus states
- Badge variants: default, secondary, destructive, outline

## 🚧 Future Enhancements

- [ ] Add tests (Jest, React Testing Library)
- [ ] Implement infinite scroll for job feed
- [ ] Add job bookmarking
- [ ] Email notifications
- [ ] Resume templates
- [ ] Analytics dashboard
- [ ] PWA support

## 📄 License

MIT

---

**Last Updated**: 2025-01-29  
**Version**: 1.0.0  
**Status**: Production Ready
