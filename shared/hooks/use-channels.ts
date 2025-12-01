import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { channelApi, ChannelInfo, RecommendedChannel, SubscribeChannelsResponse } from '../api/channel.api';

export function useUserChannels() {
  return useQuery({
    queryKey: ['user-channels'],
    queryFn: () => channelApi.getUserChannels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRecommendedChannels() {
  return useQuery({
    queryKey: ['recommended-channels'],
    queryFn: () => channelApi.getRecommendedChannels(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useSearchChannels(query: string) {
  return useQuery({
    queryKey: ['search-channels', query],
    queryFn: () => channelApi.searchChannels(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSubscribeChannels() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channels: string[]) => channelApi.subscribeToChannels(channels),
    onSuccess: () => {
      // Invalidate user query to refresh hasCompletedOnboarding
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // Invalidate jobs to show new jobs from subscribed channels
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}

export function useSubscribedChannels() {
  return useQuery({
    queryKey: ['subscribed-channels'],
    queryFn: () => channelApi.getSubscribedChannels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAddChannels() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channels: string[]) => channelApi.addChannels(channels),
    onSuccess: () => {
      // Invalidate subscribed channels to refresh the list
      queryClient.invalidateQueries({ queryKey: ['subscribed-channels'] });
      // Invalidate jobs to show new jobs from added channels
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
