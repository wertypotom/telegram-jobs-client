import { apiClient } from '../lib/api-client';

export interface CreateCheckoutRequest {
  variantId: string;
}

export interface CreateCheckoutResponse {
  checkoutUrl: string;
}

export interface SubscriptionStatusResponse {
  plan: 'free' | 'premium';
  status?: 'active' | 'cancelled' | 'past_due' | 'expired';
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
  currentPeriodEnd?: string;
}

export interface ResumeSubscriptionResponse {
  success: boolean;
  message: string;
  status?: 'active' | 'cancelled' | 'past_due' | 'expired';
}

/**
 * Payment API client for LemonSqueezy integration
 */
export const paymentApi = {
  /**
   * Create a checkout session and get checkout URL
   * @param variantId - LemonSqueezy variant ID for the product
   * @returns Checkout URL to redirect user to
   */
  createCheckout: async (variantId: string): Promise<CreateCheckoutResponse> => {
    const { data } = await apiClient.post('/api/payment/checkout', { variantId });
    return data.data;
  },

  /**
   * Get current user's subscription status
   * @returns User's subscription details including plan and status
   */
  getSubscription: async (): Promise<SubscriptionStatusResponse> => {
    const { data } = await apiClient.get('/api/payment/subscription');
    return data.data;
  },

  /**
   * Cancel user's active subscription
   * User retains premium access until end of billing period
   * @returns Success status and confirmation message
   */
  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => {
    const { data } = await apiClient.post('/api/payment/cancel');
    return data.data;
  },

  /**
   * Resume user's cancelled subscription
   * Reactivates premium access and billing
   * @returns Success status and confirmation message
   */
  resumeSubscription: async (): Promise<ResumeSubscriptionResponse> => {
    const { data } = await apiClient.post('/api/payment/resume');
    return data.data;
  },
};
