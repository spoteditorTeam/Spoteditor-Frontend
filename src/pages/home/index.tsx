import MainHeader from "../../components/Header/MainHeader";
import HomePageIntroContent from "../../feature/homepage/HomePageIntroContent";

const HomePage = () => {
  return (
    <div className="w-[1440px] h-screen bg-red-50">
      <div className="w-full h-[388px] bg-black px-50px">
        <MainHeader />
        <HomePageIntroContent />
      </div>
    </div>
  );
};

export default HomePage;
