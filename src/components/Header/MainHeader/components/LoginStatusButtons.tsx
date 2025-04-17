import NotificationButton from '@/features/notification/NotificationButton';
import useUser from '@/hooks/queries/user/useUser';
import LoginButton from '@/components/Header/MainHeader/components/LoginButton';
import UserProfileButton from '@/components/Header/MainHeader/components/UserProfileButton/UserProfileButton';

function LoginStatusButtons() {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <>
          <NotificationButton />
          <UserProfileButton user={user} />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default LoginStatusButtons;
