'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInfiniteJobs, useAuth, useIntersectionObserver } from '@/shared/hooks';
import { useFilters } from '@/shared/hooks/use-preferences';
import { useJobsStore } from '@/shared/store/jobs.store';
import type { JobFilters } from '@/shared/api/jobs.api';
import { JobList } from './components/job-list';
import { FiltersPanel } from './components/filters-panel';
import { JobSkeletonList } from './components/job-skeleton';
import { ChannelOnboardingModal } from '../components/channel-onboarding-modal';
import { ChannelManager } from '../components/channel-manager';
import { ExploreChannelsModal } from '../components/explore-channels-modal';
import { FeedbackModal } from '../components/feedback-modal';
import { Card, CardContent, Badge } from '@/shared/ui';
import { SlidersHorizontal, Sparkles, Bell, MessageSquarePlus } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/app/components/language-switcher';

export default function JobsPage() {
  const { t } = useTranslation('dashboard');
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
  const [feedbackOpen, setFeedbackOpen] = useState(false);
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

  // Scroll position persistence
  const { scrollPosition, setScrollPosition } = useJobsStore();

  // Save scroll position on scroll
  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, [setScrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Restore scroll position after jobs load
  useEffect(() => {
    if (jobs.length > 0 && scrollPosition > 0) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    }
  }, [jobs.length > 0]); // Only run once when jobs first load

  // Show onboarding modal if user hasn't completed it
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
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />

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

      <header className="bg-white border-b sticky top-0 z-10 px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">{t('page.title')}</h1>
          <span className="text-gray-300 hidden sm:inline">/</span>
          <Badge className="bg-black text-white hover:bg-black px-3 py-1 rounded-full text-xs font-bold">
            {t('page.recommended')}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* Feedback Icon */}
          <button
            onClick={() => setFeedbackOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            title={t('notifications.sendFeedback')}
          >
            <MessageSquarePlus className="h-5 w-5 text-gray-600 group-hover:text-cyan-600 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
          </button>

          {/* Notification Bell */}
          <Link
            href="/settings/notifications"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            title={t('notifications.title')}
          >
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-cyan-600 group-hover:animate-[wiggle_0.5s_ease-in-out]" />
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Explore Channels Button */}
          <button
            onClick={() => setShowExploreModal(true)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Sparkles className="h-4 w-4" />
            {t('page.exploreChannels')}
          </button>
        </div>
      </header>

      <div className="bg-white px-4 md:px-6 py-4 border-b">
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Chips */}
          {(filters.jobFunction || []).map((func) => (
            <div
              key={func}
              className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            >
              <span>{func}</span>
            </div>
          ))}

          {(filters.level || []).map((l) => (
            <div
              key={l}
              className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            >
              <span>Level: {l}</span>
            </div>
          ))}

          {(filters.stack || []).map((s) => (
            <div
              key={s}
              className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            >
              <span>
                {t('filters.chips.tech')}: {s}
              </span>
            </div>
          ))}

          {(filters.locationType || []).map((locType) => (
            <div
              key={locType}
              className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            >
              <span>
                {t('filters.chips.location')}: {locType}
              </span>
            </div>
          ))}

          {(filters.excludedTitles || []).map((title) => (
            <div
              key={title}
              className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            >
              <span>
                {t('filters.chips.excluded')}: {title}
              </span>
            </div>
          ))}

          {(filters.muteKeywords || []).map((k) => (
            <div
              key={k}
              className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
            >
              <span>
                {t('filters.chips.muted')}: {k}
              </span>
            </div>
          ))}

          {filters.experienceYears &&
            (filters.experienceYears.min !== 0 || filters.experienceYears.max !== 10) && (
              <div className="bg-gray-200/80 text-gray-700 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                <span>
                  {filters.experienceYears.min}-
                  {filters.experienceYears.max >= 10 ? '10+' : filters.experienceYears.max}{' '}
                  {t('filters.years')}
                </span>
              </div>
            )}

          {/* Edit Filters Button */}
          <button
            onClick={() => setShowFiltersPanel(true)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-2 ml-2 transition-colors"
          >
            <SlidersHorizontal size={16} />
            {t('page.editFilters')}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-6 pb-6 max-w-7xl">
          {/* Welcome Card */}
          <div className="mb-6">
            <Card className="bg-white border border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold text-gray-900">{t('page.welcome')}</h2>
                <p className="text-xs text-gray-500 mt-1">{t('page.welcomeSubtitle')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div>
            {/* Initial loading */}
            {isLoading && <JobSkeletonList count={5} />}

            {/* Error state */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">{t('page.failedToLoad')}</p>
              </div>
            )}

            {/* Jobs list */}
            {!isLoading && jobs.length > 0 && (
              <>
                <JobList jobs={jobs} total={totalCount} />

                {/* Load more trigger */}
                {hasMore && (
                  <div ref={loadMoreRef} className="mt-8">
                    {isFetchingMore && <JobSkeletonList count={1} />}
                  </div>
                )}

                {/* End of results message */}
                {!hasMore && jobs.length > 0 && (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    {t('page.endOfResults')}
                  </div>
                )}
              </>
            )}

            {/* Empty state */}
            {!isLoading && jobs.length === 0 && (
              <div className="text-center py-12 text-gray-500">{t('page.noJobs')}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
