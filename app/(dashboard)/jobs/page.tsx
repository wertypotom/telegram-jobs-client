'use client';

import { useState, useEffect } from 'react';
import { useAuth, useIntersectionObserver } from '@/shared/hooks';
import { useInfiniteJobs } from './hooks/use-infinite-jobs';
import { useFilters } from './hooks/use-preferences';
import { useScrollRestoration } from '@/shared/hooks/use-scroll-restoration';
import { useUIStore } from '@/shared/store/ui-store';
import type { JobFilters } from './api/jobs.api';
import { JobList } from './components/job-list';
import { FiltersPanel } from './components/filters-panel';
import { FilterChips } from './components/filter-chips';
import { JobSkeletonList } from './components/job-skeleton';
import { ChannelOnboardingModal } from '../components/channels/channel-onboarding-modal';
import { ChannelManager } from '../components/channels/channel-manager';
import { ExploreChannelsModal } from '../components/channels/explore-channels-modal';
import { FeedbackModal } from './components/feedback-modal';
import { Card, CardContent, Badge } from '@/shared/ui';
import { Sparkles, Bell, MessageSquarePlus, Crown } from 'lucide-react';
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
  const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);

  // Modal state from Zustand
  const { modals, openModal, closeModal } = useUIStore();

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
  const { jobs, totalCount, isLoading, isFetching, isFetchingMore, error, hasMore, loadMore } =
    useInfiniteJobs(filters, isFiltersLoaded);

  // Intersection observer for infinite scroll
  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isFetchingMore,
  });

  // Scroll position restoration
  useScrollRestoration('jobs-page', jobs.length > 0);

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
      <ChannelManager open={modals.channelManager} onClose={() => closeModal('channelManager')} />
      <ExploreChannelsModal
        open={modals.exploreChannels}
        onClose={() => closeModal('exploreChannels')}
      />
      <FeedbackModal
        open={modals.feedback}
        onOpenChange={(open) => (open ? openModal('feedback') : closeModal('feedback'))}
      />

      <FiltersPanel
        open={modals.filtersPanel}
        onClose={() => closeModal('filtersPanel')}
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
          <span className="text-gray-300 hidden md:inline">/</span>
          <Badge className="bg-black text-white hover:bg-black px-3 py-1 rounded-full text-xs font-bold hidden md:inline-flex">
            {t('page.recommended')}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* Feedback Icon */}
          <button
            onClick={() => openModal('feedback')}
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

          {/* Go Unlimited Button - Only show for free users */}
          {user?.plan !== 'premium' && (
            <Link
              href="/pricing"
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 md:px-4 md:py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
              title={t('page.unlockFullMarket')}
            >
              <Crown className="h-4 w-4" />
              <span className="hidden md:inline">{t('page.unlockFullMarket')}</span>
            </Link>
          )}

          {/* Explore Channels Button */}
          <button
            onClick={() => openModal('exploreChannels')}
            className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 md:px-4 md:py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors"
            title={t('page.exploreChannels')}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:inline">{t('page.exploreChannels')}</span>
          </button>
        </div>
      </header>

      <div className="bg-white px-4 md:px-6 py-4 border-b">
        <FilterChips filters={filters} onEditClick={() => openModal('filtersPanel')} />
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
            {!isLoading && !isFetching && jobs.length === 0 && (
              <div className="text-center py-12 text-gray-500">{t('page.noJobs')}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
