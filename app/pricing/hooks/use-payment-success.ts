import { useEffect } from 'react';

/**
 * Refresh user session on dashboard mount
 *
 * Ensures user data is synced with database on every dashboard visit.
 *
 * @param updateSession - NextAuth session update function
 */
export const usePaymentSuccessHandler = (
  updateSession: (data?: Record<string, unknown>) => Promise<unknown>
) => {
  useEffect(() => {
    // Always refresh session on mount to get latest DB state
    updateSession({ refreshedAt: Date.now() });

    // Clean up payment success query param if present
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      window.history.replaceState({}, '', window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
