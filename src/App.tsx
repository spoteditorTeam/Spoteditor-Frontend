import { Outlet } from 'react-router-dom';
import LoginModal from './components/Login/LoginModal';
import { useLoginMoalStore } from './store/loginStore';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const { openLoginModal } = useLoginMoalStore();
  return (
    <div className="flex flex-col justify-center max-h-screen">
      {/* 로그인 모달창 오픈 예시 버튼 */}
      <button onClick={openLoginModal} className="btn">
        로그인 창 열기
      </button>
      <SearchBar />
      <Outlet />
      <LoginModal />
    </div>
  );
};

export default App;
