import XIcon from '@/components/Icons/XIcon';
import Loading from '@/components/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useFollowing from '@/hooks/queries/follow/useFollowing';
import useOtherFollowing from '@/hooks/queries/follow/useOtherFollowing';

interface FollowingListButtonProps {
  isMe: boolean;
  otherUserId: number;
}

export default function FollowingListButton({ isMe, otherUserId }: FollowingListButtonProps) {
  const { data: meFollowing, isLoading: meFollowingLoading } = useFollowing(isMe);
  const { data: otherFollowing, isLoading: otherFollowingLoading } = useOtherFollowing(
    isMe,
    otherUserId
  );

  const isLoading = isMe ? meFollowingLoading : otherFollowingLoading;
  const data = isMe ? meFollowing : otherFollowing;

  return (
    <Dialog>
      <DialogTrigger asChild className="outline-none">
        <button className="flex items-center space-x-1">
          <DialogDescription className="text-black text-[18px]">팔로잉</DialogDescription>
          <span className="font-bold text-center text-[18px]">{data?.pages.length}</span>
        </button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-[340px] web:w-[348px] h-420 p-0 overflow-hidden">
        <DialogTitle className="grid grid-cols-3 w-full mb-2 section-heading h-[50px] px-2.5">
          <div />
          <div className="flex items-center justify-center">
            <span className="text-center">팔로잉</span>
          </div>
          <DialogClose
            asChild
            className="flex items-center justify-end w-full web:py-2 mobile:py-[13px]"
          >
            <button>
              <XIcon className="w-[34px] h-[34px]" />
            </button>
          </DialogClose>
        </DialogTitle>
        <div className="pr-[5px] w-full">
          <article className="w-full px-[19px] h-[370px] flex flex-col overflow-y-scroll">
            {isLoading ? (
              <Loading className="w-full pl-[5px]" />
            ) : (
              data?.pages.map((folloingList) =>
                folloingList.content.map((folloing) => (
                  <article
                    key={folloing.userId}
                    className="flex items-center w-full py-[6px] between justify-between"
                  >
                    <figure className="flex items-center gap-[6px]">
                      <Avatar>
                        <AvatarImage src={folloing.imageUrl} alt={`${folloing.name}님의 프로필`} />
                        <AvatarFallback>{folloing.name}</AvatarFallback>
                      </Avatar>
                      <figcaption className="font-bold text-text-xs">{folloing.name}</figcaption>
                    </figure>
                    {isMe && (
                      <Button
                        variant="ghost"
                        className="font-medium h-7 w-[62px] rounded-[60px] text-text-xs"
                      >
                        팔로잉
                      </Button>
                    )}
                  </article>
                ))
              )
            )}
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}
