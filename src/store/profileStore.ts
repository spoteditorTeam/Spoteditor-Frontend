import { create } from 'zustand';

interface ProfileState {
  file: File | null;
  setFile: (file: File) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
}));

interface ProfileNavigationStore {
  navigator: any;
  setNavigator: (navigator: any) => void;
}

export const useProfileNavigationStore = create<ProfileNavigationStore>((set) => ({
  navigator: null,
  setNavigator: (navigator) => set({ navigator }),
}));
