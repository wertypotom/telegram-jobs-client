import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeApi } from '../api';

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => resumeApi.uploadResume(file),
    onSuccess: () => {
      // Invalidate user query to refresh resume status
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
