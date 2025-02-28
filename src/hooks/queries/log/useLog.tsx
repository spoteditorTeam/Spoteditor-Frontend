import { useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const useLog = (placeLogId: number) => {
  return useQuery({
    queryKey: [logKeys.detail(placeLogId)],
    queryFn: () => {},
  });
};

export default useLog;
