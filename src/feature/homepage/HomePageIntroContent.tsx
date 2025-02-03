import { useSearchStore } from '@/store/searchStore';
import ui from '../../assets/homepage/ui-spoteditor.png';

const HomePageIntroContent = () => {
  const category: string[] = [
    '로.맨.틱 데이트 코스!',
    '가성비 굿 하루',
    '액티비티한 하루!',
    '감성충전 미술관 데이트',
    '홀로 독서하는 하루',
    '찐하게 소비한 하루',
    '친구랑 다양하고 알차게 보낸 하루',
  ];
  const { isOpen } = useSearchStore();
  return (
    <>
      {!isOpen ? (
        <div className="w-full flex pt-24 py-10 h-[387px] gap-7 bg-black px-50px">
          <div className="w-[655px] flex flex-col gap-9 bg-red-300">
            <div className="text-white font-pretendard text-32 font-500">
              반가워요!
              <br />
              Spoteditor는 <span className="font-semibold">"어디 가서 놀지?"</span> 하고 고민하는
              <br />
              여러분을 위해 만들어졌어요.
            </div>
            <section className="w-full bg-blue-300"></section>
          </div>
          <div className="w-[655px] flex flex-col gap-5">
            <img src={ui} alt="ui_spoteditior_description" />
            <div className="flex flex-wrap gap-1.5">
              {category.map((i) => {
                return (
                  <div
                    key={i}
                    className="flex h-8 justify-center items-center text-center px-3.5 py-3 rounded-full border border-[#424448] font-pretendard text-14 text-white w-auto"
                  >
                    {i}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HomePageIntroContent;
