import { AxiosError, AxiosResponse } from 'axios';
import { UserStateInterface } from '@/store/user/types';
import { AuthorizationStateInterface } from '@/store/authorization/types';
import { CooperationStateInterface } from '@/cooperation/store/types';
import { LocalStorageStateInterface } from '@/store/localstorage/types';
import { HousesStateInterface } from '@/houses/store/types';
import { PollsStateInterface } from '@/store/polls/types';
import { ApartmentsStateInterface } from '@/apartment/store/apartments/types';
import { OwnershipsStateInterface } from '@/apartment/store/ownerships/types';
import { InvitationsStateInterface } from '@/store/invitations/types';
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
  errorsStore = 'errorsStore',
  messagesStore = 'messagesStore',
}

export type requestPayload<T> = {
  data: T;
  successCallback(response?: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};
