# JobSniper - Telegram Job Scraper Platform

> An intelligent job discovery platform that scrapes Telegram channels for job postings and generates AI-tailored resumes. Built with Next.js 15, React 19, and modern web technologies.

## 🎯 What I'm Building

**JobSniper** is a comprehensive job search automation platform that:

1. **Scrapes job postings** from curated Telegram channels in real-time
2. **Filters and categorizes** jobs using advanced multi-dimensional filters
3. **Generates AI-tailored resumes** for each position using Abacus.ai
4. **Provides intelligent job matching** based on user preferences and tech stack
5. **Streamlines the application process** with one-click resume generation and Telegram message templates

### The Problem

Job seekers waste hours browsing multiple Telegram channels, manually filtering irrelevant postings, and tailoring resumes for each application. This platform automates the entire workflow.

### The Solution

A centralized dashboard that aggregates jobs from Telegram, applies intelligent filters, and generates customized application materials with AI—all in one place.

## 🏗️ Architecture & Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router (server/client components)
- **React 19** - Latest React with improved performance
- **TypeScript** - Full type safety across the codebase
- **Tailwind CSS 4** - Utility-first CSS with modern OKLCH color space
- **React Query** (@tanstack/react-query) - Server state management & caching
- **Zustand** - Lightweight client state management
- **Axios** - HTTP client with interceptors
- **shadcn/ui** - Accessible, customizable component system built on Radix UI
- **Lucide React** - Beautiful, consistent icon library (1,500+ icons)
- **NextAuth.js v4** - Authentication with Google, Yandex, and Email providers
- **MongoDB** - Database via MongoDB Atlas with MongoDB Adapter
- **React Hook Form** - Performant form validation with Zod schemas
- **Sonner** - Toast notifications
- **Framer Motion** - Smooth animations and transitions
- **Fuse.js** - Fuzzy search for channel filtering
- **date-fns** - Modern date utility library

### Design Philosophy

#### 1. **Separation of Concerns**

- **API Layer** (`shared/api/`): Pure API functions, no UI logic
- **Hooks Layer** (`shared/hooks/`): React Query hooks wrapping API calls
- **Components Layer**: Presentational components receiving data as props
- **Pages Layer**: Data fetching and orchestration

#### 2. **Component-Driven Development**

- **Atomic Design**: Break complex UIs into small, reusable components
- **Single Responsibility**: Each component does one thing well
- **Composition over Inheritance**: Build complex UIs by composing simple components

Example: The `FiltersPanel` is composed of:

- `CategorySidebar` - Navigation between filter categories
- `JobCriteriaSection` - Job role, level, tech stack filters
- `LocationSection` - Remote/hybrid/on-site filters
- `TagInput` - Reusable tag input for exclusions
- `TechStackInput` - Autocomplete tech stack selector

#### 3. **Type Safety First**

- Explicit TypeScript types for all API requests/responses
- Separate `api.ts` (API contracts) and `models.ts` (domain models)
- No `any` types—strict mode enabled
- Type imports with `import type` for clarity

#### 4. **Centralized API Client**

All HTTP requests go through a single axios instance (`shared/lib/api-client.ts`) that:

- Injects JWT tokens automatically
- Handles 401 errors with auto-redirect to login
- Provides consistent error handling
- Enables request/response interceptors

#### 5. **React Query for Server State**

- All server data fetched via React Query hooks
- Automatic caching, refetching, and invalidation
- Optimistic updates for mutations
- Separation of server state (React Query) from client state (Zustand)

## 📦 Project Structure

