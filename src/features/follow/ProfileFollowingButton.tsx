import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';
import useOtherUser from '@/hooks/queries/user/useOtherUser';

interface ProfileFollowingButtonProps {
  otherUserId: number;
  otherUserName: string;
  otherUserImage: string;
}

export default function ProfileFollowingButton({
  otherUserId,
  otherUserName,
  otherUserImage,
}: ProfileFollowingButtonProps) {
  const { data: userData } = useOtherUser(otherUserId);
  const { mutate } = useFollowingMutation({
    otherUserName,
    otherUserImage,
  });
  const userId = otherUserId;
  const onFollowClick = () => {
    mutate(userId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={userData?.isFollowing ? 'ghost' : 'outline'}
      size="s"
      className="font-medium"
      fullRounded
    >
      {userData?.isFollowing ? '팔로잉' : '팔로워'}
    </Button>
  );
}
