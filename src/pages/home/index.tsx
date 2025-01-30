import MainFooter from "../../components/Footer/MainFooter";
import MainHeader from "../../components/Header/MainHeader";
import HomePageIntroContent from "../../feature/homepage/HomePageIntroContent";
import YouCanBeSpecialEditor from "../../feature/homepage/YouCanBeSpecialEditor";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-red-50">
      <MainHeader />
      <HomePageIntroContent />
      <div className="flex flex-col w-full h-[2720px] mt-16 px-50px bg-white">
        <div className="w-full h-[603px] bg-red-400 mb-20"></div>
        <YouCanBeSpecialEditor />
        <div className="w-full h-[1524px] bg-red-400 "></div>
      </div>
      <MainFooter />
    </div>
  );
};

export default HomePage;
