import { AxiosRequestConfig, AxiosError } from 'axios';
import { HTTP_AUTH } from '../api/http-common';

export const authToken = (req: AxiosRequestConfig): AxiosRequestConfig => {
  const userData: string | null = localStorage.getItem('user');
  if (userData !== null) {
    const user = JSON.parse(userData);
    req.headers.Authorization = `Bearer ${user.token}`;
  } else {
    delete req.headers.Authorization;
  }
  return req;
};

export const notValideToken = (error: AxiosError) => {
  if (error.response?.status === 401) {
    const userData: string | null = localStorage.getItem('user');
    if (userData != null) {
      const user = JSON.parse(userData);
      HTTP_AUTH.post('/refresh', {
        refresh_token: user.refreshToken,
      }).then((response) => {
        user.token = response.data.access_token;
        localStorage.setItem('user', JSON.stringify(user));
      });
    }
  }
  return Promise.reject(error);
};
export const valideRefreshToken = (error: AxiosError) => {
  if (error.response?.status === 406) {
    localStorage.removeItem('user');
    location.href = '/login';
  }
  return Promise.reject(error);
};
