import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import { logoutAuth } from '@/services/apis/authApi';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAuth,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      window.location.href = '/';
    },
    onError(err) {
      console.error('로그아웃 실패:', err);
    },
  });
}
