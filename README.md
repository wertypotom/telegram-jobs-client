# JobSniper - Telegram Job Aggregator

> An intelligent job discovery platform that aggregates job postings from Telegram channels with advanced filtering and AI-powered resume tailoring.

## 🎯 Overview

**JobSniper** is a job search automation platform that:

1. **Aggregates job postings** from curated Telegram channels in real-time
2. **Filters and categorizes** jobs using multi-dimensional filters
3. **Generates AI-tailored resumes** for each position
4. **Streamlines applications** with one-click resume generation

### The Problem

Job seekers waste hours browsing multiple Telegram channels, manually filtering irrelevant postings, and tailoring resumes for each application.

### The Solution

A centralized dashboard that aggregates jobs from Telegram, applies intelligent filters, and generates customized application materials—all in one place.

## 🏗️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **React Query** (@tanstack/react-query) - Server state management
- **Zustand** - Client state management
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library
- **NextAuth.js** - Authentication
- **Sonner** - Toast notifications
- **Fuse.js** - Fuzzy search
- **date-fns** - Date utilities

### Backend

- **Node.js** with **Express**
- **MongoDB** - Database
- **Telegram API** - Job scraping
- **AI Integration** - Resume tailoring

## 📦 Project Structure

```
telegram-jobs-client/
├── app/                          # Next.js App Router
│   ├── (dashboard)/              # Protected routes
│   │   ├── components/           # Shared dashboard components
│   │   │   ├── channels/         # Channel management (modals)
│   │   │   │   ├── *.tsx (7 components)
│   │   │   │   ├── hooks/        # Channel hooks
│   │   │   │   └── api/          # Channel API
│   │   │   └── bundles/          # Bundle components
│   │   ├── jobs/                 # Jobs feature
│   │   │   ├── page.tsx          # Job feed
│   │   │   ├── [id]/page.tsx     # Job details
│   │   │   ├── components/       # Job-specific components (14)
│   │   │   ├── hooks/            # Job hooks (2)
│   │   │   ├── api/              # Job APIs (2)
│   │   │   └── store/            # Job state
│   │   ├── profile/              # User profile
│   │   ├── resume/               # Resume upload
│   │   ├── settings/             # Settings
│   │   └── layout.tsx            # Dashboard layout
│   ├── components/               # Landing page components
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── shared/                       # Shared code (cross-feature)
│   ├── api/                      # API functions
│   │   ├── auth.api.ts
│   │   ├── bundles.api.ts
│   │   ├── preferences.api.ts
│   │   ├── notification.api.ts
│   │   ├── resume.api.ts
│   │   ├── sniper.api.ts
│   │   ├── stats.api.ts
│   │   └── index.ts
│   ├── hooks/                    # React Query hooks
│   │   ├── use-auth.ts
│   │   ├── use-bundles.ts
│   │   ├── use-jobs.ts
│   │   ├── use-resume.ts
│   │   ├── use-sniper.ts
│   │   ├── use-platform-stats.ts
│   │   ├── use-intersection-observer.ts
│   │   ├── use-scroll-restoration.ts
│   │   └── index.ts
│   ├── store/                    # Global UI state
│   │   ├── ui-store.ts
│   │   └── use-login-modal.ts
│   ├── domain/                   # Business logic
│   │   └── user-permissions.ts
│   ├── types/                    # TypeScript types
│   │   ├── models.ts
│   │   └── api.ts
│   ├── lib/                      # Utilities
│   │   ├── api-client.ts         # Axios instance
│   │   └── error-utils.ts
│   ├── ui/                       # shadcn/ui components
│   ├── utils/                    # Helper functions
│   ├── config/                   # Configuration
│   ├── providers/                # React providers
│   └── constants/                # Constants
│
├── auth.ts                       # NextAuth configuration
├── middleware.ts                 # Route protection
└── package.json
```

## 🎨 Architecture Principles

### 1. Feature-Based Organization

Features are self-contained with their own components, hooks, API, and state:

```
jobs/
├── page.tsx                 # Route entry
├── components/              # Feature components
├── hooks/                   # Feature hooks
├── api/                     # Feature API
└── store/                   # Feature state
```

### 2. Separation of Concerns

- **API Layer** (`shared/api/`): Pure API functions
- **Hooks Layer** (`shared/hooks/`): React Query hooks
- **Components Layer**: Presentational components
- **Pages Layer**: Data fetching and orchestration

### 3. Type Safety

- Explicit TypeScript types for all API requests/responses
- Separate `api.ts` (contracts) and `models.ts` (domain models)
- Strict mode enabled, no `any` types

### 4. State Management

