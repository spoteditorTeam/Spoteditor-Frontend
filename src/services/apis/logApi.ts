import { AxiosInstance } from 'axios';
import { LogsQueryParams } from './types/logAPI.type';

class LogAPI {
  #axios;
  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getLogs(params: LogsQueryParams) {
    const path = '/api/placelogs';
    const res = await this.#axios.get(path, {
      params,
    });
    return res.data;
  }

  async getLog(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}`;
    const res = await this.#axios.get(path);
    return res.data;
  }

  async deleteLog(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}`;
    const res = await this.#axios.delete(path);
    console.log('로그 삭제', res);
  }

  // 로그 북마크
  async addLogBookMark(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}/bookmark`;
    const res = await this.#axios.post(path);
    console.log('로그 북마크 추가', res);
  }

  async deleteLogBookMark(placeLogId: number) {
    const path = `/api/placelogs/${placeLogId}/bookmark`;
    const res = await this.#axios.delete(path);
    console.log('로그 북마크 삭제', res);
  }

  // 장소 북마크
  async addPlaceBookMark(placeId: number) {
    const path = `/api/placelogs/bookmark`;
    const res = await this.#axios.post(path, { placeId });
    console.log('장소 북마크 추가', res);
  }

  async deletePlaceBookMark(placeId: number) {
    const path = `/api/placelogs/bookmark`;
    const res = await this.#axios.delete(path, { data: { placeId } });
    console.log('장소 북마크 삭제', res);
  }
}

export default LogAPI;
