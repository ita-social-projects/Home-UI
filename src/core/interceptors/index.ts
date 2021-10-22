import { AxiosRequestConfig } from 'axios';

export const authToken = (req: AxiosRequestConfig): AxiosRequestConfig => {
  const userData: string | null = localStorage.getItem('user');
  if (userData !== null) {
    const user = JSON.parse(userData);
    req.headers.Authorization = `Basic ${user.token}`;
  } else {
    delete req.headers.Authorization;
  }
  return req;
};
