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
import useOtherUserBookmarkPlaces from '@/hooks/queries/userLog/useOtherUserBookmarkPlaces';
import useUserBookmarkPlaces from '@/hooks/queries/userLog/useUserBookmarkPlaces';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function SavedSpaces() {
  const { user } = useUser();
  const { userId } = useParams();

  const isMySaveLogs = user?.userId === userId;

  const { data, isPending } = isMySaveLogs
    ? useUserBookmarkPlaces()
    : useOtherUserBookmarkPlaces(Number(user?.userId));
  return (
    <>
      {isPending ? (
        <Loading className="min-h-[350px]" />
      ) : (
        <>
          <PostCardWrapper className="mb-[50px]">
            {data?.content.map((place) => (
              <Link to={`/log/${place.placeId}/placesCollection`}>
                <MotionCard key={place.placeId}>
                  <PostCardImage lable className="bg-red-300" imageUrl="" />
                  <PostCardTitle title={place.name} />
                  <PostCardLocation location={place.address.sido} detail={place.address.sigungu} />
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

export default SavedSpaces;
