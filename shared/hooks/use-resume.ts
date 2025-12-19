import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeApi } from '../api';
import { toast } from 'sonner';
import { getErrorMessage, logError } from '../lib/error-utils';

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => resumeApi.uploadResume(file),
    onSuccess: () => {
      // Invalidate user query to refresh resume status
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
      logError('UploadResume', error);
    },
  });
}
