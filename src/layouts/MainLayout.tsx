import MainFooter from '@/components/Footer/MainFooter';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Header/MainHeader/MainHeader';

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center h-auto min-h-screen web:min-w-[1440px] w-full">
      <MainHeader />
      <div className="w-full grow">
        <Outlet />
      </div>
      <MainFooter />
      {/* 원하는 순간에 조건문을 추가하여 렌더링할 것
      <GeoConsentModal /> */}
    </div>
  );
};

export default MainLayout;
