import { followKeys } from '@/hooks/queries/follow/followQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { FollowResponse } from '@/services/apis/types/followAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseFollowMutationProps {
  otherUserName: string;
  otherUserImage: string;
}

export function useFollowingMutation({ otherUserName, otherUserImage }: UseFollowMutationProps) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId: number) => api.follow.postFollow(userId),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.userFollowings(userId) });

      const previousFollowers = queryClient.getQueryData(followKeys.userFollowings(userId));

      queryClient.setQueryData(followKeys.userFollowings(userId), (oldData: FollowResponse) => {
        return {
          ...oldData,
          content: [
            ...(oldData?.content ?? []),
            { userId, name: otherUserName, imageUrl: otherUserImage },
          ],
        };
      });

      return { previousFollowers };
    },

    onError(_, userId, context: any) {
      queryClient.setQueryData(followKeys.userFollowings(userId), context.previousHeroData);
    },

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: followKeys.userFollowings(userId) });
    },
  });
}
