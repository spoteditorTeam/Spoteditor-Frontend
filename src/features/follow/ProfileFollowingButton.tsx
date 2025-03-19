import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';
import { useUnfollowMutation } from '@/hooks/mutations/follow/useUnfollowMutation';
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
  const { mutate: onMutate } = useFollowingMutation({
    otherUserName,
    otherUserImage,
  });
  const { mutate: unMutate } = useUnfollowMutation();

  const userId = otherUserId;
  console.log('userData?.isFollowing', userData?.isFollowing);

  const mutate = userData && userData?.isFollowing ? unMutate : onMutate;
  const onFollowClick = () => {
    mutate(userId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={userData && userData?.isFollowing ? 'ghost' : 'outline'}
      size="s"
      className="font-medium"
      fullRounded
    >
      {userData && userData?.isFollowing ? '팔로잉' : '팔로워'}
    </Button>
  );
}