```
telegram-jobs-client/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   └── login/                # Login page with OAuth providers
│   ├── (dashboard)/              # Protected routes
│   │   ├── components/           # Shared dashboard components
│   │   │   ├── channel-onboarding-modal.tsx  # First-time channel selection
│   │   │   ├── explore-channels-modal.tsx    # Channel discovery
│   │   │   ├── bundle-selection-step.tsx     # Bundle onboarding step
│   │   │   ├── bundle-card.tsx               # Bundle display card
│   │   │   ├── channel-manager.tsx           # Channel management
│   │   │   └── feedback-modal.tsx            # User feedback
│   │   ├── jobs/                 # Job feed & filters
│   │   │   ├── [id]/             # Job detail & AI tailoring
│   │   │   └── components/       # Job-specific components
│   │   │       ├── filters-panel.tsx          # Advanced filters drawer
│   │   │       ├── category-sidebar.tsx       # Filter category nav
│   │   │       ├── job-criteria-section.tsx   # Role/level/stack filters
│   │   │       ├── location-section.tsx       # Location filters
│   │   │       ├── tech-stack-input.tsx       # Autocomplete tech input
│   │   │       ├── tag-input.tsx              # Reusable tag input
│   │   │       ├── simple-tag-input.tsx       # Simple tag variant
│   │   │       ├── job-function-input.tsx     # Job role selector
│   │   │       ├── experience-slider.tsx      # Experience level slider
│   │   │       ├── job-list.tsx               # Job cards grid
│   │   │       ├── job-filters.tsx            # Quick filters bar
│   │   │       ├── job-skeleton.tsx           # Loading skeleton
│   │   │       └── debug-channel-widget.tsx   # Debug tool
│   │   ├── resume/               # Resume upload
│   │   ├── profile/              # User profile
│   │   ├── settings/             # User settings
│   │   └── layout.tsx            # Dashboard layout with sidebar
│   ├── api/                      # API routes
│   │   └── auth/[...nextauth]/   # NextAuth endpoints
│   ├── components/               # Landing page components
│   │   ├── header.tsx
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works-section.tsx
│   │   ├── cta-section.tsx
│   │   └── footer.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── providers.tsx             # Client providers wrapper
│   └── globals.css               # Global styles & CSS variables
│
├── shared/                       # Shared code across app
│   ├── api/                      # API functions (pure, no hooks)
│   │   ├── auth.api.ts           # Auth endpoints
│   │   ├── jobs.api.ts           # Job endpoints
│   │   ├── resume.api.ts         # Resume upload
│   │   ├── sniper.api.ts         # AI tailoring
│   │   ├── channel.api.ts        # Channel management
│   │   ├── bundles.api.ts        # Bundle endpoints
│   │   ├── preferences.api.ts    # User preferences
│   │   ├── notification.api.ts   # Notifications
│   │   ├── feedback.api.ts       # User feedback
│   │   ├── stats.api.ts          # Analytics/stats
│   │   └── index.ts              # Barrel exports
│   ├── hooks/                    # React Query hooks
│   │   ├── use-auth.ts           # useAuth, useLogin
│   │   ├── use-jobs.ts           # useJobs, useJob, useMarkJobAsViewed
│   │   ├── use-infinite-jobs.ts  # Infinite scroll jobs
│   │   ├── use-resume.ts         # useUploadResume
│   │   ├── use-sniper.ts         # useGenerateTailoredResume
│   │   ├── use-channels.ts       # Channel CRUD operations
│   │   ├── use-bundles.ts        # Bundle fetching
│   │   ├── use-preferences.ts    # User preferences
│   │   ├── use-categories.ts     # Job categories
│   │   ├── use-intersection-observer.ts  # Scroll detection
│   │   └── index.ts
│   ├── lib/
│   │   └── api-client.ts         # Centralized axios instance
│   ├── providers/
│   │   └── query-provider.tsx    # React Query provider
│   ├── store/
│   │   └── filters-store.ts      # Zustand filter state
│   ├── types/
│   │   ├── api.ts                # API request/response types
│   │   └── models.ts             # Domain models (Job, User, etc.)
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── checkbox.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── radio-group.tsx
│   │   ├── popover.tsx
│   │   ├── command.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── sonner.tsx
│   │   └── ...
│   ├── utils/
│   │   └── cn.ts                 # Tailwind class merger
│   ├── constants/
│   │   └── routes.ts             # Route constants
│   └── config/
│       └── tech-stack.ts         # Tech stack definitions
│
├── lib/
│   └── mongodb.ts                # MongoDB client
├── auth.ts                       # NextAuth configuration
├── middleware.ts                 # Route protection
└── package.json
```

