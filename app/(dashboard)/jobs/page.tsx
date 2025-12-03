'use client';

import { useState } from 'react';
import { useJobs, useAuth } from '@/shared/hooks';
import { JobList } from './components/job-list';
import { FiltersPanel } from './components/filters-panel';
import { ChannelOnboardingModal } from '../components/channel-onboarding-modal';
import { ChannelManager } from '../components/channel-manager';
import { Skeleton, Card, CardContent, Badge } from '@/shared/ui';
import { Loader2 } from 'lucide-react';

export default function JobsPage() {
  const [filters, setFilters] = useState({
    stack: '',
    level: '',
    isRemote: undefined as boolean | undefined,
    jobFunction: '',
    excludedTitles: [] as string[],
    locationType: [] as string[],
    limit: 20,
    offset: 0,
  });
  const [showChannelManager, setShowChannelManager] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const { data: user, isLoading: loadingUser } = useAuth();
  const { data, isLoading, error } = useJobs(filters);

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

      {/* Filter placeholder space - reserved for future implementation */}
      <div className="bg-white px-4 md:px-6 py-4 border-b">
        <div className="min-h-[60px]">{/* Filters will be added here later */}</div>
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
