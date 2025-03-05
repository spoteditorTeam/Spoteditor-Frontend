import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { useQuery } from '@tanstack/react-query';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';

export default function useUserBookmarkPlaces(params: LogsQueryParams) {
  return useQuery({
    queryKey: userLogsKeys.bookmarkPlaceList(params),
    queryFn: () => api.userLog.getUserBookmarkPlaces(params),
  });
}
