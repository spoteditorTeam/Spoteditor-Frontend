import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { useQuery } from '@tanstack/react-query';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';

export default function useUserBookmarkPlaces({
  page = 1,
  size = 12,
  direction = 'ASC',
}: Partial<LogsQueryParams> = {}) {
  return useQuery({
    queryKey: userLogsKeys.bookmarkPlaceList({ page, size, direction }),
    queryFn: () => api.userLog.getUserBookmarkPlaces({ page, size, direction }),
  });
}
