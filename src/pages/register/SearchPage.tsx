import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS } from '@/constants/pathname';
import PlaceListItem from '@/features/registerpage/PlaceListItem';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar />

      <div className="px-4 py-[14px] bg-primary-50 text-text-sm font-medium flex gap-3">
        <span className="flex items-center gap-[3px] cursor-pointer">
          장소명
          <CircleX className="p-1" />
        </span>
        <span className="flex items-center gap-[3px] cursor-pointer">
          장소명
          <CircleX className="p-1" />
        </span>
        <span className="flex items-center gap-[3px] cursor-pointer">
          장소명
          <CircleX className="p-1" />
        </span>
      </div>

      <main className="flex flex-col items-center grow gap-[3px] px-4">
        {/* 최근 검색 */}
        <div className="w-full">
          <h3 className="text-text-2xl font-bold pt-5 pb-2.5">최근 검색한 장소</h3>
          {[...Array(5)].map((_, idx) => (
            <PlaceListItem key={idx} />
          ))}
        </div>

        {/* 5개부터 활성화 */}
        <Button className="w-full" variant={'ghost'}>
          전체보기
        </Button>
      </main>

      {/* 버튼 */}
      <Button className="w-full mb-3" asChild size={'xl'}>
        <Link to={REGISTER_DETAILS}>완료</Link>
      </Button>
    </div>
  );
};

export default SearchPage;
