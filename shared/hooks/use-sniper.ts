import { useMutation } from '@tanstack/react-query';
import { sniperApi } from '../api';
import type { GenerateTailoredResumeRequest } from '../types/api';

export function useGenerateTailoredResume() {
  return useMutation({
    mutationFn: (data: GenerateTailoredResumeRequest) => sniperApi.generateTailoredResume(data),
  });
}
