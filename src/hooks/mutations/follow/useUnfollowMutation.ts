import { followKeys } from '@/hooks/queries/follow/followQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { FollowResponse } from '@/services/apis/types/followAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUnfollowMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId) => api.follow.deleteFollow(userId),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.userFollowings(userId) });

      const previousFollowers = queryClient.getQueryData(followKeys.userFollowings(userId));

      queryClient.setQueryData(followKeys.userFollowings(userId), (oldData: FollowResponse) => {
        const fillterData = oldData?.content?.filter((user) => user.userId !== userId);
        return {
          ...oldData,
          content: fillterData ?? [],
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
