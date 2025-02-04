import UserIcon from '@/components/Icons/UserIcon';
import global from '@/assets/homepage/global.png';
import { useLoginMoalStore } from '@/store/loginStore';
import BellIcon from '@/components/Icons/BellIconIcon';

function LoginStatusButtons() {
  const { openLoginModal } = useLoginMoalStore();

  return (
    <>
      <button>
        <img src={global} alt="global_logo" className="object-contain w-[20px] h-[20px]" />
      </button>
      <button onClick={openLoginModal} className="font-bold text-14">
        회원가입/로그인
      </button>
      <button>
        <BellIcon />
      </button>
      <button>
        <UserIcon />
      </button>
    </>
  );
}

export default LoginStatusButtons;
