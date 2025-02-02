import { Outlet } from 'react-router-dom';
import HomePage from './pages/home';

const App = () => {
  return (
    <div className="flex flex-col items-center web:w-[1440px] web:mx-auto mobile:max-w-[768px]">
      <HomePage />
    </div>
  );
};

export default App;
