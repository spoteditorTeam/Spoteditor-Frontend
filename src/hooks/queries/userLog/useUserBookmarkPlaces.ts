import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { UserBookmarkPlaces } from '@/services/apis/types/userLogAPI';

export default function useUserBookmarkPlaces(
  { page = 1, size = 12, direction = 'ASC' }: Partial<LogsQueryParams> = {},
  queryOptions?: Partial<UseQueryOptions<UserBookmarkPlaces, Error>>
) {
  return useQuery({
    queryKey: userLogsKeys.bookmarkPlaceList({ page, size, direction }),
    queryFn: () => api.userLog.getUserBookmarkPlaces({ page, size, direction }),
    ...queryOptions,
  });
}
