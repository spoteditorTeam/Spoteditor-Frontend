import api from '@/services/apis/api';
import { LogsQueryParams } from '@/services/apis/types/logAPI.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const useLogList = (params: LogsQueryParams = { page: 1, size: 5, direction: 'ASC' }) => {
  return useQuery({
    queryKey: [logKeys.list(params)],
    queryFn: () => api.log.getLogs(params),
    placeholderData: keepPreviousData,
  });
};

export default useLogList;
