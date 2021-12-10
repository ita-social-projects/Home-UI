import { AxiosError, AxiosResponse } from 'axios';
import { UserStateInterface } from '@/store/user/types';
import { AuthorizationStateInterface } from '@/store/authorization/types';
import { CooperationStateInterface } from '@/store/cooperation/types';
import { LocalStorageStateInterface } from '@/store/localstorage/types';
import { HousesStateInterface } from '@/store/houses/types';
import { PollsStateInterface } from '@/store/polls/types';
import { ApartmentsStateInterface } from '@/store/apartments/types';
import { OwnershipsStateInterface } from '@/store/ownerships/types';

export interface RootStateInterface {
  authorizationStore: AuthorizationStateInterface;
  cooperationStore: CooperationStateInterface;
  userStore: UserStateInterface;
  pollsStore: PollsStateInterface;
  localStorageStore: LocalStorageStateInterface;
  housesStore: HousesStateInterface;
  apartments: ApartmentsStateInterface;
  ownerships: OwnershipsStateInterface;
}

export enum StoreModuleEnum {
  authorizationStore = 'authorizationStore',
  cooperationStore = 'cooperationStore',
  userStore = 'userStore',
  pollsStore = 'pollsStore',
  localStorageStore = 'localStorageStore',
  housesStore = 'housesStore',
  apartmentsStore = 'apartmentsStore',
  ownershipsStore = 'ownershipsStore',
}

export type requestPayload<T> = {
  data: T;
  successCallback(response?: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
