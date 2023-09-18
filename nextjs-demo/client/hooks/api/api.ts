import axios from 'axios';

const api = axios.create({});
api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error?.response?.status === 401) {
      window.location.href = '/login';
    }
    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response?.data?.message));
    }
    return Promise.reject(error);
  },
);

export { api };
