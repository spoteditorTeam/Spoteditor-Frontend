import MainHeader from "../../components/Header/MainHeader";
import HomePageIntroContent from "../../feature/homepage/HomePageIntroContent";

const HomePage = () => {
  return (
    <div className="w-[1440px] h-screen bg-red-50">
      <MainHeader />
      <HomePageIntroContent />

      <div className="w-full h-[2720px] mt-16 mb-36 bg-red-700"></div>
    </div>
  );
};

export default HomePage;
