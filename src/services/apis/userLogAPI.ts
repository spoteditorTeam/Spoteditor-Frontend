import { AxiosInstance } from 'axios';
import { LogsQueryParams } from './types/logAPI.type';
import {
  IOtherUserParams,
  UserBookmarkLogs,
  UserBookmarkPlaces,
  UserLogs,
} from './types/userLogAPI.type';

class UserLog {
  private axios;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getUserLogs(params: LogsQueryParams): Promise<UserLogs> {
    const response = await this.axios.get('/users/placelogs', { params });
    return response.data;
  }

  async getUserBookmarkPlaces(params: LogsQueryParams): Promise<UserBookmarkPlaces> {
    const response = await this.axios.get('/user/bookmark/places', { params });
    return response.data;
  }

  async getUserBookmarkLogs(params: LogsQueryParams): Promise<UserBookmarkLogs> {
    const response = await this.axios.get('/user/bookmark/placelogs', { params });
    return response.data;
  }

  async getOtherUserLogs({ userId, params }: IOtherUserParams): Promise<UserLogs> {
    const response = await this.axios.get(`/users/${userId}/placelogs`, { params });
    return response.data;
  }

  async getOtherUserBookmarkPlaces({
    userId,
    params,
  }: IOtherUserParams): Promise<UserBookmarkPlaces> {
    const response = await this.axios.get(`/user/${userId}/bookmark/places`, { params });
    return response.data;
  }

  async getOtherUserBookmarkLogs({ userId, params }: IOtherUserParams): Promise<UserBookmarkLogs> {
    const response = await this.axios.get(`/user/${userId}/bookmark/placelogs`, { params });
    return response.data;
  }
}

export default UserLog;
