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
  registration_token: string;
  first_name: string;
  // midle_name: string;
  last_name: string;
  email: string;
  password: string;
  contacts: Contact[];
}

export interface UserStateInterface {
  Data: UserData | null;
  Error: string;
  Success: string;
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
  [UserActionTypes.SET_USER_INFO](context: AugmentedActionContext, data: UserStateInterface['Data']): void;
}

export type Getters<S = UserStateInterface> = {
  getErrorMessage(state: S): string;
  getSuccessMessage(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserStateInterface, RootStateInterface>, 'commit'>;
