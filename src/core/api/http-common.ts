import axios, { AxiosResponse } from 'axios';
import { authToken, valideRefreshToken, notValideToken } from '@/core/interceptors';

export const HTTP = axios.create({
  baseURL: 'https://home-project-academy.herokuapp.com/api/0',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'production',
});

export const HTTP_AUTH = axios.create({
  baseURL: 'https://home-oauth-server.herokuapp.com/api/0/oauth2/server',
  headers: {
    'Content-Type': 'application/json',
  },
});

HTTP.interceptors.request.use(authToken);
HTTP.interceptors.response.use((response: AxiosResponse) => response, notValideToken);

HTTP_AUTH.interceptors.response.use((res: AxiosResponse) => res, valideRefreshToken);
//add interceptor for check token
