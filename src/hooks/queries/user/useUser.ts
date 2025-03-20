import { authUserApi } from '@/services/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import { useAuthStore } from '@/store/loginStore';

type UserState = 'userOnly' | 'nonUserOnly';

export default function useUser(userState?: UserState) {
  const { pathname } = useLocation();
  const profilePage = pathname.startsWith('/profile');
  const { isAuthenticated, checkAuth } = useAuthStore();

  //로그인 여부 체크 (최초 1회 실행)
  useEffect(() => {
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  const { data, error, isFetching } = useQuery({
    queryKey: userKeys.me(),
    queryFn: () => authUserApi.getUser(),
    staleTime: profilePage ? 0 : Infinity,
    enabled: isAuthenticated === true, //로그인된 경우에만 실행
  });

  const nav = useNavigate();

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
  }, [data, error, nav, userState]);

  return { user: data, isLoading: isFetching };
}
