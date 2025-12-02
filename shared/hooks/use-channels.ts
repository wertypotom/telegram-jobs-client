import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { channelApi } from '../api/channel.api';

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
      // Invalidate subscribed channels to refresh the list
      queryClient.invalidateQueries({ queryKey: ['subscribed-channels'] });
      // Invalidate jobs to show new jobs from added channels
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
