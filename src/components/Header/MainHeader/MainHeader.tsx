import logo from '@/assets/homepage/logo.png';
import search from '@/assets/homepage/search.png';
import global from '@/assets/homepage/global.png';
import LoginModal from '../../Login/LoginModal';
import { useSearchStore } from '@/store/searchStore';
import LoginStatusButtons from './LoginStatusButtons';

const MainHeader = () => {
  const { toggleSearchBar } = useSearchStore();

  return (
    <header className="w-full bg-black web:py-[20px] web:px-[50px] mobile:py-[4px] mobile:px-[16px] flex justify-between">
      <img src={logo} alt="logo" className="object-contain" />
      <section className="flex web:gap-[46px] mobile:gap-[20px] items-center justify-between text-white">
        <button onClick={toggleSearchBar}>
          <img src={search} alt="search_logo" className="object-contain w-[20px] h-[20px]" />
        </button>
        <button>
          <img src={global} alt="global_logo" className="object-contain w-[20px] h-[20px]" />
        </button>
        <LoginStatusButtons />
      </section>
      <LoginModal />
    </header>
  );
};

export default MainHeader;
