import { apiClient } from '../lib/api-client';
import type { ResumeUploadResponse, ApiResponse } from '../types/api';

export const resumeApi = {
  uploadResume: async (file: File): Promise<ResumeUploadResponse> => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await apiClient.post<ApiResponse<ResumeUploadResponse>>(
      '/api/resume/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },
};
