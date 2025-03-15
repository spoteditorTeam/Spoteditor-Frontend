import BellIcon from '@/components/Icons/BellIconIcon';
import XIcon from '@/components/Icons/XIcon';
import NotificationSkeleton from '@/components/Skeleton/NotificationSkeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useNotificationList from '@/hooks/queries/notification/useNotificationList';
import useNotificationWebSocket from '@/hooks/useNotificationWebSocket';
import { cn } from '@/lib/utils';
import { formatNotificationJSX } from '@/utils/notificationUtils';
import { formatRelativeTime } from '@/utils/timeUtils';
import NotNotification from './NotNotification';

function NotificationButton() {
  useNotificationWebSocket();
  const { data: notisData, isLoading: isNotiLoading } = useNotificationList();  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <BellIcon />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0 mobile:w-screen">
        <SheetHeader className="flex flex-row items-center justify-between w-full py-3 space-y-0 web:px-6 mobile:px-4">
          <SheetTitle className="text-sm font-medium">알림</SheetTitle>
          <SheetClose>
            <XIcon className="w-[34px] h-[34px]" />
          </SheetClose>
        </SheetHeader>
        <section>
          {isNotiLoading ? (<NotificationSkeleton />) : notisData?.length === 0 ? (<NotNotification />) : notisData?.map((noti) => (
            <article
            key={noti.id}
            className={cn(
              'w-full web:px-5 mobile:px-4 py-2.5 flex justify-start gap-3 items-center border-y border-white',
              noti.isRead ? '' : 'bg-[#EFF6FF]'
            )}
          >
            <figure>
              <Avatar className="w-9 h-9">
                <AvatarImage src={noti.imageUrl} alt='userAvatar' />
              </Avatar>
            </figure>
            <figcaption className="flex text-text-xs web:max-w-[342px]">
              <span>
                {formatNotificationJSX(noti.message)}
                <time className="ml-1 whitespace-nowrap text-text-xs font-medium text-[#81858F]">
                  {formatRelativeTime(noti.createdAt)}
                  </time>
              </span>
            </figcaption>
          </article>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationButton;
