import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { channelApi } from '../api/channel.api';
import { toast } from 'sonner';
import { getErrorMessage, logError } from '../lib/error-utils';

export function useUserChannels() {
  return useQuery({
    queryKey: ['user-channels'],
    queryFn: () => channelApi.getUserChannels(),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
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
    onSuccess: (data) => {
      // Show swap remaining notification for free users
      if (data.swapsRemaining !== undefined && data.swapsRemaining >= 0) {
        toast.info(`Channel added! ${data.swapsRemaining} swaps remaining this month.`);
      }
      // Critical: Invalidate auth to refresh subscribedChannels in session
      queryClient.invalidateQueries({ queryKey: ['user'] });
      // Refresh channel lists
      queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      queryClient.invalidateQueries({ queryKey: ['channels', 'explore'] });
      // Refresh jobs to show new jobs from added channels
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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

  return useMutation({
    mutationFn: (channelUsername: string) => channelApi.unsubscribeChannel(channelUsername),
    onSuccess: (data) => {
      // Show swap remaining notification for free users
      if (data.swapsRemaining !== undefined && data.swapsRemaining >= 0) {
        toast.info(`Unsubscribed! ${data.swapsRemaining} swaps remaining this month.`);
      }
      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['user-channels'] });
      queryClient.invalidateQueries({ queryKey: ['channels', 'explore'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
      logError('UnsubscribeChannel', error);
    },
  });
}