## 💡 My Approach to Coding

### 1. **Component Composition**

I break down complex UIs into small, focused components. For example, the filters panel:

```typescript
// ❌ Bad: Monolithic component
function FiltersPanel() {
  // 500+ lines of JSX and logic
}

// ✅ Good: Composed from smaller components
function FiltersPanel() {
  return (
    <>
      <CategorySidebar />
      <JobCriteriaSection />
      <LocationSection />
      <TagInput />
    </>
  );
}
```

### 2. **Data Flow Pattern**

**Pages fetch data → Components receive props**

```typescript
// Page: Fetches data
export default function JobsPage() {
  const { data, isLoading } = useJobs(filters);
  return <JobList jobs={data.jobs} />;
}

// Component: Pure presentation
export function JobList({ jobs }: { jobs: Job[] }) {
  return jobs.map(job => <JobCard job={job} />);
}
```

### 3. **Type-Safe API Layer**

```typescript
// 1. Define types (shared/types/api.ts)
export interface JobsRequest {
  stack?: string[];
  level?: string;
  isRemote?: boolean;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
}

// 2. Create API function (shared/api/jobs.api.ts)
export const jobsApi = {
  getJobs: async (params: JobsRequest): Promise<JobsResponse> => {
    const response = await apiClient.get<ApiResponse<JobsResponse>>('/api/jobs', { params });
    return response.data.data;
  },
};

// 3. Wrap in React Query hook (shared/hooks/use-jobs.ts)
export function useJobs(params: JobsRequest = {}) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => jobsApi.getJobs(params),
  });
}

// 4. Use in component
const { data, isLoading } = useJobs({ stack: ['React', 'TypeScript'] });
```

### 4. **Reusable UI Components**

I build generic, reusable components that accept variants:

```typescript
// TagInput component used for:
// - Tech stack input
// - Excluded titles
// - Mute keywords
<TagInput
  label="Tech Stack"
  tags={skills}
  onAdd={addSkill}
  onRemove={removeSkill}
  variant="primary" // or "danger", "warning"
/>
```

### 5. **State Management Strategy**

- **Server State** (React Query): Jobs, user data, resume
- **Client State** (Zustand): UI state like drawer open/closed, selected filters
- **Local State** (useState): Component-specific state like input values

### 6. **Error Handling**

```typescript
// API client handles 401 globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// React Query handles loading/error states
const { data, isLoading, error } = useJobs();

if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage error={error} />;
```

### 7. **Performance Optimizations**

- **Server Components by default**: Only use `'use client'` when needed
- **React Query caching**: Avoid redundant API calls
- **Lazy loading**: Dynamic imports for heavy components
- **Optimistic updates**: Instant UI feedback for mutations

## � Code Style & Conventions

### TypeScript

```typescript
// ✅ Explicit return types
export function useJobs(params: JobsRequest): UseQueryResult<JobsResponse> {
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
// ✅ Named exports for components
export function JobCard({ job }: JobCardProps) { ... }

// ✅ Arrow functions for event handlers
const handleClick = () => { ... };

// ✅ Early returns for loading/error states
if (isLoading) return <Skeleton />;
if (!data) return null;
```

### Styling

```typescript
// ✅ Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm">

// ✅ cn() for conditional classes
<button className={cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-cyan-500 text-white",
  !isActive && "bg-gray-100 text-gray-600"
)}>
```

### Icons

