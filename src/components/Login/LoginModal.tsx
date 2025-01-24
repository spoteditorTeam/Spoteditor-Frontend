import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import kakaoLoginButton from '@/assets/login/kakao-login-button.png';
import { Button } from '../ui/button';
import { useLoginMoalStore } from '@/store/loginStore';

function LoginModal() {
  const { isOpen, closeLoginModal } = useLoginMoalStore();
  return (
    /* onClose(): 모달이 닫힐 때 호출되어 open을 false로 변경 */
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeLoginModal()} modal={true}>
      <DialogContent>
        <div className="w-full h-[50px]" />
        <div className="flex w-[339px] flex-col items-center gap-[2px]">
          <DialogHeader className="flex flex-col items-center gap-[26px] self-stretch">
            <DialogTitle>Spoteditor</DialogTitle>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>
              지금 로그인 하시고 매일 새로운 Spoteditor의
              <br /> 업데이트 소식을 확인해보세요.
            </DialogDescription>
          </DialogHeader>
          <Button size="icon" variant="ghost" className="w-auto web:my-5 mobile:my-10">
            <img className="object-contain" src={kakaoLoginButton} alt="카카오 로그인 버튼" />
          </Button>
          <p className="text-12 leading-5 text-center tracking-[-0.24px] w-[314px]">
            로그인은 <span className="underline underline-offset-2">개인정보보호정책</span> 및
            <span className="underline underline-offset-2">서비스약관</span>에 동의하는 것을
            의미하며, 서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
