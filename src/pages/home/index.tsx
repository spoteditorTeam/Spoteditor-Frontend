import MainFooter from "../../components/Footer/MainFooter";
import MainHeader from "../../components/Header/MainHeader";
import HomePageIntroContent from "../../feature/homepage/HomePageIntroContent";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-red-50">
      <MainHeader />
      <HomePageIntroContent />
      <div className="flex flex-col w-full h-[2720px] mt-16 px-50px bg-red-700">
        <div className="w-full h-[603px] bg-white mb-20"></div>
        <div className="w-full h-[234px] bg-white mb-20 py-5"></div>
        <div className="w-full h-[1524px] bg-white"></div>
      </div>
      <MainFooter />
    </div>
  );
};

export default HomePage;
