import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface SaveProfileButtonProps {
  userId: number;
  onTrigger?: () => void;
}

function SaveProfileButton({ userId, onTrigger }: SaveProfileButtonProps) {
  const nav = useNavigate();
  const onUpdateClick = () => {
    nav(`/profile/${userId}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            if (onTrigger) {
              onTrigger();
            }
          }}
          className="rounded-[6px] w-[120px] h-[42px]"
        >
          저장
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full mb-2 font-bold text-text-2xl">
          저장이 완료 되었습니다.
        </DialogTitle>
        <DialogDescription className="w-full mb-4 text-text-xs font-regular text-primary-500 text-start">
          수정된 프로필 정보가 저장되었습니다.
        </DialogDescription>
        <DialogClose asChild className="flex justify-end w-full">
          <div className="space-x-[15px]">
            <Button type="button" onClick={onUpdateClick} size="sm" className="w-[100px]">
              확인
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default SaveProfileButton;
