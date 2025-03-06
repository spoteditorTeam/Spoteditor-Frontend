import MainPagination from '@/components/Pagination/MainPagination';
import PostCardSkeleton from '@/components/Skeleton/PostCardSkeleton';
import {
  PostCard,
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';
import useUserLogs from '@/hooks/queries/userLog/useUserLogs';

function MyLogs() {
  const { data, isLoading } = useUserLogs();
  console.log(data);

  return (
    <>
      {isLoading ? (
        <PostCardSkeleton />
      ) : (
        <PostCardWrapper className="mb-[50px]">
          {data?.content.map((log) => (
            <PostCard key={log.placeLogId} className="bg-blue-300">
              <PostCardImage lable className="bg-slate-300" imageUrl="" />
              <PostCardTitle title={log.name} />
              <PostCardLocation location={log.address.sido} detail={log.address.sigungu} />
            </PostCard>
          ))}
        </PostCardWrapper>
      )}
      <section className="mt-[50px]">
        <MainPagination />
      </section>
    </>
  );
}

export default MyLogs;

{
  /* <PostCardWrapper className="mb-[50px]">
  {Array.from({ length: 12 }).map((_, idx) => (
    <PostCard key={idx} className="bg-blue-300">
      <PostCardImage lable className="bg-slate-300" />
      <PostCardTitle title="혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페" />
      <PostCardLocation location="서울" detail="위치 세부 정보" />
    </PostCard>
  ))}
</PostCardWrapper>; */
}
