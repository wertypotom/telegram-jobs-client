import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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
 * Hook for infinite scrolling jobs
 * Automatically loads more jobs as user scrolls
 */
export function useInfiniteJobs(
  filters: JobFilters = {},
  enabled: boolean = true
): UseInfiniteJobsResult {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Fetch jobs with current offset
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs', filters, offset],
    queryFn: () => jobsApi.getJobs(filters, { limit: JOBS_PER_PAGE, offset }),
    enabled,
  });

  // Update jobs list when new data arrives
  useEffect(() => {
    if (data?.jobs) {
      if (offset === 0) {
        // First page - replace all jobs
        setAllJobs(data.jobs);
      } else {
        // Additional page - append to existing jobs
        setAllJobs((prev) => [...prev, ...data.jobs]);
        setIsFetchingMore(false);
      }
      setTotalCount(data.total);
    }
  }, [data, offset]);

  // Reset when filters change
  useEffect(() => {
    setOffset(0);
    setAllJobs([]);
  }, [JSON.stringify(filters)]);

  // Load more function
  const loadMore = useCallback(() => {
    if (!isFetchingMore && allJobs.length < totalCount) {
      setIsFetchingMore(true);
      setOffset((prev) => prev + JOBS_PER_PAGE);
    }
  }, [isFetchingMore, allJobs.length, totalCount]);

  const hasMore = allJobs.length < totalCount;

  return {
    jobs: allJobs,
    totalCount,
    isLoading: isLoading && offset === 0, // Only show loading on first page
    isFetchingMore,
    error: error as Error | null,
    hasMore,
    loadMore,
  };
}
