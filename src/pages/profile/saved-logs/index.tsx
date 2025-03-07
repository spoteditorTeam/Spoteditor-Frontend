import CustomPagination from '@/components/CustomPagination';
import Loading from '@/components/Loading';
import MotionCard from '@/components/MotionCard';
import {
  PostCardImage,
  PostCardLocation,
  PostCardTitle,
  PostCardWrapper,
} from '@/features/profile/PostCard';
import useUser from '@/hooks/queries/user/useUser';
import useOtherUserBookmarkLogs from '@/hooks/queries/userLog/useOtherUserBookmarkLogs';
import useUserBookmarkLogs from '@/hooks/queries/userLog/useUserBookmarkLogs';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SavedLogs() {
  const { user } = useUser();
  const { userId } = useParams();

  const isMySaveLogs = user?.userId === userId;

  const { data, isPending } = isMySaveLogs
    ? useUserBookmarkLogs()
    : useOtherUserBookmarkLogs(Number(user?.userId));
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
            <CustomPagination
              currentPage={Number(data?.pageNumber)}
              totalPages={Number(data?.totalPages)}
            />
          </section>
        </>
      )}
    </>
  );
}

export default SavedLogs;
