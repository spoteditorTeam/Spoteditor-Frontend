import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { useQuery } from '@tanstack/react-query';
import { userLogsKeys } from '@/hooks/queries/userLog/userLogQueryKeys';
import api from '@/services/apis/api';

export default function useUserLogs(params: LogsQueryParams) {
  return useQuery({
    queryKey: userLogsKeys.logList(params),
    queryFn: () => api.userLog.getUserLogs(params),
  });
}
