import { useMutation } from '@tanstack/react-query';
import { sniperApi } from '../api';
import type { GenerateTailoredResumeRequest } from '../types/api';
import { toast } from 'sonner';
import { getErrorMessage, logError } from '../lib/error-utils';

export function useGenerateTailoredResume() {
  return useMutation({
    mutationFn: (data: GenerateTailoredResumeRequest) => sniperApi.generateTailoredResume(data),
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
      logError('GenerateTailoredResume', error);
    },
  });
}
