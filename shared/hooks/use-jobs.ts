import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../api';
import type { JobsRequest } from '../types/api';

export function useJobs(params: JobsRequest = {}) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => jobsApi.getJobs(params),
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
}

export function useInfiniteJobs(params: Omit<JobsRequest, 'offset'> = {}) {
  return useInfiniteQuery({
    queryKey: ['jobs', 'infinite', params],
    queryFn: ({ pageParam = 0 }) => jobsApi.getJobs({ ...params, offset: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const nextOffset = pages.length * (params.limit || 20);
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
}

export function useMarkJobAsViewed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobsApi.markJobAsViewed(jobId),
    onSuccess: () => {
      // Invalidate jobs list to refresh isVisited status
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
