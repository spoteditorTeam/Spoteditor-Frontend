import { API_BASE_URL } from '@/services/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export default function KakaoAuthTest() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false, // 401 발생 시 재요청 방지
  });
  console.log('user', user);

  return <div>KakaoAuthTest</div>;
}
