import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const tokenInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/* 모든 API 요청이 실행되기 전에 AccessToken을 검증 */
tokenInstance.interceptors.request.use(
  (config) => {
    //API 요청 전, 자동으로 AccessToken 포함
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Access Token 갱신 */
tokenInstance.interceptors.response.use(
  (response) => response, // 응답이 정상적인 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // AccessToken이 만료되었고, 이전 요청이 아니면 재요청
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        console.log('AccessToken 만료 → RefreshToken으로 재발급 요청');
        await tokenInstance.post('/auth/refresh'); // 새로운 AccessToken 발급 요청
        console.log('새로운 AccessToken 발급 완료, 요청 재시도');
        return tokenInstance(originalRequest); // 기존 요청을 다시 실행
      } catch (err) {
        console.error('RefreshToken도 만료 → 로그아웃 필요');
        window.location.href = '/'; // 로그인 페이지로 이동
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
