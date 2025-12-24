import { apiClient } from '@/shared/lib/api-client';

export interface FeedbackData {
  category: 'BUG' | 'FEATURE' | 'UX' | 'SUBSCRIPTION' | 'OTHER';
  message: string;
  contactConsent: boolean;
}

export const feedbackApi = {
  createFeedback: async (data: FeedbackData) => {
    const response = await apiClient.post('/api/feedback', data);
    return response.data;
  },
};
