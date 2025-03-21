import { authUserApi } from '@/services/apis/userApi';
import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authUserApi.getUser(),
    retry: 1,
    staleTime: Infinity,
  });
};

export default useAuth;
