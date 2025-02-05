import PageContentLayout from '@/components/Layout/PageContentLayout';
import ProfileHeader from '@/feature/profile/ProfileHeader';

function Profile() {
  return (
    <PageContentLayout className="bg-green-300">
      <ProfileHeader />
    </PageContentLayout>
  );
}

export default Profile;
