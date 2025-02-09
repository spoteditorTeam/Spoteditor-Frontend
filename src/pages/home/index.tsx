import MainFooter from '@/components/Footer/MainFooter';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CitySearchForm from '@/feature/homepage/CitySearchForm';
import CourseButton from '@/feature/homepage/CourseButton';
import PlaceCard from '@/feature/homepage/PlaceCard';

const categories: string[] = [
  '로.맨.틱 데이트 코스!',
  '가성비 굿 하루',
  '액티비티한 하루!',
  '감성충전 미술관 데이트',
  '홀로 독서하는 하루',
  '찐하게 소비한 하루',
  '친구랑 다양하고 알차게 보낸 하루',
];
const HomePage = () => {
  return (
    <div>
      <div className="bg-black py-8 px-4 flex flex-col web:grid web:grid-cols-2 web:gap-[30px] web:px-[50px] web:py-10">
        <div className="flex flex-col justify-between gap-5">
          <div className="text-white text-md web:text-xl">
            반가워요! <br />
            Spoteditor는 "어디 가서 놀지?"
            <br className="block web:hidden" />
            하고 고민하는
            <br className="hidden web:block" />
            여러분을 위해
            <br className="block web:hidden" />
            만들어졌어요.
          </div>

          <CitySearchForm />
        </div>

        <div className="flex flex-col web:px-5 gap-5">
          <p className="text-primary-500 text-text-sm web:text-text-xl">
            사실 어디 놀러 갈지 정하는 게 의외로 스트레스잖아요? 맛집도 찾고, 사진 찍기 좋은 곳도
            골라야 하고, 이동 동선도 생각해야 하고... 아, 머리 아파! Spoteditor에선 그런 고민 필요
            없어요. 하루를 알차게 보낼 수 있는 데이트 코스나 친구랑 돌아다니기 좋은 루트를 쉽게
            찾아볼 수 있게 도와드릴게요. 그냥 간단히 어떤 분위기의 하루를 보내고 싶은지, 누구랑 함께
            하는지, 어떤 지역에서 놀고 싶은지만 알려주세요. 저희가 딱 맞는 루트를 추천해 드릴게요.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <CourseButton key={category} category={category} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex justify-between items-end mt-10 mb-6">
          <div>
            <h3 className="text-primary-300 text-xl font-semibold">Sort by</h3>
            <h3 className="text-primary-950 text-xl font-semibold">Popularity</h3>
          </div>
          <div className="hidden web:block">--------</div>
        </div>

        {/* 컨테이너 */}
        <Carousel>
          <CarouselContent className="gap-4 flex">
            {[...Array(5)].map((_, idx) => (
              <CarouselItem className="flex-none web:basis-1/4" key={idx}>
                <PlaceCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 에디터 설명 */}
        <div></div>

        {/* <YouCanBeSpecialEditor /> */}
        {/* <SortByLog /> */}
      </div>
      <MainFooter />
    </div>
  );
};

export default HomePage;
