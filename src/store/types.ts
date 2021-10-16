import { AxiosError, AxiosResponse } from 'axios';
import { UserStateInterface } from '@/store/user/types';
import { AuthorizationStateInterface } from '@/store/authorization/types';
import { CooperationStateInterface } from '@/store/cooperation/types';
import { LocalStorageStateInterface } from '@/store/localstorage/types';

export interface RootStateInterface {
  cooperationStore: CooperationStateInterface;
  userStore: UserStateInterface;
  authorizationStore: AuthorizationStateInterface;
  localStorageStore: LocalStorageStateInterface;
}

export type requestPayload<T> = {
  data: T;
  successCallback(response?: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
