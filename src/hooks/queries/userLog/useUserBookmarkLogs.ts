import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';

export default function useUserBookmarkLogs(params: LogsQueryParams) {
  return useQuery({
    queryKey: userLogsKeys.bookmarkLogList(params),
    queryFn: () => api.userLog.getUserBookmarkLogs(params),
  });
}
