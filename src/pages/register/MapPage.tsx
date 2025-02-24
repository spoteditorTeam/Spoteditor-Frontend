import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS } from '@/constants/pathname';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
declare global {
  interface Window {
    kakao: any;
  }
}

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [map, setMap] = useState(null); // map 객체
  const [ps, setPlaceInstance] = useState(null); //place 객체
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);

  // sdk 로드
  useEffect(() => loadKakaoMapSDK(() => setIsSDKLoaded(true)), []);

  // 지도 로드
  useEffect(() => {
    if (isSDKLoaded) window.kakao.maps.load(() => setIsMapLoaded(true));
  }, [isSDKLoaded]);

  // 지도 객체 생성하기
  useEffect(() => {
    if (!isMapLoaded || !mapContainerRef.current) return;

    (async () => {
      try {
        const { lat, lon } = await getCurrentLocation(); // 현재 위치 가져오기

        const options = {
          center: new window.kakao.maps.LatLng(lat, lon), // 직접 lat, lon 사용
          level: 2,
        };

        const Imap = new window.kakao.maps.Map(mapContainerRef.current, options);
        setMap(Imap);

        const Iplaces = new window.kakao.maps.services.Places();
        setPlaceInstance(Iplaces);

        setCurrentLocation({ lat, lon }); // 위치 상태 업데이트 (나중에 필요하면 사용)
      } catch (error) {
        console.error('현재 위치를 가져올 수 없습니다.', error);
      }
    })();
  }, [isMapLoaded]);

  // 검색어 입력
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !ps || !map) return;

    removeMarker();

    // 현재 위치에서 2km
    // Q 특정 지역을 기준으로 검색 안됨
    ps.keywordSearch(inputRef.current.value, searchByKeyword, {
      location: new kakao.maps.LatLng(currentLocation?.lat, currentLocation?.lon),
      radius: 2000,
    });
  };

  // pagination 가능
  const searchByKeyword = (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(result);
      displayPlaces(result);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (result) => {
    const bounds = new window.kakao.maps.LatLngBounds(); // 경계 객체

    const newMarkers = result.map((place) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      bounds.extend(placePosition);
      return addMarker(placePosition, place);
    });

    map?.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const addMarker = (position, place) => {
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(map);

    // 클릭 시 중앙 정렬
    window.kakao.maps.event.addListener(marker, 'click', () => {
      map.setCenter(position); // 마커 클릭 시 지도 중앙으로 이동
    });
  };

  const removeMarker = () => {
    markers.forEach((markerObj) => markerObj.marker.setMap(null));
    setMarkers([]);
  };

  // 장소 클릭 시, 마커와 인포윈도우 열기
  const handlePlaceClick = (place) => {
    if (!map || !ps) return;

    const placePosition = new window.kakao.maps.LatLng(place.y, place.x);

    // 지도 중심을 클릭한 장소로 이동
    map.setCenter(placePosition);

    // 기존 마커와 인포윈도우를 제거한 후 새로 추가
    removeMarker();
    const { marker, infowindow } = addMarker(placePosition, place);

    // 인포윈도우 열기
    infowindow.open(map, marker);
  };

  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar ref={inputRef} onSubmit={handleSubmit} />

      {/* 지도 담을 영역 */}
      <div ref={mapContainerRef} className="w-full h-full relative"></div>

      {/* 장소 리스트 */}
      {places.length > 0 && (
        <div className="overflow-y-auto scrollbar-hide h-1/2">
          <ul className="cursor-pointer">
            {places.map((place, index) => (
              <li
                key={index}
                className="py-2.5 px-4  flex justify-between items-center hover:bg-primary-50"
                onClick={() => handlePlaceClick(place)} // 장소 클릭 시 처리
              >
                <div>
                  <div className="flex items-center gap-[3px] font-medium mb-[3px]">
                    <h4 className="text-text-sm">{place.place_name}</h4>
                    <span className="text-text-xs text-primary-400">{place.category_name}</span>
                  </div>
                  <div className="flex font-medium text-text-xs items-center gap-1.5">
                    <h5 className=" text-primary-300">도로명</h5>
                    <p className="text-primary-400">{place.road_address_name}</p>
                  </div>
                  <div className="flex font-medium text-text-xs items-center gap-1.5">
                    <h5 className=" text-primary-300">지번</h5>
                    <p className="text-primary-400">{place.address_name}</p>
                  </div>
                </div>
                <Button variant={'outline'} size={'s'} fullRounded>
                  선택
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-4 mb-6 pt-2">
        <Button className="w-full" asChild size={'xl'}>
          <Link to={REGISTER_DETAILS}>선택</Link>
        </Button>
      </div>
    </div>
  );
};

// sdk
function loadKakaoMapSDK(loadedCallback) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_KEY
  }&autoload=false&libraries=services,clusterer`;
  script.async = true;
  script.onload = loadedCallback;
  document.head.appendChild(script);
}

// geolocation
async function getCurrentLocation() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

export default MapPage;
