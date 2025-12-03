import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
