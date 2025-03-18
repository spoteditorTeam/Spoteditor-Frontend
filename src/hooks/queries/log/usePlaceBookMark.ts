import api from '@/services/apis/api';
import { useQuery } from '@tanstack/react-query';
import { logKeys } from './logQueryKeys';

const usePlaceBookMark = (placeLogId: number) => {
  return useQuery({
    queryKey: [...logKeys.bookMark(placeLogId)],
    queryFn: () => api.place.getPlaceBookMark(placeLogId),
    staleTime: 0,
  });
};

export default usePlaceBookMark;
