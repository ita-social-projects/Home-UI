import { HTTP } from '@/core/api/http-common';

HTTP.interceptors.request.use((req) => {
  const userData: any = localStorage.getItem('user');
  console.log(req);
  if (req.url !== '/users') {
    if (userData !== null) {
      const user = JSON.parse(userData);
      req.headers.Authorization = `Basic ${user.token}`;
      console.log(req);
    } else {
      delete req.headers.Authorization;
    }
  }
  return req;
});
