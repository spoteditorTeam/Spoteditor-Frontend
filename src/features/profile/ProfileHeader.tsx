import VerifiedLabelIcon from '@/components/Icons/VerifiedLabelIcon';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FollowButton from './FollowButton';
import { Link, useParams } from 'react-router-dom';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUser from '@/hooks/queries/user/useOtherUser';
import ProfileHeaderSkeleton from '@/components/Skeleton/ProfileHeaderSkeleton';
import useFollowing from '@/hooks/queries/follow/useFollowing';

function ProfileHeader() {
  const { userId } = useParams();
  const { user, isLoading: userLoading } = useUser();
  console.log('user', user);

  const isMe = user?.userId === Number(userId);
  const { data: otherUserData, isLoading: otherUserLoading } = useOtherUser(Number(userId));
  const { data: meFollowing, isLoading: meFollowingLoading } = useFollowing(isMe);
  console.log('meFollowing', meFollowing?.pages);

  const data = isMe ? user : otherUserData;
  const isLoading = isMe ? userLoading : otherUserLoading;

  return (
    <>
      {isLoading ? (
        <ProfileHeaderSkeleton isMe={isMe} />
      ) : (
        <section className="flex flex-col items-center justify-start w-full pb-5 web:pb-[30px]">
          <section>
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage src={data?.imageUrl} alt="user Avatar" />
            </Avatar>
          </section>
          <section className="gap-[6px] flex justify-center items-center my-3">
            <h2 className="font-bold text-md web:text-xl">{data?.name}</h2>
            <VerifiedLabelIcon className="w-[16.075px] h-[15.921px] web:w-[22px] web:h-[21px]" />
          </section>
          <section className="flex gap-[15px] py-1 text-text-lg web:text-text-2xl">
            <FollowButton label="팔로워" count={data?.follower!} />
            <div className="flex items-center">
              <Separator orientation="vertical" className="h-3 bg-primarySlate" />
            </div>
            <FollowButton label="팔로잉" count={data?.following!} />
          </section>
          <section className="flex my-[7px] flex-col gap-[10px] web:gap-[15px] items-center text-primarySlate text-text-xs web:text-text-sm">
            <h3 className="font-medium text-center">
              {data?.description ? (
                data?.description
              ) : (
                <>
                  소소한 하루, 특별한 순간들을 기록하는 공간 ☕️ <br /> 일상의 작은 행복부터 여행의
                  찰나까지 🏞️
                </>
              )}
            </h3>
            <h3>{data?.instagramId ? data.instagramId : '@spoteditorofficial'}</h3>
          </section>
          {isMe && (
            <Link to="/profile-setting">
              <Button
                variant="outline"
                className="mt-[10px] web:mt-[15px] p-2 w-[50px] web:w-[60px] h-[24px] web:h-[28px] rounded-[60px] font-medium text-text-xs"
              >
                편집
              </Button>
            </Link>
          )}
        </section>
      )}
    </>
  );
}

export default ProfileHeader;
