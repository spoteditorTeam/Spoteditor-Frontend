import logo from '../../assets/homepage/logo.png';
import search from '../../assets/homepage/search.png';
import global from '../../assets/homepage/global.png';
import signup from '../../assets/homepage/signup.png';
import { useLoginMoalStore } from '@/store/loginStore';
import LoginModal from '../Login/LoginModal';

const MainHeader = () => {
  const { openLoginModal } = useLoginMoalStore();
  return (
    <header className="fixed top-0 left-7.1 w-[1440px] bg-black z-50 flex justify-between py-5 px-50px">
      <img src={logo} alt="logo" />
      <div className="flex gap-12 w-[222px]">
        <img src={search} alt="search_logo" />
        <img src={global} alt="global_logo" />
        <img
          onClick={openLoginModal}
          src={signup}
          alt="signup and signin"
          className="w-[90px] h-[21px]"
        />
      </div>
      <LoginModal />
    </header>
  );
};

export default MainHeader;
