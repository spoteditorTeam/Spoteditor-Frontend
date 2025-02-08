import BellIcon from '@/components/Icons/BellIconIcon';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function NotificationButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <BellIcon />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0 mobile:w-screen">
        <SheetHeader className="flex flex-row items-center justify-between w-full py-3 space-y-0 web:px-6 mobile:px-4">
          <SheetTitle className="font-medium text-20">알림</SheetTitle>
          <SheetClose>
            <XIcon className="w-[34px] h-[34px]" />
          </SheetClose>
        </SheetHeader>
        <section>
          {Array.from({ length: 7 }).map((_, idx) => (
            <article key={idx} className="w-full px-2.5 py-5 flex justify-start items-center">
              <figure></figure>
              <figcaption className="text-12">
                <span className="font-semibold">EDITOR_H</span>
                <p>님이 팔로우 했습니다.</p>
                <time>5분 전</time>
              </figcaption>
            </article>
          ))}
        </section>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationButton;
