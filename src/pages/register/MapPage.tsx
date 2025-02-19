import { Button } from '@/components/ui/button';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// 카카오맵 kakao 객체 타입 선언
const kakao = (window as any).kakao;

const MapPage = () => {
  useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
      };
      new kakao.maps.Map(container, options);
    });
  }, []);

  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar />

      {/* 지도 담을 영역 */}
      <div id="map" className="w-full h-full"></div>

      <div className="px-4 mb-6 pt-2">
        <Button className="w-full" asChild size={'xl'}>
          <Link to={'#'}>선택</Link>
        </Button>
      </div>
    </div>
  );
};

export default MapPage;
