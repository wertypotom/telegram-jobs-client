import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../api/stats.api';

export function usePlatformStats(enabled: boolean = true) {
  return useQuery({
    queryKey: ['platformStats'],
    queryFn: () => statsApi.getPlatformStats(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
