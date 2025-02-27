import NotificationButton from '@/features/notification/NotificationButton';
import UserProfileButton from './UserProfileButton';
import useUser from '@/hooks/useUser';
import LoginButton from '@/components/Header/MainHeader/components/LoginButton';

function LoginStatusButtons() {
  const { user } = useUser();
  console.log('user', user);

  return (
    <>
      {user ? (
        <>
          <NotificationButton />
          <UserProfileButton />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}

export default LoginStatusButtons;
