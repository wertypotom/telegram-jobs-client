/**
 * User Permissions & Business Logic
 *
 * Server-first architecture: Client displays server data and handles server errors.
 * Plan limits are enforced by server, not client.
 */

import type { User } from '../types/models';

export type PlanType = 'free' | 'premium';

/**
 * Check if user is premium
 */
export function isPremiumPlan(plan: PlanType): boolean {
  return plan === 'premium';
}

/**
 * Check if user can subscribe to more channels
 *
 * Note: This is CLIENT-SIDE validation only for UX.
 * Server is the authoritative source and will enforce actual limits.
 */
export function canSubscribeToChannel(
  user: User | null | undefined,
  _currentChannelCount: number
): boolean {
  if (!user) return false;

  // Premium users can always subscribe (server enforces actual limit)
  if (isPremiumPlan(user.plan)) return true;

  // For free users, allow subscription attempts
  // Server will return CHANNEL_LIMIT_EXCEEDED error if limit reached
  return true;
}

/**
 * Get channel limit message for display
 * Shows current count without hardcoded limits
 */
export function getChannelLimitMessage(
  user: User | null | undefined,
  currentChannelCount: number
): string {
  if (!user) return '';

  if (isPremiumPlan(user.plan)) {
    return `${currentChannelCount} channels subscribed`;
  }

  // For free users, show count without hardcoded limit
  // Server will tell us when limit is reached via error
  return `${currentChannelCount} channels subscribed`;
}

/**
 * Format swap remaining message from server response
 * Server returns swapsRemaining in API response
 */
export function getSwapRemainingMessage(swapsRemaining: number | undefined): string | null {
  if (swapsRemaining === undefined) {
    return null;
  }

  // Server returns -1 for unlimited (premium users)
  if (swapsRemaining === -1) {
    return 'Unlimited swaps available';
  }

  if (swapsRemaining < 0) {
    return null;
  }

  return `${swapsRemaining} swap${swapsRemaining === 1 ? '' : 's'} remaining this month`;
}

/**
 * Get display name for plan
 */
export function getPlanDisplayName(plan: PlanType): string {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}
