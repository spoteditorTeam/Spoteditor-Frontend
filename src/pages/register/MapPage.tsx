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
  const isSDKLoadedRef = useRef(false);
  const isMapLoadedRef = useRef(false);
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const geoCoderRef = useRef(null);
  const currentLocationRef = useRef<{ lat: number; lon: number } | null>(null);

  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);

  // sdk 로드
  useEffect(() => {
    if (!isSDKLoadedRef.current) {
      loadKakaoMapSDK(() => {
        isSDKLoadedRef.current = true;

        // 지도 로드 되면 초기화
        window.kakao.maps.load(() => {
          isMapLoadedRef.current = true;
          initMap();
        });
      });
    }
  }, []);

  const initMap = async () => {
    if (!isSDKLoadedRef.current || !isMapLoadedRef.current) return;

    try {
      const { lat, lon } = await getCurrentLocation(); // 현재 위치 가져오기
      currentLocationRef.current = { lat, lon };

      const options = {
        center: new window.kakao.maps.LatLng(lat, lon), // 직접 lat, lon 사용
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
      placeRef.current = new window.kakao.maps.services.Places();
      geoCoderRef.current = new window.kakao.maps.services.Geocoder();
    } catch (error) {
      console.log('위치 정보 가져오기 실패');
    }
  };

  // 검색어 입력
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !placeRef.current || !mapRef.current) return;

    removeMarker(); // 기존 검색어 마크 지우기

    const query = inputRef.current.value;
    placeRef.current.keywordSearch(query, searchByKeyword, {
      location: new window.kakao.maps.LatLng(
        currentLocationRef.current?.lat,
        currentLocationRef.current?.lon
      ),
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
      setPlaces([]);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
      setPlaces([]);
    }
  };

  const displayPlaces = (result) => {
    const bounds = new window.kakao.maps.LatLngBounds(); // 경계 객체

    const newMarkers = result.map((place) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      bounds.extend(placePosition);
      return addMarker(placePosition);
    });

    mapRef.current?.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const addMarker = (position) => {
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(mapRef.current);

    // 클릭 시 중앙 정렬
    window.kakao.maps.event.addListener(marker, 'click', () => {
      mapRef.current?.setCenter(position);
    });

    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  // 장소 클릭 시, 지도 중심을 클릭한 장소로 이동
  const handlePlaceClick = (place) => {
    if (!mapRef.current || !placeRef.current) return;
    const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
    mapRef.current.setCenter(placePosition);
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

export default MapPage;
