import { apiClient } from '../lib/api-client';
import type {
  GenerateTailoredResumeRequest,
  GenerateTailoredResumeResponse,
  ApiResponse,
} from '../types/api';

export const sniperApi = {
  generateTailoredResume: async (
    data: GenerateTailoredResumeRequest
  ): Promise<GenerateTailoredResumeResponse> => {
    const response = await apiClient.post<
      ApiResponse<GenerateTailoredResumeResponse>
    >('/api/sniper/generate', data);
    return response.data.data;
  },
};
