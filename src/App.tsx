import { Outlet } from "react-router-dom";
import HomePage from "./pages/home";

const App = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[1440px] max-w-full">
        <HomePage />
      </div>
    </div>
  );
};

export default App;
