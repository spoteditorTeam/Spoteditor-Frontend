import { userKeys } from '@/hooks/queries/user/userQueryKeys';
import { followKeys } from '@/hooks/queries/follow/followQueryKeys';
import api from '@/services/apis/api';
import { ApiErrorResponse } from '@/services/apis/types/commonApi';
import { FollowResponse } from '@/services/apis/types/followAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IOhterUser } from '@/services/apis/types/userAPI';
import { useLocation, useParams } from 'react-router-dom';
import { logKeys } from '@/hooks/queries/log/logQueryKeys';
import { Address } from 'cluster';
import { Image } from '@/services/apis/types/registerAPI.type';

export interface PlaceInLog {
  placeId: number;
  userId: number;
  userName: string;
  userImage: string;
  name: string;
  description: string;
  address: Address;
  category: string;
  images: Image[];
}

interface UseFollowMutationProps {
  otherUserName: string;
  otherUserImage: string;
}

export function useFollowingMutation({ otherUserName, otherUserImage }: UseFollowMutationProps) {
  const { pathname } = useLocation();
  const { placeLogId } = useParams();

  /* 상세페이지에서 팔로잉할 경우에만 낙관적 단일로그 낙관적 업데이트 */
  const detailPage = pathname.startsWith('/log');

  const queryClient = useQueryClient();

  return useMutation<void, ApiErrorResponse, number>({
    mutationFn: (userId: number) => api.follow.postFollow(userId),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: followKeys.userFollowings(userId) });
      await queryClient.cancelQueries({ queryKey: userKeys.otherUser(userId) });
      if (detailPage && placeLogId) {
        await queryClient.cancelQueries({ queryKey: logKeys.detail(Number(placeLogId)) });
      }

      const followingPreviousFollowers = queryClient.getQueryData(
        followKeys.userFollowings(userId)
      );
      const otherUserPrevious = queryClient.getQueryData(userKeys.otherUser(userId));
      const logPrevious = detailPage
        ? queryClient.getQueryData(logKeys.detail(Number(placeLogId)))
        : undefined;

      queryClient.setQueryData(followKeys.userFollowings(userId), (oldData: FollowResponse) => {
        return {
          ...oldData,
          content: [
            ...(oldData?.content ?? []),
            { userId, name: otherUserName, imageUrl: otherUserImage },
          ],
        };
      });
      queryClient.setQueryData(userKeys.otherUser(userId), (oldData: IOhterUser) => {
        const currentIsFollowing = oldData.isFollowing;
        return {
          ...oldData,
          isFollowing: !currentIsFollowing,
        };
      });
      if (detailPage && placeLogId) {
        queryClient.setQueryData(logKeys.detail(Number(placeLogId)), (oldData: IOhterUser) => {
          const currentIsFollowing = oldData.isFollowing;
          return {
            ...oldData,
            isFollowing: !currentIsFollowing,
          };
        });
      }
      return { followingPreviousFollowers, otherUserPrevious, logPrevious };
    },

    onError(_, userId, context: any) {
      queryClient.setQueryData(
        followKeys.userFollowings(userId),
        context.followingPreviousFollowers
      );
      queryClient.setQueryData(userKeys.otherUser(userId), context.otherUserPrevious);
      if (detailPage && context.logPrevious) {
        queryClient.setQueryData(logKeys.detail(Number(placeLogId)), context.logPrevious);
      }
    },

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: followKeys.userFollowings(userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.otherUser(userId) });
      if (detailPage && placeLogId) {
        queryClient.invalidateQueries({ queryKey: logKeys.detail(Number(placeLogId)) });
      }
    },
  });
}
