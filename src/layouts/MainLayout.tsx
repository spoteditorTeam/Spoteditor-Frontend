import MainFooter from '@/components/Footer/MainFooter';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Header/MainHeader/MainHeader';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen web:min-w-[1440px] web:pt-[60px] mobile:pt-10">
      <MainHeader />
      <div className="w-full grow">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
