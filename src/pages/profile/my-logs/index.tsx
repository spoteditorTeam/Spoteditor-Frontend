import Loading from '@/components/Loading';
import MotionCard from '@/components/MotionCard';
import CustomPagination from '@/components/CustomPagination';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUserLogs from '@/hooks/queries/userLog/useOtherUserLogs';
import useUserLogs from '@/hooks/queries/userLog/useUserLogs';
import { Link, useParams } from 'react-router-dom';

function MyLogs() {
  const { user } = useUser();
  const { userId } = useParams();

  const isMyLogs = user?.userId === userId;

  const { data, isPending } = isMyLogs ? useUserLogs() : useOtherUserLogs(Number(user?.userId));
  return (
    <>
      {isPending ? (
        <Loading className="min-h-[350px]" />
      ) : (
        <>
          <PostCardWrapper className="mb-[50px]">
            {data?.content.map((log) => (
              <Link to={`/log/${log.placeLogId}`}>
                <MotionCard key={log.placeLogId}>
                  <PostCardImage lable imageUrl={log.image.storedFile} />
                  <PostCardTitle title={log.name} />
                  <PostCardLocation location={log.address.sido} detail={log.address.sigungu} />
                </MotionCard>
              </Link>
            ))}
          </PostCardWrapper>
          <section className="mt-[50px]">
            <CustomPagination currentPage={data?.pageNumber!} totalPages={data?.totalPages!} />
          </section>
        </>
      )}
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
