import { create } from 'zustand';

type RegisterStoreState = {
  searchPlaces: string[];
};

type RegisterStoreActions = {
  addSearchPlace: (place) => void;
  removeSearchPlace: (place) => void;
};

type RegisterStore = RegisterStoreState & RegisterStoreActions;

export const useRegisterStore = create<RegisterStore>()((set) => ({
  searchPlaces: [],
  addSearchPlace: (place) =>
    set((state) => ({
      searchPlaces: [...state.searchPlaces, place],
    })),
  removeSearchPlace: (place) =>
    set((state) => ({
      searchPlaces: state.searchPlaces.filter((item) => item !== place),
    })),
}));
