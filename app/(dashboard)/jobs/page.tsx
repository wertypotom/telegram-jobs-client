'use client';

import { useState, useEffect } from 'react';
import { useInfiniteJobs, useAuth, useIntersectionObserver } from '@/shared/hooks';
import { useFilters } from '@/shared/hooks/use-preferences';
import type { JobFilters } from '@/shared/api/jobs.api';
import { JobList } from './components/job-list';
import { FiltersPanel } from './components/filters-panel';
import { JobSkeletonList } from './components/job-skeleton';
import { ChannelOnboardingModal } from '../components/channel-onboarding-modal';
import { ChannelManager } from '../components/channel-manager';
import { ExploreChannelsModal } from '../components/explore-channels-modal';
import { Card, CardContent, Badge } from '@/shared/ui';
import { SlidersHorizontal, Sparkles, Bell } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({
    stack: [],
    level: [],
    jobFunction: [],
    excludedTitles: [],
    muteKeywords: [],
    locationType: [],
  });
  const [showChannelManager, setShowChannelManager] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);

  // Load saved filters from backend on mount
  const { data: savedFilters, isLoading: loadingFilters } = useFilters();

  // Sync with saved filters when loaded
  useEffect(() => {
    if (savedFilters) {
      setFilters(savedFilters);
      setIsFiltersLoaded(true);
    } else if (!loadingFilters && !savedFilters) {
      // No saved filters exist, use empty defaults
      setIsFiltersLoaded(true);
    }
  }, [savedFilters, loadingFilters]);

  const { data: user, isLoading: loadingUser } = useAuth();

  // Use infinite scrolling for jobs
  const { jobs, totalCount, isLoading, isFetchingMore, error, hasMore, loadMore } = useInfiniteJobs(
    filters,
    isFiltersLoaded
  );

  // Intersection observer for infinite scroll
  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isFetchingMore,
  });

  // Show onboarding modal if user hasn't completed it

  console.log('user ', user);
  const showOnboarding = user && !user.hasCompletedOnboarding;

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  return (
    <>
      <ChannelOnboardingModal open={showOnboarding || false} />
      <ChannelManager open={showChannelManager} onClose={() => setShowChannelManager(false)} />
      <ExploreChannelsModal open={showExploreModal} onClose={() => setShowExploreModal(false)} />
      <FiltersPanel
        open={showFiltersPanel}
        onClose={() => setShowFiltersPanel(false)}
        filters={{
          jobFunction: filters.jobFunction || [],
          level: filters.level || [],
          stack: filters.stack || [],
          excludedTitles: filters.excludedTitles || [],
          muteKeywords: filters.muteKeywords || [],
          locationType: filters.locationType || [],
          experienceYears: filters.experienceYears || { min: 0, max: 10 },
        }}
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
          {/* TODO: Phase 2D - Implement Liked/Applied/External tracking */}
          {/* <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
            <span className="text-gray-500">
              Liked <span className="bg-gray-100 px-1.5 rounded ml-1 text-gray-900">1</span>
            </span>
            <span className="text-gray-500">
              Applied <span className="bg-gray-100 px-1.5 rounded ml-1 text-gray-900">64</span>
            </span>
            <span className="text-gray-500">
              External <span className="bg-gray-100 px-1.5 rounded ml-1 text-gray-900">53</span>
            </span>
          </div> */}
        </div>
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <Link
            href="/settings/notifications"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            title="Notification Settings"
          >
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-cyan-600 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
          </Link>

          {/* Explore Channels Button */}
          <button
            onClick={() => setShowExploreModal(true)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            Explore Channels
          </button>
        </div>
      </header>

      {/* Active Filters Bar */}
      <div className="bg-white px-4 md:px-6 py-4 border-b">
        <section className="flex flex-wrap items-center gap-y-3">
          {/* Job Title Group (Top Row) */}
          <div className="flex items-center gap-2">
            {(filters.jobFunction || []).map((func) => (
              <div
                key={func}
                className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
              >
                <span>{func}</span>
              </div>
            ))}
          </div>

          {/* Spacer between groups */}
          {(filters.jobFunction || []).length > 0 &&
            ((filters.level || []).length > 0 ||
              (filters.stack || []).length > 0 ||
              (filters.locationType || []).length > 0 ||
              (filters.excludedTitles || []).length > 0 ||
              (filters.muteKeywords || []).length > 0 ||
              (filters.experienceYears &&
                (filters.experienceYears.min !== 0 || filters.experienceYears.max !== 10))) && (
              <div className="w-4" />
            )}

          {/* Attribute Group (Bottom Row) */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Level chips */}
            {(filters.level || []).map((l) => (
              <div
                key={l}
                className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
              >
                <span>Level: {l}</span>
              </div>
            ))}

            {/* Stack chips */}
            {(filters.stack || []).map((s) => (
              <div
                key={s}
                className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
              >
                <span>Tech: {s}</span>
              </div>
            ))}

            {/* Location type chips */}
            {(filters.locationType || []).map((t) => (
              <div
                key={t}
                className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
              >
                <span>Location: {t}</span>
              </div>
            ))}

            {/* Excluded titles chips */}
            {(filters.excludedTitles || []).map((t) => (
              <div
                key={t}
                className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
              >
                <span>Excluded: {t}</span>
              </div>
            ))}

            {/* Mute keywords chips */}
            {(filters.muteKeywords || []).map((k) => (
              <div
                key={k}
                className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
              >
                <span>Muted: {k}</span>
              </div>
            ))}

            {/* Experience years chip */}
            {filters.experienceYears &&
              (filters.experienceYears.min !== 0 || filters.experienceYears.max !== 10) && (
                <div className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                  <span>
                    {filters.experienceYears.min}-
                    {filters.experienceYears.max >= 10 ? '10+' : filters.experienceYears.max} Years
                  </span>
                </div>
              )}

            {/* Edit Filters Button */}
            <button
              onClick={() => setShowFiltersPanel(true)}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-2 ml-2 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Edit Filters
            </button>
          </div>
        </section>
      </div>

      {/* Main content area */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-6 pb-6 max-w-7xl">
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

          {/* Jobs List */}
          <div>
            {/* Initial loading */}
            {isLoading && <JobSkeletonList />}

            {/* Error state */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Failed to load jobs. Please try again.</p>
              </div>
            )}

            {/* Jobs list */}
            {!isLoading && jobs.length > 0 && (
              <>
                <JobList jobs={jobs} total={totalCount} />

                {/* Load more trigger */}
                {hasMore && (
                  <div ref={loadMoreRef} className="mt-8">
                    {isFetchingMore && <JobSkeletonList />}
                  </div>
                )}

                {/* End of results message */}
                {!hasMore && jobs.length > 0 && (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    You've reached the end! 🎉
                  </div>
                )}
              </>
            )}

            {/* Empty state */}
            {!isLoading && jobs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No jobs found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
