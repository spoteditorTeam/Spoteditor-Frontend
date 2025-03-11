import { notificationKeys } from '@/hooks/queries/notification/notificationQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { INotification, NotificationResponse } from '@/services/apis/types/notificationAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type useReadAllNotificationProps = INotification;

export default function useReadAllNotification({
  from,
  to,
  type,
  message,
}: useReadAllNotificationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: () => api.notification.putNotiAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.all });

      const notificationPrevious = queryClient.getQueryData(notificationKeys.all);

      queryClient.setQueryData(notificationKeys.all, (oldData: NotificationResponse) => {
        const fiterNoti = oldData.content.filter(
          (noti) =>
            !(
              noti.from === from &&
              noti.to === to &&
              noti.type === type &&
              noti.message === message
            )
        );
        return {
          ...oldData,
          content: fiterNoti,
        };
      });

      return { notificationPrevious };
    },

    onError(_, __, context: any) {
      queryClient.setQueryData(notificationKeys.all, context.notificationPrevious);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
