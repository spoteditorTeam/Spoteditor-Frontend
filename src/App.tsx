import { Outlet } from 'react-router-dom';
import LoginModal from './components/Login/LoginModal';
import { useLoginMoalStore } from './store/loginStore';

const App = () => {
  const { openLoginModal } = useLoginMoalStore();
  return (
    <div className="flex justify-center">
      {/* 로그인 모달창 오픈 예시 버튼 */}
      <button onClick={openLoginModal} className="btn">
        로그인 창 열기
      </button>
      <Outlet />
      <LoginModal />
    </div>
  );
};

export default App;
