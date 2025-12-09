import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { jobsApi, JobFilters } from '../api/jobs.api';
import type { Job } from '../types/models';

const JOBS_PER_PAGE = 20;

interface UseInfiniteJobsResult {
  jobs: Job[];
  totalCount: number;
  isLoading: boolean;
  isFetchingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
}

/**
 * Hook for infinite scrolling jobs with persistent caching
 * Uses useInfiniteQuery for automatic page management and cache persistence
 */
export function useInfiniteJobs(
  filters: JobFilters = {},
  enabled: boolean = true
): UseInfiniteJobsResult {
  // Stable filter key for query cache
  const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

  const { data, isLoading, isFetchingNextPage, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['jobs', filterKey],
      queryFn: ({ pageParam = 0 }) =>
        jobsApi.getJobs(filters, { limit: JOBS_PER_PAGE, offset: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.reduce((acc, page) => acc + page.jobs.length, 0);
        return loadedCount < lastPage.total ? loadedCount : undefined;
      },
      enabled,
      staleTime: 5 * 60 * 1000, // 5 min - prevents refetch on navigation
      gcTime: 30 * 60 * 1000, // 30 min - keeps data in cache
    });

  // Flatten all pages into single jobs array
  const jobs = useMemo(() => data?.pages.flatMap((page) => page.jobs) ?? [], [data]);

  const totalCount = data?.pages[0]?.total ?? 0;

  return {
    jobs,
    totalCount,
    isLoading,
    isFetchingMore: isFetchingNextPage,
    error: error as Error | null,
    hasMore: hasNextPage ?? false,
    loadMore: fetchNextPage,
  };
}
