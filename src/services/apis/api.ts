import axios from 'axios';
import RegisterAPI from './registerApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class API {
  #axios;
  register;
  constructor() {
    this.#axios = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
    this.register = new RegisterAPI(this.#axios);
  }
}

const api = new API();
export default api;
