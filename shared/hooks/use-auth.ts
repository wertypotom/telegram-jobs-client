'use client';

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status, update } = useSession();

  return {
    data: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          hasCompletedOnboarding: session.user.hasCompletedOnboarding,
          subscribedChannels: session.user.subscribedChannels || [],
          plan: session.user.plan || 'free',
          isAuthenticated: true,
        }
      : null,
    isLoading: status === 'loading',
    error: null,
    update,
  };
}

export function useLogout() {
  return {
    mutate: async () => {
      // Sign out and force redirect to clear all cached state
      await nextAuthSignOut({ callbackUrl: '/', redirect: true });
    },
    mutateAsync: async () => {
      // Sign out and force redirect to clear all cached state
      await nextAuthSignOut({ callbackUrl: '/', redirect: true });
    },
  };
}
