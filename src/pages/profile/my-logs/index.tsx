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
import { Link, useParams, useSearchParams } from 'react-router-dom';

function MyLogs() {
  const { user } = useUser();
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber');
  const totalPages = searchParams.get('totalPages');

  const isMyLogs = user?.userId === userId;

  /* const { data: myLogsData, isPending: isMyLogsPending } = useUserLogs(
    { page: Number(pageNumber) },
    { enabled: isMyLogs }
  ); */

  const { data, isPending } = isMyLogs ? useUserLogs() : useOtherUserLogs(Number(user?.userId));

  const data = isMyLogs ? myLogsData : otherLogsData;
  const isPending = isMyLogs ? isMyLogsPending : isOtherLogsPending;
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
                  <PostCardImage lable imageUrl={log.image.originalFile} />
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
