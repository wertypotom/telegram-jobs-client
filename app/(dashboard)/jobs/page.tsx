'use client';

import { useState } from 'react';
import { useJobs, useAuth } from '@/shared/hooks';
import { JobList } from './components/job-list';
import { FiltersPanel } from './components/filters-panel';
import { ChannelOnboardingModal } from '../components/channel-onboarding-modal';
import { ChannelManager } from '../components/channel-manager';
import { Skeleton, Button } from '@/shared/ui';
import { Loader2, Settings, SlidersHorizontal } from 'lucide-react';

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

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
            <p className="text-muted-foreground">
              Find your next opportunity from Telegram job channels
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowFiltersPanel(true)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Edit Filters
            </Button>
            <Button variant="outline" onClick={() => setShowChannelManager(true)} className="gap-2">
              <Settings className="h-4 w-4" />
              Manage Channels
            </Button>
          </div>
        </div>

        <div>
          {isLoading && (
            <div className="space-y-8">
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
    </>
  );
}
