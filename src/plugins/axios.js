import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

axios.defaults.baseURL = `${BASE_URL}/api/`;

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('psg_auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  