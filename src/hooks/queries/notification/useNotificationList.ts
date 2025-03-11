import { useInfiniteQuery } from '@tanstack/react-query';
import { notificationKeys } from './notificationQueryKeys';
import api from '@/services/apis/api';
import { NotificationParams } from '@/services/apis/types/notificationAPI';

export default function useNotificationList({
  size = 20,
  direction = 'ASC',
}: Partial<NotificationParams> = {}) {
  return useInfiniteQuery({
    queryKey: notificationKeys.list(),
    queryFn: ({ pageParam }) =>
      api.notification.getNotificationList({ ...pageParam, size, direction }),
    initialPageParam: { page: 1 },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage <= lastPage.totalPages ? { page: nextPage } : null;
    },
  });
}
