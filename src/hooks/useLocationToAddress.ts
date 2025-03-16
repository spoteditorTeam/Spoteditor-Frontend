import { useEffect, useState } from "react";

interface AddressData {
    region_1depth_name: string; // 시/도 (예: 서울특별시)
    region_2depth_name: string; // 시/군/구 (예: 강남구)
    region_3depth_name: string; // 동/읍/면 (예: 역삼동)
    address_name: string; // 전체 주소
  }

export default function useLocationToAddress(latitude: number | null, longitude: number | null) {
    const [address, setAddress] = useState<AddressData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (latitude === null || longitude === null) return;
      if (!window.kakao || !window.kakao.maps) {
        setError("카카오맵 API가 로드되지 않았습니다.");
        return;
      }
  
      const geocoder = new kakao.maps.services.Geocoder();
  
      setLoading(true);
      setError(null);
  
      geocoder.coord2RegionCode(longitude, latitude, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
          setAddress(result[0]); // 첫 번째 결과를 사용
        } else {
          setError("주소 정보를 가져올 수 없습니다.");
        }
        setLoading(false);
      });
    }, [latitude, longitude]);
  
    return { address, loading, error };
    }