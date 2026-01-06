import { useEffect } from 'react';

/**
 * Handle payment success redirect
 * Detects ?payment=success query param and triggers session refresh
 */
export const usePaymentSuccessHandler = (updateSession: () => void) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      // Trigger NextAuth session update to get updated premium plan
      updateSession();
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [updateSession]);
};
