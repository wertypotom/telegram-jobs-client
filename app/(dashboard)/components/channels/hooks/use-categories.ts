import { useQuery } from '@tanstack/react-query';
import { channelApi } from '../api/channel.api';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => channelApi.getCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour (categories rarely change)
  });
}