- **Server State** (React Query): Jobs, user data, channels
- **Client State** (Zustand): UI state (modals, filters)
- **Local State** (useState): Component-specific state

### 5. Import Patterns

```typescript
// Local (within feature)
import { useInfiniteJobs } from './hooks/use-infinite-jobs';

// Cross-feature
import { ChannelOnboardingModal } from '../components/channels/channel-onboarding-modal';

// Shared
import { useAuth } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';
```

## 🔑 Key Features

### Channel Management

- **Bundle Onboarding**: Curated channel bundles for quick setup
- **Channel Discovery**: Explore and search available channels
- **Subscription Management**: Subscribe/unsubscribe with swap limits
- **Smart Limits**: Free tier (5 channels), premium (unlimited)

### Advanced Filtering

- **Job Criteria**: Role, seniority, tech stack (autocomplete)
- **Location**: Remote, hybrid, on-site preferences
- **Experience**: Slider for years of experience
- **Exclusions**: Mute keywords, excluded titles
- **Persistent filters** via preferences API

### Infinite Scroll Feed

- **Optimized pagination**: 20 jobs per page
- **Persistent cache**: 5-minute stale time
- **Intersection Observer**: Auto load-more
- **Skeleton loading** for smooth UX

### AI Resume Tailoring

- Upload base resume (PDF/DOCX)
- One-click tailored resume per job
- Download in multiple formats
- Auto-generated cover letters

### Payment & Subscriptions

- **LemonSqueezy Integration**: Secure payment processing
- **Subscription Management**: Premium tier unlock
- **Pricing Page**: Plan comparison (Free vs Premium)
- **Checkout Flow**: One-click upgrade to premium
- **Cancellation**: Self-service cancellation with access retention until period end
- **Status Tracking**: Real-time subscription status in account settings

### Authentication

- **Google OAuth**
- **Yandex OAuth**
- **Email Magic Links** (passwordless)
- JWT session strategy
- Protected routes with middleware

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x+
- npm 10.x+
- Backend API running

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local
```

### Environment Variables

Create `.env.local`:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-secret>

# OAuth Providers
GOOGLE_CLIENT_ID=<your-id>
GOOGLE_CLIENT_SECRET=<your-secret>
YANDEX_CLIENT_ID=<your-id>
YANDEX_CLIENT_SECRET=<your-secret>

# Email Provider
EMAIL_SERVER_HOST=smtp.mailersend.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=<your-username>
EMAIL_SERVER_PASSWORD=<your-password>
EMAIL_FROM=noreply@yourdomain.com

# Database
MONGODB_URI=<your-mongodb-uri>

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Generate secrets:**

```bash
openssl rand -base64 32
```

### Development

```bash
npm run dev
# → http://localhost:3000
```

### Production

```bash
npm run build
npm start
```

## 📚 Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## 🎨 Code Style

### TypeScript

```typescript
// ✅ Explicit return types
export function useJobs(): UseQueryResult<JobsResponse> {
  return useQuery({ ... });
}

// ✅ Type imports
import type { Job, User } from '@/shared/types/models';

// ✅ Interface over type for objects
interface JobCardProps {
  job: Job;
  onView: (id: string) => void;
}
```

### Components

```typescript
// ✅ Named exports
export function JobCard({ job }: JobCardProps) { ... }

// ✅ Early returns
if (isLoading) return <Skeleton />;
if (!data) return null;
```

### Styling

```typescript
// ✅ Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-xl" />

// ✅ cn() for conditional classes
<button className={cn(
  "px-4 py-2",
  isActive && "bg-cyan-500 text-white"
)} />
```

### Icons

Use [Lucide React](https://lucide.dev) for all icons:

```typescript
import { Sparkles, Briefcase, Loader2 } from 'lucide-react';

<Briefcase className="h-5 w-5 text-cyan-600" />
<Loader2 className="h-8 w-8 animate-spin" />
```

## 🔒 Authentication Flow

1. User visits landing page
2. Clicks "Sign In"
3. Chooses provider (Google/Yandex/Email)
4. OAuth redirect or magic link
5. Session created with JWT
6. First-time users: channel onboarding
7. Redirected to `/jobs` dashboard

## 🎯 Performance

- **Server Components** by default
- **React Query caching** to avoid redundant API calls
- **Lazy loading** for heavy components
- **Optimistic updates** for instant UI feedback
- **Intersection Observer** for efficient infinite scroll

## 📝 Contributing

This is a personal project, but feedback and suggestions are welcome!

## 📄 License

MIT License - feel free to use this project as a reference for your own work.

---

**Built with ❤️ using Next.js, React, and TypeScript**
