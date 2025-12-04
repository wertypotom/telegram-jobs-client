'use client';

import { useState } from 'react';
import { useJobs, useAuth } from '@/shared/hooks';
import { JobList } from './components/job-list';
import { FiltersPanel } from './components/filters-panel';
import { ChannelOnboardingModal } from '../components/channel-onboarding-modal';
import { ChannelManager } from '../components/channel-manager';
import { DebugChannelWidget } from './components/debug-channel-widget';
import { Skeleton, Card, CardContent, Badge } from '@/shared/ui';
import { Loader2 } from 'lucide-react';

export default function JobsPage() {
  const [filters, setFilters] = useState({
    stack: [] as string[],
    level: '',
    isRemote: undefined as boolean | undefined,
    jobFunction: '',
    excludedTitles: [] as string[],
    muteKeywords: [] as string[],
    locationType: [] as string[],
    limit: 20,
    offset: 0,
  });
  const [showChannelManager, setShowChannelManager] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const { data: user, isLoading: loadingUser } = useAuth();
  const { data, isLoading, error } = useJobs({
    stack: filters.stack,
    level: filters.level,
    jobFunction: filters.jobFunction,
    excludedTitles: filters.excludedTitles,
    muteKeywords: filters.muteKeywords,
    locationType: filters.locationType,
    limit: filters.limit,
    offset: filters.offset,
  });

  // Show onboarding modal if user hasn't completed it

  const showOnboarding = user && !user.hasCompletedOnboarding;

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <ChannelOnboardingModal open={showOnboarding || false} />
      <ChannelManager open={showChannelManager} onClose={() => setShowChannelManager(false)} />
      <FiltersPanel
        open={showFiltersPanel}
        onClose={() => setShowFiltersPanel(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Top Header - white background like reference */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">JOBS</h1>
          <span className="text-gray-300 hidden sm:inline">/</span>
          <Badge className="bg-black text-white hover:bg-black px-3 py-1 rounded-full text-xs font-bold">
            Recommended
          </Badge>
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
            <span className="text-gray-500">
              Liked <span className="bg-gray-100 px-1.5 rounded ml-1 text-gray-900">1</span>
            </span>
            <span className="text-gray-500">
              Applied <span className="bg-gray-100 px-1.5 rounded ml-1 text-gray-900">64</span>
            </span>
            <span className="text-gray-500">
              External <span className="bg-gray-100 px-1.5 rounded ml-1 text-gray-900">53</span>
            </span>
          </div>
        </div>
      </header>

      {/* Active Filters Bar */}
      <div className="bg-white px-4 md:px-6 py-4 border-b">
        <div className="flex flex-wrap items-center gap-2">
          {/* Job Function Filter */}
          {filters.jobFunction && (
            <div className="bg-gray-200/80 text-gray-700 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-gray-300 transition-colors flex items-center gap-2">
              <span>Role: {filters.jobFunction}</span>
              <button
                onClick={() => setFilters({ ...filters, jobFunction: '' })}
                className="hover:text-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* Level Filter */}
          {filters.level && (
            <div className="bg-gray-200/80 text-gray-700 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-gray-300 transition-colors flex items-center gap-2">
              <span>{filters.level}</span>
              <button
                onClick={() => setFilters({ ...filters, level: '' })}
                className="hover:text-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* Tech Stack Filters */}
          {filters.stack.map((tech, idx) => (
            <div
              key={idx}
              className="bg-gray-200/80 text-gray-700 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <span>{tech}</span>
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    stack: filters.stack.filter((_, i) => i !== idx),
                  })
                }
                className="hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* Location Type Filters */}
          {filters.locationType.map((type) => (
            <div
              key={type}
              className="bg-gray-200/80 text-gray-700 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    locationType: filters.locationType.filter((t) => t !== type),
                  })
                }
                className="hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* Excluded Titles */}
          {filters.excludedTitles.map((title, idx) => (
            <div
              key={idx}
              className="bg-orange-100 text-orange-700 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-orange-200 transition-colors flex items-center gap-2"
            >
              <span>Exclude: {title}</span>
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    excludedTitles: filters.excludedTitles.filter((_, i) => i !== idx),
                  })
                }
                className="hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* Mute Keywords */}
          {filters.muteKeywords.map((keyword, idx) => (
            <div
              key={idx}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <span>Mute: {keyword}</span>
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    muteKeywords: filters.muteKeywords.filter((_, i) => i !== idx),
                  })
                }
                className="hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* Edit Filters Button */}
          <button
            onClick={() => setShowFiltersPanel(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-transform transform active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Edit Filters
          </button>

          {/* Clear All (if any filters active) */}
          {(filters.jobFunction ||
            filters.level ||
            filters.stack ||
            filters.locationType.length > 0 ||
            filters.excludedTitles.length > 0 ||
            filters.muteKeywords.length > 0) && (
            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  jobFunction: '',
                  level: '',
                  stack: [],
                  locationType: [],
                  excludedTitles: [],
                  muteKeywords: [],
                })
              }
              className="text-gray-500 hover:text-red-600 text-sm font-medium underline ml-2"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-8 pb-6 max-w-7xl">
          {/* Welcome Card */}
          <div className="mb-6">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold text-gray-900">Welcome back, Developer!</h2>
                <p className="text-xs text-gray-500 mt-1">
                  It's great to see you again. Let's resume your journey towards your dream job.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Debug Widget - POC for testing subscription filtering */}
          <DebugChannelWidget />

          {/* Jobs List */}
          <div>
            {isLoading && (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-destructive">Failed to load jobs. Please try again.</p>
              </div>
            )}

            {data && <JobList jobs={data.jobs} total={data.total} />}
          </div>
        </div>
      </div>
    </>
  );
}
