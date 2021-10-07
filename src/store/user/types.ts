import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum UserMutationTypes {
  SET_ERROR = 'SET_ERROR',
  SET_SUCCESS = 'SET_SUCCESS',
}

export enum UserActionTypes {
  SET_USER_INFO = 'SET_USER_INFO',
}

export type Error = {
  message: string;
};

export interface UserData {
  registrationToken: string;
  firstName: string;
  // middleName: string;
  lastName: string;
  email: string;
  password: string;
  contacts: Contact[];
}

export interface UserStateInterface {
  data: UserData | null;
  error: string;
  success: string;
}

export interface Contact {
  type: string;
  main: boolean;
  id: number;
  email: string;
}

export type Mutations<S = UserStateInterface> = {
  [UserMutationTypes.SET_ERROR](state: S, errorMessage: string): void;
  [UserMutationTypes.SET_SUCCESS](state: S, successMessage: string): void;
};

export interface Actions {
  [UserActionTypes.SET_USER_INFO](context: AugmentedActionContext, data: UserStateInterface['data']): void;
}

export type Getters<S = UserStateInterface> = {
  getErrorMessage(state: S): string;
  getSuccessMessage(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserStateInterface, RootStateInterface>, 'commit'>;
