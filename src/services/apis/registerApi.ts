import { AxiosInstance } from 'axios';
import { Log, LogResponse, PresignUrlRequest, PresignUrlResponse } from './types/registerAPI.type';

class RegisterAPI {
  #axios;
  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getPresignUrl(file: PresignUrlRequest): Promise<PresignUrlResponse> {
    const path = '/api/purl';
    const res = await this.#axios.post(path, file);
    return res.data;
  }

  async uploadImageWithPresignUrl(presignUrl: string, file: FormData) {
    const res = await this.#axios.put(presignUrl, {
      body: file,
    });
    return res.status;
  }

  async createLog(logData: Log): Promise<LogResponse> {
    const path = '/api/placelogs';
    const res = await this.#axios.post(path, logData);
    console.log(logData);
    return res.data;
  }
}

export default RegisterAPI;