**Never manually create icons.** Use [Lucide React](https://lucide.dev) for all icons.

```typescript
// ✅ Import icons from lucide-react
import { Sparkles, Briefcase, FileText, User, LogOut } from 'lucide-react';

// ✅ Use as React components with size and className props
<Briefcase className="h-5 w-5 text-cyan-600" />
<Loader2 className="h-8 w-8 animate-spin" />

// ✅ Customize with Tailwind classes
<Search className="h-4 w-4 text-gray-400" />
```

**Why Lucide React?**

- 🎨 **1,500+ icons** - Comprehensive, consistent design
- 🆓 **Free & open source** - MIT license
- ⚡ **Tree-shakeable** - Only imports icons you use
- 🎯 **React-optimized** - Native React components
- 📦 **Small bundle size** - ~1KB per icon
- 🔧 **Customizable** - Size, color, stroke width via props

**Browse icons:** [lucide.dev/icons](https://lucide.dev/icons)

### File Organization

```
jobs/
├── page.tsx                 # Route entry point
├── components/              # Route-specific components
│   ├── job-list.tsx
│   ├── job-card.tsx
│   └── filters-panel.tsx
└── [id]/
    └── page.tsx             # Dynamic route
```

## 🔑 Key Features

### Channel Management System

- **Bundle Onboarding**: Curated channel bundles for quick setup (e.g., "Tech Jobs", "Remote Work")
- **Channel Discovery**: Explore and search available Telegram channels with fuzzy search
- **Subscription Management**: Subscribe/unsubscribe to channels with swap limits (6/month for free users)
- **My Channels**: View and manage subscribed channels
- **Smart Limits**: Free tier limited to 5 channels, premium gets unlimited

### Advanced Multi-Dimensional Filters

- **Job Criteria**: Role, seniority level, tech stack (autocomplete with fuzzy search)
- **Location**: Remote, hybrid, on-site with location preferences
- **Experience**: Slider for years of experience (0-20+ years)
- **Exclusions**: Mute keywords, excluded job titles
- **Real-time filtering** with React Query cache invalidation
- **Persistent filters** via Zustand store

### Infinite Scroll Job Feed

- **Optimized pagination**: 20 jobs per page with automatic loading
- **Persistent cache**: 5-minute stale time, 30-minute garbage collection
- **Intersection Observer**: Automatic load-more on scroll
- **Skeleton loading states** for smooth UX
- **Job view tracking** to mark jobs as seen

### AI-Powered Resume Tailoring

- Upload base resume (PDF/DOCX)
- One-click tailored resume generation per job
- Download PDF and DOCX formats
- Auto-generated cover letter
- Telegram message template for direct application

### Multi-Provider Authentication

- **Google OAuth**: Sign in with Google account
- **Yandex OAuth**: Sign in with Yandex account (custom provider)
- **Email Magic Links**: Passwordless email authentication via MailerSend
- JWT session strategy with secure cookies
- MongoDB adapter for user persistence
- Protected routes with middleware
- Onboarding flow for first-time users

### User Preferences & Settings

- Job filter preferences persistence
- Notification settings
- Profile management
- Resume storage and versioning

### Smart Job Feed

- Real-time job scraping from Telegram channels
- Channel-based filtering
- Job view tracking
- Category-based organization

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x+
- npm 10.x+
- Backend API running (see backend repo)

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Configure environment variables (see below)
```

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
AUTH_SECRET=<your-secret-here>

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Yandex OAuth
YANDEX_CLIENT_ID=your-yandex-client-id
YANDEX_CLIENT_SECRET=your-yandex-client-secret

# Email Provider (MailerSend SMTP)
EMAIL_SERVER_HOST=smtp.mailersend.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-mailersend-username
EMAIL_SERVER_PASSWORD=your-mailersend-password
EMAIL_FROM=noreply@yourdomain.com

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

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

## 📚 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## 🎨 Design System

### Color Palette (OKLCH)

```css
/* Primary (Cyan) */
--primary: oklch(45% 0.2 264);
--primary-foreground: oklch(100% 0 0);

/* Background */
--background: oklch(100% 0 0);
--foreground: oklch(10% 0 0);

/* Muted */
--muted: oklch(96% 0 0);
--muted-foreground: oklch(45% 0 0);
```

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, responsive sizing
- **Body**: Regular, 16px base

### Component Variants

```typescript
// Button
<Button variant="default | destructive | outline | secondary | ghost | link" />

// Badge
<Badge variant="default | secondary | destructive | outline" />
```

## 🔒 Authentication Flow

### OAuth Providers (Google & Yandex)

1. User visits `/login`
2. User clicks "Sign in with Google" or "Sign in with Yandex"
3. OAuth provider redirects to authorization page
4. User authorizes the application
5. Provider redirects back with authorization code
6. NextAuth exchanges code for user profile
7. User data stored in MongoDB via MongoDB Adapter
8. JWT session token created and stored in secure HTTP-only cookie
9. User redirected to dashboard
10. Middleware protects dashboard routes by validating session
11. First-time users see channel onboarding modal

### Email Magic Links

1. User visits `/login`
2. User enters email address
3. NextAuth sends magic link via MailerSend SMTP
4. User clicks link in email
5. NextAuth validates token and creates session
6. User redirected to dashboard with JWT cookie
7. Onboarding flow for new users

### Session Management

- **Strategy**: JWT (stateless)
- **Storage**: Secure HTTP-only cookies
- **Adapter**: MongoDB for user persistence
- **Callbacks**: Custom JWT and session callbacks for user metadata
- **Update Trigger**: Session refresh on onboarding completion

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel
```

Set environment variables in Vercel dashboard:

**Required:**

- `NEXTAUTH_URL` - Your production URL (e.g., https://jobsniper.vercel.app)
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_SECRET` - Same as NEXTAUTH_SECRET or separate secret
- `MONGODB_URI` - MongoDB Atlas connection string
- `NEXT_PUBLIC_API_URL` - Backend API URL

**OAuth Providers (at least one required):**

- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `YANDEX_CLIENT_ID` & `YANDEX_CLIENT_SECRET`

**Email Provider (optional):**

- `EMAIL_SERVER_HOST`
- `EMAIL_SERVER_PORT`
- `EMAIL_SERVER_USER`
- `EMAIL_SERVER_PASSWORD`
- `EMAIL_FROM`

## 🚧 Roadmap

### Phase 1: Core Platform ✅

- [x] Landing page
- [x] Multi-provider authentication (Google, Yandex, Email)
- [x] Job feed with infinite scroll
- [x] Advanced multi-dimensional filters
- [x] AI resume tailoring
- [x] Resume upload

### Phase 2: Channel Management ✅

- [x] Channel bundle system
- [x] Channel onboarding flow
- [x] Channel discovery with search
- [x] Subscribe/unsubscribe functionality
- [x] Swap limits for free tier (6/month)
- [x] My Channels management
- [x] 5-channel limit for free users

### Phase 3: Enhanced UX (In Progress)

- [x] Tech stack autocomplete with fuzzy search
- [x] Experience level slider
- [x] Job function selector
- [x] Persistent filter state
- [x] Skeleton loading states
- [ ] Job bookmarking/favorites
- [ ] Job application tracking
- [ ] Advanced sorting options
- [ ] Saved searches

### Phase 4: Intelligence & Personalization

- [ ] Job recommendations based on resume
- [ ] Email notifications for new jobs
- [ ] Smart job matching algorithm
- [ ] Analytics dashboard (views, applications, success rate)
- [ ] Resume version history
- [ ] A/B testing for resume variations

### Phase 5: Premium Features

- [ ] Unlimited channel subscriptions
- [ ] Unlimited channel swaps
- [ ] Priority job alerts
- [ ] Advanced analytics
- [ ] Custom resume templates
- [ ] API access

### Phase 6: Polish & Scale

- [ ] PWA support (offline mode)
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Unit & E2E tests (Playwright)
- [ ] Performance monitoring
- [ ] SEO optimization

## 📄 License

MIT

---

**Built with** ❤️ **by a developer who's tired of manual job hunting**  
**Last Updated**: 2025-12-10  
**Version**: 0.2.0  
**Status**: Active Development
