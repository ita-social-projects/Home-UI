import axios, { AxiosResponse } from 'axios';
import { authToken, notValidRefreshToken, notValidToken } from '@/core/interceptors';

export const HTTP = axios.create({
  baseURL: 'http://localhost:8080/api/0',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'production',
});

export const HTTP_AUTH = axios.create({
  baseURL: 'http://localhost:9000/api/0/oauth2/server',
  headers: {
    'Content-Type': 'application/json',
  },
});

HTTP.interceptors.request.use(authToken);
HTTP.interceptors.response.use((response: AxiosResponse) => response, notValidToken);
HTTP_AUTH.interceptors.response.use((res: AxiosResponse) => res, notValidRefreshToken);
