import axios from 'axios';
import LogAPI from './logApi';
import PlaceAPI from './placeApi';
import RegisterAPI from './registerApi';
import UserLog from './userLogAPI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class API {
  #axios;
  register;
  log;
  userLog;
  place;
  constructor() {
    this.#axios = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
    this.register = new RegisterAPI(this.#axios);
    this.log = new LogAPI(this.#axios);
    this.userLog = new UserLog(this.#axios);
    this.place = new PlaceAPI(this.#axios);
  }
}

const api = new API();
export default api;
