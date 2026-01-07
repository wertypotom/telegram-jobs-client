import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/shared/api/payment.api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

/**
 * Hook to fetch user's subscription status
 * @returns Query result with subscription data
 */
export const useSubscription = () => {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: paymentApi.getSubscription,
  });
};

/**
 * Hook to create a checkout session and redirect to LemonSqueezy
 * Automatically redirects user to checkout URL on success
 * @returns Mutation object with createCheckout function
 */
export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: paymentApi.createCheckout,
    onSuccess: (data) => {
      // Redirect to LemonSqueezy checkout
      window.location.href = data.checkoutUrl;
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to create checkout session');
    },
  });
};

/**
 * Hook to cancel user's subscription
 * Invalidates subscription and user queries on success
 * @returns Mutation object with cancelSubscription function
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
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    },
  });
};
