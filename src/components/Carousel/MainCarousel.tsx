import LogCardSkeleton from '@/components/Skeleton/LogCardSkeleton';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import LogCard from '@/features/home-page/LogCard';
import useLogList from '@/hooks/queries/log/useLogList';
import { LogContent } from '@/services/apis/types/logAPI.type';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const MainCarousel = () => {
  const { data, isPending, isError } = useLogList();
  const { content } = data ?? {};
  const isDataReady = isPending || !data || isError;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    if (!api) return;
    const newProgress = api.scrollProgress() * 100;
    setProgress(newProgress);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on('scroll', updateProgress);
    return () => {
      api.off('scroll', updateProgress);
    };
  }, [api, updateProgress]);

  return (
    <>
      <div className="w-full flex justify-end relative bottom-[50px]">
        <div className="w-20 h-1 bg-primary-200">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{
              width: ` ${progress}%`,
            }}
          />
        </div>
      </div>
      <Carousel
        plugins={[Autoplay({ delay: 8000, stopOnInteraction: false })]}
        opts={{
          slidesToScroll: 4,
        }}
        setApi={setApi}
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
    </>
  );
};

export default MainCarousel;
