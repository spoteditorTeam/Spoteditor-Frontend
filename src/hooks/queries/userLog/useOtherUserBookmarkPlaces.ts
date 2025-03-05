import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';

export default function useOtherUserBookmarkPlaces(userId: number, params: LogsQueryParams) {
  return useQuery({
    queryKey: userLogsKeys.otherUserBookmarkPlaceList(userId, params),
    queryFn: () => api.userLog.getOtherUserBookmarkPlaces({ userId, params }),
  });
}
