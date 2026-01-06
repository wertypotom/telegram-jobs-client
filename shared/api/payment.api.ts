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
}

export const paymentApi = {
  createCheckout: async (variantId: string): Promise<CreateCheckoutResponse> => {
    const { data } = await apiClient.post('/api/payment/checkout', { variantId });
    return data.data;
  },

  getSubscription: async (): Promise<SubscriptionStatusResponse> => {
    const { data } = await apiClient.get('/api/payment/subscription');
    return data.data;
  },

  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => {
    const { data } = await apiClient.post('/api/payment/cancel');
    return data.data;
  },
};
