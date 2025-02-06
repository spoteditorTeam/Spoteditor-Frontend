import PenIcon from '@/components/Icons/PenIcon';
import PageContentLayout from '@/components/Layout/PageContentLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

function ProfileSetting() {
  return (
    <PageContentLayout className="web:gap-[50px]">
      <div className="web:w-[661px] mobile:w-screen flex flex-col">
        <article className=" flex justify-center mb-[32px]">
          <div className="relative">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex justify-center bg-white items-center w-[26px] h-[26px] z-10 rounded-[60px] border border-[#E5E6E8] absolute right-0 bottom-0">
              <PenIcon className="w-4 h-4 stroke-black" />
            </div>
          </div>
        </article>
        <section className="mb-[40px]">
          <p className="mb-4 font-bold text-18">프로필 편집</p>
          <form className="flex flex-col gap-[20px]">
            <section className="flex flex-col border-b border-b-[#E5E6E8]">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-[5px] font-bold text-14">
                  닉네임
                </label>
                <span className="text-11 text-[#ABAFB5]">14/30</span>
              </div>
              <input placeholder="Spoteditor-123" className="py-1" />
            </section>
            <section className="flex flex-col border-b border-b-[#E5E6E8]">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-[5px] font-bold text-14">
                  프로필 설명
                </label>
                <span className="text-11 text-[#ABAFB5]">14/30</span>
              </div>
              <textarea
                placeholder="소소한 하루, 특별한 순간들을 기록하는 공간 ☕️ 일상의 작은 행복부터 여행의 찰나까지 🏞"
                className="py-1 break-words resize-none"
              />
            </section>
            <section className="flex flex-col border-b border-b-[#E5E6E8]">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-[5px] font-bold text-14">
                  인스타그램
                </label>
              </div>
              <input placeholder="@" className="py-1" />
            </section>
          </form>
        </section>
        <section>
          <p className="mb-4 font-bold text-18">계정 설정</p>
          <div className="flex items-center justify-between py-[5px]">
            <p className="font-bold text-14">계정 삭제</p>
            <span className="text-red-600 text-12">삭제하기</span>
          </div>
        </section>
        <section className="flex justify-between">
          <Button variant="outline" className="rounded-[6px] w-[120px] h-[42px]">
            취소
          </Button>
          <Button className="rounded-[6px] w-[120px] h-[42px]">저장</Button>
        </section>
      </div>
    </PageContentLayout>
  );
}

export default ProfileSetting;
