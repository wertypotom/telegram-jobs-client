import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { preferencesApi } from '../api/preferences.api';
import type { JobFilters } from '../api/jobs.api';
import { toast } from 'sonner';
import { getErrorMessage, logError } from '../lib/error-utils';

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
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
      logError('SaveFilters', error);
    },
  });
}
