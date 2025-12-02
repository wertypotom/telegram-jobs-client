'use client';

import { useSession, signOut as nextAuthSignOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    data: session?.user
      ? {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          isAuthenticated: true,
        }
      : null,
    isLoading: status === 'loading',
    error: null,
  };
}

export function useLogout() {
  return {
    mutate: async () => {
      await nextAuthSignOut({ callbackUrl: '/login' });
    },
    mutateAsync: async () => {
      await nextAuthSignOut({ callbackUrl: '/login' });
    },
  };
}

// Legacy exports for backward compatibility (will be removed)
export function useSendTelegramCode() {
  throw new Error('Telegram auth is deprecated. Use NextAuth instead.');
}

export function useVerifyTelegramCode() {
  throw new Error('Telegram auth is deprecated. Use NextAuth instead.');
}

export function useVerifyTelegramPassword() {
  throw new Error('Telegram auth is deprecated. Use NextAuth instead.');
}
