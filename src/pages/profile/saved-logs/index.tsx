import PostCardLayout from '@/components/Layout/PostCardLayout';
import MainPagination from '@/components/Pagination/MainPagination';
import {
  PostCard,
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
} from '@/features/profile/PostCard';

function SavedLogs() {
  return (
    <>
      <PostCardLayout className="mb-[50px]">
        {Array.from({ length: 12 }).map((_, idx) => (
          <PostCard key={idx}>
            <PostCardImage lable className="bg-green-300" />
            <PostCardTitle title="혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페" />
            <PostCardLocation location="서울" detail="위치 세부 정보" />
          </PostCard>
        ))}
      </PostCardLayout>
      <MainPagination />
    </>
  );
}

export default SavedLogs;
