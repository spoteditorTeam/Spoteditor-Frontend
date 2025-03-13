import { Button } from '@/components/ui/button';
import { useFollowingMutation } from '@/hooks/mutations/follow/useFollowingMutation';

interface LogFollowingButtonProps {
  userId: number;
  userName: string;
  userImage: string;
  isFollowing: boolean;
}

export default function LogFollowingButton({
  userId,
  userName,
  userImage,
  isFollowing,
}: LogFollowingButtonProps) {
  const { mutate } = useFollowingMutation({
    otherUserName: userName,
    otherUserImage: userImage,
  });

  const onFollowClick = () => {
    mutate(userId);
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={isFollowing ? 'ghost' : 'outline'}
      size="s"
      className="font-medium"
      fullRounded
    >
      {isFollowing ? '팔로잉' : '팔로워'}
    </Button>
  );
}
