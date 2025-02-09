import { create } from 'zustand';

interface LoginModalState {
  isOpen: boolean;
  toggleLoginModal: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useLoginMoalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  toggleLoginModal: () => set((state) => ({ isOpen: !state.isOpen })),
  openLoginModal: () => set(() => ({ isOpen: true })),
  closeLoginModal: () => set(() => ({ isOpen: false })),
}));
