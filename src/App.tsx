import { Outlet } from "react-router-dom";
import HomePage from "./pages/home";

const App = () => {
  return (
    <div className="flex justify-center">
      <HomePage />
    </div>
  );
};

export default App;
