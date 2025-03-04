import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/queries/user/useLogout';

export default function LogoutConfirmButton() {
  const { mutate } = useLogout();

  const onLogoutClick = () => {
    mutate();
  };
  return (
    <Button onClick={onLogoutClick} className="w-[100px]">
      확인
    </Button>
  );
}
