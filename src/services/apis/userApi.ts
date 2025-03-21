import { IOhterUser, IUpdateUser, IUser } from '@/services/apis/types/userAPI';
import { AxiosInstance } from 'axios';

export class UserAPI {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  /* 로그인된 사용자 정보 가져오기 */
  async getUser(): Promise<IUser> {
    const response = await this.axios.get('/api/users');
    return response.data;
  }

  async deleteUser() {
    const response = await this.axios.delete('/api/users');
    return response.data;
  }

  async patchUser(userData: IUpdateUser): Promise<IUpdateUser> {
    const response = await this.axios.patch('/api/users', userData);
    return response.data;
  }
}

export class OtherUserAPI {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getOtherUser(userId: number): Promise<IOhterUser> {
    const response = await this.axios.get(`/api/users/${userId}`);
    return response.data;
  }
}
