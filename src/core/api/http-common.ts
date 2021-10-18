import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'https://home-project-academy.herokuapp.com/api/0',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'production',
});

HTTP.interceptors.request.use((req) => {
  const userData: any = localStorage.getItem('user');
  if (userData !== null) {
    const user = JSON.parse(userData);
    req.headers.Authorization = `Basic ${user.token}`;
  } else {
    delete req.headers.Authorization;
  }
  return req;
});
