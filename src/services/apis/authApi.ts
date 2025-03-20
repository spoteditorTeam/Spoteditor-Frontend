import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class AuthClient {
  private instance: AxiosInstance;
  private refreshPromise: Promise<any> | null = null;
  private refreshFailed: boolean = false; // refresh 실패 시 추가 요청 방지

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true, // httpOnly 쿠키 포함
    });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터: 필요한 경우 헤더 등에 추가 작업 가능
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터: 403 에러 발생 시 refresh 요청 시도
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        // 이미 refresh 실패한 상태면 바로 거절
        if (this.refreshFailed) {
          console.warn('🚨 RefreshToken이 만료되어 추가 요청 차단');
          return Promise.reject(error);
        }

        // 403 에러이고 아직 재시도하지 않은 경우에만 refresh 시도
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          // refresh 요청이 진행 중이면 해당 Promise 재사용
          if (!this.refreshPromise) {
            this.refreshPromise = this.instance
              .post('/auth/refresh')
              .then((res) => {
                console.log('새로운 AccessToken 발급 성공');
                return res.data;
              })
              .catch((err) => {
                console.error('RefreshToken 재발급 실패 → 로그아웃 필요');
                this.refreshFailed = true;
                throw err;
              })
              .finally(() => {
                this.refreshPromise = null;
              });
          }

          try {
            await this.refreshPromise;
            // refresh 후 원래 요청 재시도
            return this.instance(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  async logoutUser() {
    try {
      console.log('로그아웃 요청 시작');
      const res = await this.instance.post('/auth/logout');
      // 로그아웃 후 refresh 관련 상태 초기화
      this.refreshFailed = false;
      return res.data;
    } catch (error) {
      console.error('로그아웃 실패', error);
      return Promise.reject(error);
    }
  }
}

export const authClient = new AuthClient(`${API_BASE_URL}/api`);
export const currentAuth = authClient.getInstance();
export const logoutAuth = () => authClient.logoutUser();
