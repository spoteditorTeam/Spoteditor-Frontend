import { KakaoPlace } from '@/pages/register/types/place.type';
import { create } from 'zustand';

type RegisterStoreState = {
  selectedPlaces: KakaoPlace[]; // 선택한 장소
  recentSearchPlaces: KakaoPlace[]; // 최근 검색 장소
};

type RegisterStoreActions = {
  addSelectedPlace: (place: KakaoPlace) => void;
  removeSelectedPlace: (place: KakaoPlace) => void;
};

type RegisterStore = RegisterStoreState & RegisterStoreActions;

export const useRegisterStore = create<RegisterStore>()((set) => ({
  selectedPlaces: [],
  recentSearchPlaces: [],
  addSelectedPlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.some((item) => item.id === place.id)
        ? state.selectedPlaces
        : [...state.selectedPlaces, place],
      recentSearchPlaces: state.recentSearchPlaces.some((item) => item.id === place.id)
        ? state.recentSearchPlaces
        : [...state.recentSearchPlaces, place],
    })),
  removeSelectedPlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter((item) => item !== place),
    })),
}));
