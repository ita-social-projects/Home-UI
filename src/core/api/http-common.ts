import axios from 'axios';
import { authToken } from '@/core/interceptors';

export const HTTP = axios.create({
  baseURL: 'https://home-project-academy.herokuapp.com/api/0',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'production',
});

HTTP.interceptors.request.use(authToken);
