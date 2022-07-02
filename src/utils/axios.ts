import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import queryString from 'query-string';
import { HOST_API } from '~/config';
import setSession from './session';
import { userApi } from '~/api';

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => config,
);

type AxiosConfig = AxiosRequestConfig & {
  headers: AxiosRequestHeaders & {
    Authorization: string;
  };
};

axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
  const config = response.config as AxiosConfig;

  // handle access token expired
  if (response.data.code && response.data.code === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    // get new access token from refresh token
    try {
      const { accessToken } = await userApi.refreshToken({ refreshToken });

      // save new access token and config axios authorization headers
      setSession(accessToken, refreshToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(config);
    } catch (error) {}
  }

  return response.data;
});

export default axiosInstance;
