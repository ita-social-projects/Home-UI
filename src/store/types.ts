import { AxiosError, AxiosResponse } from 'axios';
import { UserStateInterface } from '@/user/store/user/types';
import { AuthorizationStateInterface } from '@/user/store/authorization/types';
import { CooperationStateInterface } from '@/cooperation/store/types';
import { LocalStorageStateInterface } from '@/user/store/localstorage/types';
import { HousesStateInterface } from '@/houses/store/types';
import { PollsStateInterface } from '@/poll/store/types';
import { ApartmentsStateInterface } from '@/apartment/store/apartments/types';
import { OwnershipsStateInterface } from '@/apartment/store/ownerships/types';
import { InvitationsStateInterface } from '@/invitation/store/types';
import { TariffStateInterface } from '@/finance/store/types';
import { ErrorsStateInterface } from '@/core/errors/store/types';
import { MessagesStateInterface } from '@/core/messages/store/types';

export interface RootStateInterface {
  authorizationStore: AuthorizationStateInterface;
  cooperationStore: CooperationStateInterface;
  userStore: UserStateInterface;
  pollsStore: PollsStateInterface;
  localStorageStore: LocalStorageStateInterface;
  housesStore: HousesStateInterface;
  invitationsStore: InvitationsStateInterface;
  apartmentsStore: ApartmentsStateInterface;
  ownershipsStore: OwnershipsStateInterface;
  tariffStore: TariffStateInterface;
  errorsStore: ErrorsStateInterface;
  messagesStore: MessagesStateInterface;
}

export enum StoreModuleEnum {
  authorizationStore = 'authorizationStore',
  cooperationStore = 'cooperationStore',
  userStore = 'userStore',
  pollsStore = 'pollsStore',
  localStorageStore = 'localStorageStore',
  housesStore = 'housesStore',
  invitationsStore = 'invitationsStore',
  apartmentsStore = 'apartmentsStore',
  ownershipsStore = 'ownershipsStore',
  tariffStore = 'tariffStore',
  errorsStore = 'errorsStore',
  messagesStore = 'messagesStore',
}

export type requestPayload<T> = {
  data: T;
  successCallback(response?: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
