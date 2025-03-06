import ProfileHeader from '@/features/profile/ProfileHeader';
import TapNavigation from '@/features/profile/TapNavigation';
import useUser from '@/hooks/queries/user/useUser';
import PageLayout from '@/layouts/PageLayout';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

function Profile() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { userId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    if (user?.userId === userId) {
      nav('/');
    }
    /* 현재 경로가 '/profile/:userId'일 경우 my-logs으로 이동 */
    if (pathname.match(/^\/profile\/\d+$/)) {
      nav(`/profile/${userId}/my-logs`);
    }
  }, [user, userId, pathname]);
  return (
    <div className="flex w-full flex-col gap-[50px] items-center">
      <PageLayout>
        <ProfileHeader />
        <TapNavigation />
        <Outlet />
      </PageLayout>
    </div>
  );
}

export default Profile;
