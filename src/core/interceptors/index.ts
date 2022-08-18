import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { HTTP, HTTP_AUTH } from '../api/http-common';
import { AuthActionEnum } from '@/user/store/authorization/types';
import { RoutesEnum } from '@/router/types';
import { StoreModuleEnum } from '@/store/types';
import { LocalStorageActionEnum } from '@/user/store/localstorage/types';
import store from '@/store';
import router from '@/router';

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

export const notValidToken = (error: AxiosError) => {
  if (error.response?.status === 401) {
    const userData: string | null = localStorage.getItem('user');
    if (userData != null) {
      const user = JSON.parse(userData);
      HTTP_AUTH.post('/refresh', {
        refresh_token: user.refreshToken,
      }).then((response) => {
        user.token = response.data.access_token;
        store.dispatch(`${StoreModuleEnum.localStorageStore}/${LocalStorageActionEnum.SET}`, user);
      });
    }
  }
  return Promise.reject(error);
};
export const notValidRefreshToken = (error: AxiosError) => {
  if (error.response?.status === 406) {
    const payload = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      id: 0,
      contacts: [],
    };
    store.dispatch(`${StoreModuleEnum.authorizationStore}/${AuthActionEnum.SIGN_OUT}`, payload);
    router.push(RoutesEnum.StartPage);
  }
  return Promise.reject(error);
};

export const setSpinnerInterceptors = (spinnerState: any): void => {
  const handleError = (error: AxiosError): any => {
    spinnerState.value = false;
    return Promise.reject(error);
  };

  HTTP.interceptors.request.use(
    (req: AxiosRequestConfig) => {
      spinnerState.value = true;
      return req;
    },
    (error: AxiosError) => {
      handleError(error);
    }
  );
  HTTP.interceptors.response.use(
    (response: AxiosResponse) => {
      spinnerState.value = false;
      return response;
    },
    (error: AxiosError) => {
      handleError(error);
    }
  );
  HTTP_AUTH.interceptors.request.use(
    (req: AxiosRequestConfig) => {
      spinnerState.value = true;
      return req;
    },
    (error: AxiosError) => {
      handleError(error);
    }
  );
  HTTP_AUTH.interceptors.response.use(
    (response: AxiosResponse) => {
      spinnerState.value = false;
      return response;
    },
    (error: AxiosError) => {
      handleError(error);
    }
  );
};
