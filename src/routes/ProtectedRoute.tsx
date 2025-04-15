import { HOME } from '@/constants/pathname';
import useAuth from '@/hooks/queries/user/useAuth';
import { useLoginMoalStore } from '@/store/loginStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { openLoginModal } = useLoginMoalStore();
  const { data: user } = useAuth();

  if (!user) {
    openLoginModal();
    return <Navigate to={HOME} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
