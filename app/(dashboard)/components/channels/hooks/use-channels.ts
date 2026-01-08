import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { channelApi } from '../api/channel.api';
import { logError } from '@/shared/lib/error-utils';
import { useChannelsStore } from '@/shared/store/channels-store';
import { useEffect } from 'react';

export function useUserChannels() {
  const { setUserChannels, setLoading } = useChannelsStore();

  const query = useQuery({
    queryKey: ['user-channels'],
    queryFn: () => channelApi.getUserChannels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Sync with Zustand store
  useEffect(() => {
    if (query.data) {
      setUserChannels(query.data);
    }
    setLoading(query.isLoading);
  }, [query.data, query.isLoading, setUserChannels, setLoading]);

  return query;
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
    onError: (error: any) => {
      logError('SubscribeChannels', error);
    },
  });
}

export function useAvailableChannels() {
  return useQuery({
    queryKey: ['available-channels'],
    queryFn: () => channelApi.getAvailableChannels(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useAddChannels() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channels: string[]) => channelApi.addChannels(channels),
    onSuccess: () => {
      // Invalidate all channel-related queries to force refetch
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      logError('AddChannels', error);
    },
  });
}

/**
 * Hook to explore channels with filters (Phase 2C Discovery)
 */
export function useExploreChannels(params: { searchQuery?: string; categories?: string[] }) {
  return useQuery({
    queryKey: ['channels', 'explore', params],
    queryFn: () => channelApi.exploreChannels(params),
    staleTime: 30000, // Cache for 30 seconds
  });
}

/**
 * Hook to unsubscribe from a channel (Phase 2C My Channels)
 */
export function useUnsubscribeChannel() {
  const queryClient = useQueryClient();
  const { removeChannel } = useChannelsStore();

  return useMutation({
    mutationFn: (channelUsername: string) => channelApi.unsubscribeChannel(channelUsername),
    onSuccess: (data, channelUsername) => {
      // Immediately update Zustand store for instant UI sync
      removeChannel(channelUsername);

      // Invalidate all channel-related queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['channels'] });
      queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      logError('UnsubscribeChannel', error);
    },
  });
}
