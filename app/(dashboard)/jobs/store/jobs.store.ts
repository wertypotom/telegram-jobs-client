import { create } from 'zustand';

interface JobsState {
  // Scroll position for restoration
  scrollPosition: number;
  setScrollPosition: (position: number) => void;

  // Filter key to detect changes
  lastFilterKey: string;
  setLastFilterKey: (key: string) => void;

  // Reset state when needed
  reset: () => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  scrollPosition: 0,
  setScrollPosition: (position) => set({ scrollPosition: position }),

  lastFilterKey: '',
  setLastFilterKey: (key) => set({ lastFilterKey: key }),

  reset: () => set({ scrollPosition: 0, lastFilterKey: '' }),
}));
