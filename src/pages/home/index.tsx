import logo from "../../assets/homepage/logo.png";
import search from "../../assets/homepage/search.png";
import global from "../../assets/homepage/global.png";
import signup from "../../assets/homepage/signup.png";

const HomePage = () => {
  return (
    <div className="w-[1440px] h-screen bg-red-50">
      <div className="w-full h-[346px] bg-black px-50px">
        <header className="flex justify-between py-5">
          <img src={logo} alt="logo" />
          <div className="flex gap-12">
            <img src={search} alt="search_logo" />
            <img src={global} alt="global_logo" />
            <img
              src={signup}
              alt="signup and signin"
              className="w-[90px] h-[21px]"
            />
          </div>
        </header>
      </div>
    </div>
  );
};

export default HomePage;
