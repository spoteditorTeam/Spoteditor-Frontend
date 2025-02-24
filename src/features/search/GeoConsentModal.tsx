import CompassIcon from '@/components/Icons/CompassIcon';
import XIcon from '@/components/Icons/XIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export default function GeoConsentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* 임시 오픈 버튼 */}
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogPrimitive.Overlay className=" mobile:bg-white" />
      <DialogContent
        hideCloseButton
        className="mobile:top-0 mobile:left-[50%] w-[375px] web:w-[424px] mobile:translate-x-[-50%] mobile:translate-y-0 web:p-[15px]"
      >
        <section className="flex items-center justify-end w-full p-4 web:p-0">
          <DialogClose asChild>
            <button>
              <XIcon className="w-[34px] h-[34px]" />
            </button>
          </DialogClose>
        </section>
        <div className="flex flex-col px-5">
          <DialogHeader className="gap-4 web:gap-6 mb-2.5">
            <section className="flex flex-col items-center w-full gap-5">
              <CompassIcon />
              <DialogTitle className="font-bold text-text-2xl">
                위치기반 서비스 이용 동의
              </DialogTitle>
            </section>
            <DialogDescription className="text-text-xs text-primary-700">
              스팟에디터는 위치 정보의 보호 및 이용 등에 관한 법률에 따라 현재 위치 확인, 주변
              관광지 찾기가 포함된 서비스 이용을 위해서 위치기반 서비스 이용 약관 동의가 필요합니다.
              동의하지 않는 경우 위치기반 서비스 이용에 제약을 받을 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row items-center gap-2 py-5 web:grid web:grid-cols-2">
            <Button variant="outline" className="flex-1 font-semibold">
              거절
            </Button>
            <Button className="font-semibold">동의</Button>
          </DialogFooter>
        </div>
        <div className="mobile:fixed mobile:top-0 mobile:-z-10 mobile:w-screen mobile:h-screen mobile:bg-white" />
      </DialogContent>
    </Dialog>
  );
}
