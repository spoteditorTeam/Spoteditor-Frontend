import { Button } from '@/components/ui/button';
import { logoutAuth } from '@/services/apis/authApi';
import { userKeys } from '@/services/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function LogoutConfirmButton() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logoutAuth,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      window.location.href = '/';
    },
    onError(err) {
      console.log(err);
    },
  });

  const onLogoutClick = () => {
    mutate();
  };
  return (
    <Button onClick={onLogoutClick} className="w-[100px]">
      확인
    </Button>
  );
}
