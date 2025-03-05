import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';

export default function useOtherUserBookmarkLogs(userId: number, params: LogsQueryParams) {
  return useQuery({
    queryKey: userLogsKeys.otherUserBookmarkLogList(userId, params),
    queryFn: () => api.userLog.getOtherUserBookmarkLogs({ userId, params }),
  });
}
