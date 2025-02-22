import { currentUser, IUser } from '@/services/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type UserState = 'userOnly' | 'nonUserOnly';

export default function useUser(userState?: UserState) {
  const { data, error } = useQuery<IUser>({
    queryKey: ['user'],
    queryFn: () => currentUser.getUser(),
  });

  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (error) {
      console.error('사용자 데이터 가져오는 중 오류 발생:', error);
      return;
    }
    if (userState === 'nonUserOnly' && data) {
      nav('/');
    }
    if (userState === 'userOnly' && !data) {
      nav('/', { replace: true });
    }
  }, [data, error, nav, pathname, userState]);

  return { user: data, isLoading: !data && !error };
}
