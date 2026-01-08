import { create } from 'zustand';
import type { ChannelInfo } from '@/app/(dashboard)/components/channels/api/channel.api';

interface ChannelsState {
  userChannels: ChannelInfo[];
  isLoading: boolean;
  setUserChannels: (channels: ChannelInfo[]) => void;
  addChannel: (channel: ChannelInfo) => void;
  removeChannel: (username: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useChannelsStore = create<ChannelsState>((set) => ({
  userChannels: [],
  isLoading: false,

  setUserChannels: (channels) => set({ userChannels: channels }),

  addChannel: (channel) =>
    set((state) => ({
      userChannels: [...state.userChannels, channel],
    })),

  removeChannel: (username) =>
    set((state) => ({
      userChannels: state.userChannels.filter((ch) => ch.username !== username),
    })),

  setLoading: (loading) => set({ isLoading: loading }),
}));
