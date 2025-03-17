import LogCard from '@/components/LogCard/LogCard';
import LogCardSkeleton from '@/components/Skeleton/LogCardSkeleton';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useLogList from '@/hooks/queries/log/useLogList';
import { LogContent } from '@/services/apis/types/logAPI.type';
import Autoplay from 'embla-carousel-autoplay';

const MainCarousel = () => {
  const { data, isPending, isError } = useLogList();
  const { content } = data ?? {};
  const isDataReady = isPending || !data || isError;
  return (
    <Carousel
      plugins={[Autoplay({ delay: 8000, stopOnInteraction: false })]}
      opts={{
        slidesToScroll: 4,
      }}
    >
      <CarouselContent className="flex">
        {isDataReady
          ? [...Array(4)].map((_, idx) => (
              <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={idx}>
                <LogCardSkeleton />
              </CarouselItem>
            ))
          : content?.map((log: LogContent) => (
              <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={log.placeLogId}>
                <LogCard vertical log={log} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MainCarousel;
