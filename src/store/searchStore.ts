import { create } from 'zustand';

interface SearchState {
  isOpen: boolean;
  toggleSearchBar: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  toggleSearchBar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface CitySearchState {
  sido: string;
  sigungu: string;
  setSido: (sido: string) => void;
  setSigungu: (sigungu: string) => void;
}

export const useCitySearchStore = create<CitySearchState>((set) => ({
  sido: '',
  sigungu: '',
  setSido: () => set((state) => ({ sido: state.sido })),
  setSigungu: () => set((state) => ({ sigungu: state.sido })),
}));
