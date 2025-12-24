import { create } from 'zustand';

interface UIState {
  modals: {
    channelManager: boolean;
    filtersPanel: boolean;
    exploreChannels: boolean;
    feedback: boolean;
  };
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  modals: {
    channelManager: false,
    filtersPanel: false,
    exploreChannels: false,
    feedback: false,
  },
  openModal: (modal) =>
    set((state) => ({
      modals: { ...state.modals, [modal]: true },
    })),
  closeModal: (modal) =>
    set((state) => ({
      modals: { ...state.modals, [modal]: false },
    })),
  closeAllModals: () =>
    set({
      modals: {
        channelManager: false,
        filtersPanel: false,
        exploreChannels: false,
        feedback: false,
      },
    }),
}));
