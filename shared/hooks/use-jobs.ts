import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi, JobFilters } from '../api/jobs.api';

export function useJobs(
  filters: JobFilters = {},
  pagination: { limit?: number; offset?: number } = {},
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['jobs', filters, pagination],
    queryFn: () => jobsApi.getJobs(filters, pagination),
    enabled,
  });
}

export function useJobById(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
}

// Alias for backward compatibility
export const useJob = useJobById;

export function useMarkJobAsViewed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobsApi.markJobAsViewed(id),
    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useSearchSkills(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['skills', query],
    queryFn: () => jobsApi.searchSkills(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes - skills don't change often
  });
}

export function useSearchJobFunctions(query: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['jobFunctions', query],
    queryFn: () => jobsApi.searchJobFunctions(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes - job functions don't change often
  });
}
