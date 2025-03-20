import { checkAuthStatus } from '@/services/apis/authApi';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean | null; //로그인 상태 (초기값: 모름)
  checkAuth: () => Promise<void>; //로그인 여부 확인 함수
  logout: () => void; //로그아웃 시 상태 초기화
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null, // 초기 상태 (로그인 여부 모름)

  async checkAuth() {
    if (this.isAuthenticated !== null) return; //이미 실행된 경우 중복 요청 방지

    /* 세션 스토리지에서 로그인 상태 확인 (서버 요청 없이 판별) */
    const cachedAuth = sessionStorage.getItem('isAuthenticated');
    if (cachedAuth === 'true') {
      set({ isAuthenticated: true });
      return;
    }

    /* 세션에 정보 없을 경우, 서버에 요청해서 로그인 여부 확인 */
    const isLoggedIn = await checkAuthStatus();
    if (isLoggedIn) {
      sessionStorage.setItem('isAuthenticated', 'true'); //로그인 상태 저장
    } else {
      sessionStorage.removeItem('isAuthenticated'); //비로그인 상태라면 제거
    }

    set({ isAuthenticated: isLoggedIn });
  },

  logout() {
    sessionStorage.removeItem('isAuthenticated'); //로그아웃 시 세션 정보 삭제
    set({ isAuthenticated: false });
  },
}));

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
