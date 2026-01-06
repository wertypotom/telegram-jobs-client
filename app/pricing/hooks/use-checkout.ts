import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/shared/api/payment.api';
import { toast } from 'sonner';

/**
 * Get user's subscription status
 */
export const useSubscription = () => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: paymentApi.getSubscription,
  });
};

/**
 * Create checkout and redirect to LemonSqueezy
 */
export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: paymentApi.createCheckout,
    onSuccess: (data) => {
      // Redirect to LemonSqueezy checkout
      window.location.href = data.checkoutUrl;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create checkout session');
    },
  });
};

/**
 * Cancel user's subscription
 */
export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentApi.cancelSubscription,
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate queries to refresh user data
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    },
  });
};
