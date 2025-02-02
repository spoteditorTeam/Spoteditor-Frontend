import { LuArrowUpRight } from "react-icons/lu";

const YouCanBeSpecialEditor = () => {
  return (
    <div className="w-full h-[196px] bg-white mb-20 py-5 gap-7 flex items-center border-t border-b border-[#E5E6E8]">
      <div className="w-[655px] flex flex-col gap-6 font-pretendard">
        <div className="text-[#242528] text-28 font-bold">
          모든 유저가 특별한 “에디터"가 될 수 있어요!
        </div>
        <div className="flex">
          <button className="flex flex-col items-start gap-[10px] rounded-full bg-black px-[24px] py-[12px] font-pretendard text-white text-20 font-medium">
            나의 추천 코스 등록하기
          </button>
          <button className="flex items-center justify-center w-[54px] h-[54px] rounded-full bg-black">
            <LuArrowUpRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="w-[655px] flex items-center">
        <p className="whitespace-pre-line font-pretendard text-17 font-normal text-[#ABAFB5]">
          내가 좋아하는 숨은 명소와 맛집을 공유하고, 다른 유저들이 여러분의
          루트를 참고하며
          <br />
          "내가 만든 코스로 누군가 즐거운 하루를 보냈구나!" 하는 느낌, 상상만
          해도 행복하지 않나요? 🥰 <br />
          다른 유저들이 참고할 수 있도록 여러분만의 코스를 나눠보세요. <br />
          여러분이 만들어준 코스는 많은 사람들에게 새로운 영감을 줄 거예요!
        </p>
      </div>
    </div>
  );
};

export default YouCanBeSpecialEditor;
