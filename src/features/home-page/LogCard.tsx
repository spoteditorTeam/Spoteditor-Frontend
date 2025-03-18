import useLogBookmarkMutation from '@/hooks/mutations/log/useLogBookmarkMutation';
import useLogBookMark from '@/hooks/queries/log/useLogBookMark';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import { LogContent, PlaceInLog } from '@/services/apis/types/logAPI.type';
import { getImgFromCloudFront } from '@/utils/getImgFromCloudFront';
import { Bookmark, Loader2 } from 'lucide-react';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
type LogCardProps = {
  isLarge?: boolean; // latest의 3번째 이미지
  vertical?: boolean; // popularity 세로형 vs latest 가로형
  log?: LogContent;
  place?: PlaceInLog;
  isModal?: boolean;
};

const LogCard = memo(({ isLarge, vertical, log, place, isModal }: LogCardProps) => {
  const navi = useNavigate();
  const { data, isPending } = useLogBookMark(Number(log?.placeLogId));
  const isBookmarked = data?.isBookmarked;

  const { mutate } = useLogBookmarkMutation({
    isBookMark: data?.isBookmarked,
    placeLogId: Number(log?.placeLogId),
  });

  const handleCardClick = () => {
    if (!isModal) navi(`/log/${log?.placeLogId}`);
  };
  const { isMobile } = useResponsive();
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
  };

  return (
    <div
      className={cn('h-full gap-1.5', isLarge ? 'flex flex-col' : 'grid grid-rows-[auto_1fr]')}
      onClick={handleCardClick}
    >
      {/* 이미지 */}
      <div className={cn('relative grow group cursor-pointer')}>
        <img
          src={getImgFromCloudFront(log?.image.storedFile ?? place?.images[0].storedFile ?? '')}
          alt="장소 이미지"
          className={cn(
            'object-cover w-full aspect-[3/2]',
            vertical && 'aspect-[3/4]',
            vertical && isMobile && 'max-w-xs mx-auto'
          )}
        />
        <div className="absolute inset-0 card-id-gradient"></div>
        <div className="absolute inset-0 hover:bg-black/25 transition-colors"></div>
        {!isModal && (
          <span className="flex items-center gap-1 p-2.5 text-white text-text-2xs font-semibold absolute bottom-0">
            {log?.author}
          </span>
        )}

        <div
          onClick={handleBookmarkClick}
          className={cn(
            'bg-white absolute top-4 right-4 p-[11px] opacity-0 group-hover:opacity-100 group/bookmark',
            isModal && 'top-1 right-1'
          )}
        >
          {isPending ? (
            <Loader2 className="animate-spin text-gray-400" size={20} />
          ) : (
            <Bookmark
              className={cn(
                'group-hover/bookmark:text-primary-400',
                isBookmarked && 'fill-black stroke-black'
              )}
              size={20}
            />
          )}
        </div>
      </div>
      {/* 설명 */}
      <div className="text-text-sm web:text-text-md">
        <h5 className="font-bold">{log?.name || place?.name} </h5>
        <h6 className="text-primary-300 font-normal">
          {log && `${log.address.sido} | ${log.address.sigungu}`}
          {place && `${place.address.sido} | ${place.address.sigungu}`}
        </h6>
      </div>
    </div>
  );
});

export default LogCard;
