import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';

export default function useUserBookmarkLogs({
  page = 1,
  size = 12,
  direction = 'ASC',
}: Partial<LogsQueryParams> = {}) {
  return useQuery({
    queryKey: userLogsKeys.bookmarkLogList({ page, size, direction }),
    queryFn: () => api.userLog.getUserBookmarkLogs({ page, size, direction }),
  });
}
