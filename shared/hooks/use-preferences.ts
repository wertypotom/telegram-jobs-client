import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { preferencesApi } from '../api/preferences.api';
import type { JobFilters } from '../api/jobs.api';

export function useFilters() {
  return useQuery({
    queryKey: ['filters'],
    queryFn: preferencesApi.getFilters,
    staleTime: Infinity, // Filters persist for entire session
  });
}

export function useSaveFilters() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (filters: JobFilters) => preferencesApi.saveFilters(filters),
    onSuccess: (savedFilters) => {
      queryClient.setQueryData(['filters'], savedFilters);
    },
  });
}
