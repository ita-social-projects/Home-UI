import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ContactTypeEnum } from '../authorization/types';

export enum UserMutationEnum {
  SET_ERROR = 'SET_ERROR',
  RESET_ERROR = 'RESET_ERROR',
  SET_SUCCESS = 'SET_SUCCESS',
}

export enum UserActionEnum {
  SET_USER_INFO = 'SET_USER_INFO',
  RESET_ERROR_ACTION = 'RESET_ERROR_ACTION',
}

export enum UserGettersEnum {
  getErrorMessage = 'getErrorMessage',
  getSuccessMessage = 'getSuccessMessage',
  getUserInfo = 'getUserInfo',
}

export interface UserDataInterface {
  registrationToken: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  contacts: UserContactInterface[];
}

export interface UserStateInterface {
  data: UserDataInterface | null;
  error: string | null;
  success: string;
}

export interface UserContactInterface {
  type: ContactTypeEnum;
  main: boolean;
  email?: string;
  phone?: number;
  id?: number;
}

export type Mutations<S = UserStateInterface> = {
  [UserMutationEnum.SET_ERROR](state: S, errorMessage: string): void;
  [UserMutationEnum.RESET_ERROR](state: S, errorMessage: string): void;
  [UserMutationEnum.SET_SUCCESS](state: S, successMessage: string): void;
};

export interface Actions {
  [UserActionEnum.SET_USER_INFO](context: AugmentedActionContext, data: UserStateInterface['data']): void;
  [UserActionEnum.RESET_ERROR_ACTION](context: AugmentedActionContext): void;
}

export type Getters<S = UserStateInterface> = {
  [UserGettersEnum.getErrorMessage](state: S): string | null;
  [UserGettersEnum.getSuccessMessage](state: S): string;
  [UserGettersEnum.getUserInfo](state: S): UserDataInterface | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload?: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserStateInterface, RootStateInterface>, 'commit'>;
