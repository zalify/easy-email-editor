import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UserStorage } from '@demo/utils/user-storage';

export const axiosInstance = axios.create({
  baseURL: 'https://www.maocanhua.cn',
});

axiosInstance.interceptors.request.use(async function (config) {
  try {
    const token = await UserStorage.getToken();
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.authorization = token;
  } catch (error) {
    // window.location.assign(LOGIN_ADDRESS);
  } finally {
    return config;
  }
});

axiosInstance.interceptors.response.use(
  function <T>(res: AxiosResponse<T>) {
    return new Promise((resolve, reject) => {
      return resolve(res);
    });
  },
  (error) => {
    throw {
      ...error,
      message: error?.response?.data?.message || error?.message || error,
    };
  }
);

export const request = {
  async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.get<T>(url, config).then((data) => data.data);
  },
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    return axiosInstance.post<T>(url, data, config).then((data) => data.data);
  },
};
