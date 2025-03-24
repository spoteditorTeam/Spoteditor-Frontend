import { create } from 'zustand';

type RegisterStoreState = {
  experience: {
    selectedWhom: string[];
    selectedMoods: string[];
  };

  selectedPlaces: kakao.maps.services.PlacesSearchResult; // 선택한 장소
  recentSearchPlaces: kakao.maps.services.PlacesSearchResult; // 최근 검색 장소
};

type RegisterStoreActions = {
  setCompanions: (whom: string) => void;
  setFeelings: (feeling: string) => void;

  addSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  removeSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  resetSelectedPlaces: () => void;
  moveUpSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  moveDownSelectedPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
};

type RegisterStore = RegisterStoreState & RegisterStoreActions;

export const useRegisterStore = create<RegisterStore>()((set) => ({
  // States
  experience: {
    selectedWhom: [],
    selectedMoods: [],
  },
  selectedPlaces: [],
  recentSearchPlaces: [],

  // Actions
  setCompanions: (whom) =>
    set((state) => ({
      experience: {
        ...state.experience,
        selectedWhom: state.experience.selectedWhom.includes(whom)
          ? state.experience.selectedWhom.filter((item) => item !== whom)
          : [...state.experience.selectedWhom, whom],
      },
    })),

  setFeelings: (feeling) =>
    set((state) => ({
      experience: {
        ...state.experience,
        selectedMoods: state.experience.selectedMoods.includes(feeling)
          ? state.experience.selectedMoods.filter((item) => item !== feeling)
          : [...state.experience.selectedMoods, feeling],
      },
    })),

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
      selectedPlaces: state.selectedPlaces.filter((item) => item.id !== place.id),
    })),
  resetSelectedPlaces: () => set(() => ({ selectedPlaces: [] })),

  moveUpSelectedPlace: (place) =>
    set((state) => {
      const index = state.selectedPlaces.findIndex((item) => item.id === place.id);
      if (index > 0) {
        const newSelectedPlaces = [...state.selectedPlaces];
        const target = newSelectedPlaces[index];

        newSelectedPlaces.splice(index, 1);
        newSelectedPlaces.splice(index - 1, 0, target);
        return { selectedPlaces: newSelectedPlaces };
      }
      return state;
    }),

  moveDownSelectedPlace: (place) =>
    set((state) => {
      const index = state.selectedPlaces.findIndex((item) => item.id === place.id);
      if (index < state.selectedPlaces.length - 1) {
        const newSelectedPlaces = [...state.selectedPlaces];
        const target = newSelectedPlaces[index];

        newSelectedPlaces.splice(index, 1);
        newSelectedPlaces.splice(index + 1, 0, target);
        return { selectedPlaces: newSelectedPlaces };
      }
      return state;
    }),
}));
