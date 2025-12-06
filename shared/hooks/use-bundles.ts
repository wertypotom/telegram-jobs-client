import { useQuery } from '@tanstack/react-query';
import { bundlesApi } from '../api/bundles.api';

export function useBundles() {
  return useQuery({
    queryKey: ['bundles'],
    queryFn: () => bundlesApi.getBundles(),
    staleTime: 60 * 60 * 1000, // 1 hour (bundles rarely change)
  });
}

export function useBundleById(id: string) {
  return useQuery({
    queryKey: ['bundle', id],
    queryFn: () => bundlesApi.getBundleById(id),
    staleTime: 60 * 60 * 1000,
    enabled: !!id,
  });
}
