import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/shared/api/payment.api';
import { channelApi } from '../../components/channels/api/channel.api';
import { useChannelsStore } from '@/shared/store/channels-store';
import { useEffect } from 'react';

/**
 * Hook to fetch user's subscription status
 */
export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: () => paymentApi.getSubscription(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch user's subscribed channels
 * Integrates with Zustand store for global state sync
 */
export function useUserChannels() {
  const { setUserChannels, setLoading } = useChannelsStore();

  const query = useQuery({
    queryKey: ['userChannels'],
    queryFn: () => channelApi.getUserChannels(),
    staleTime: 1000 * 60 * 2, // 2 minutes
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

/**
 * Hook to subscribe to channels
 */
export function useSubscribeChannel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channels: string[]) => channelApi.addChannels(channels),
    onSuccess: () => {
      // Invalidate channels queries to refetch updated list
      queryClient.invalidateQueries({ queryKey: ['userChannels'] });
      queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    },
  });
}

/**
 * Hook to unsubscribe from a channel
 */
export function useUnsubscribeChannel() {
  const queryClient = useQueryClient();
  const { removeChannel } = useChannelsStore();

  return useMutation({
    mutationFn: (channelUsername: string) => channelApi.unsubscribeChannel(channelUsername),
    onSuccess: (data, channelUsername) => {
      // Immediately update Zustand store for instant UI sync
      removeChannel(channelUsername);

      // Invalidate channels queries to refetch updated list
      queryClient.invalidateQueries({ queryKey: ['userChannels'] });
      queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      queryClient.invalidateQueries({ queryKey: ['channels'] });
    },
  });
}

/**
 * Hook to resume a cancelled subscription
 */
export function useResumeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => paymentApi.resumeSubscription(),
    onSuccess: () => {
      // Invalidate subscription query to refetch updated status
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
    },
  });
}
