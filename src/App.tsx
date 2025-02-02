import { Outlet } from 'react-router-dom';
import MainHeader from './components/Header/MainHeader';

const App = () => {
  return (
    <div className="flex flex-col items-center web:w-[1440px] web:mx-auto mobile:max-w-[768px]">
      <MainHeader />
      <Outlet />
    </div>
  );
};

export default App;
