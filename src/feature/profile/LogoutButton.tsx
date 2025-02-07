import LogoutIcon from '@/components/Icons/LogoutIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function LogoutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-start gap-2 text-[14px]">
          <LogoutIcon />
          로그아웃
        </button>
      </DialogTrigger>
      <DialogContent className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full mb-2 section-heading">저장이 완료 되었습니다.</DialogTitle>
        <DialogDescription className="text-12 text-[#6D727D] text-start w-full mb-4">
          수정된 프로필 정보가 저장되었습니다.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutButton;
