import { Outlet } from 'react-router-dom';
import MainHeader from './components/Header/MainHeader/MainHeader';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  return (
    <div className="flex flex-col items-center web:w-[1440px] web:mx-auto mobile:max-w-full mobile:min-w-[480px]">
      <MainHeader />
      <SearchBar />
      <Outlet />
    </div>
  );
};

export default App;
