import { useEffect, useCallback } from 'react';

/**
 * Hook to save and restore scroll position
 * Useful for maintaining scroll position when navigating back to a page
 *
 * @param key - Unique key for storing scroll position (e.g., 'jobs-page')
 * @param enabled - Whether scroll restoration is enabled (default: true)
 */
export function useScrollRestoration(key: string, enabled: boolean = true): void {
  // Save scroll position on scroll
  const handleScroll = useCallback(() => {
    if (!enabled) return;
    sessionStorage.setItem(`scroll-${key}`, window.scrollY.toString());
  }, [key, enabled]);

  // Set up scroll listener
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, enabled]);

  // Restore scroll position on mount
  useEffect(() => {
    if (!enabled) return;

    const savedPosition = sessionStorage.getItem(`scroll-${key}`);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, position);
      });
    }
  }, [key, enabled]);
}
