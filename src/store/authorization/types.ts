import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum AuthMutationTypes {
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN',
}

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  GET_DATA = 'GET_DATA',
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  contacts: Contact[];
}

export interface Contact {
  type: string;
  main: boolean;
  id: number;
  email: string;
}

export interface UserStateInterface {
  user: User | null;
}

export type Mutations<S = UserStateInterface> = {
  [AuthMutationTypes.SET_USER](state: S, payload: string): void;
  [AuthMutationTypes.SET_TOKEN](state: S, payload: string): void;
};

export interface Actions {
  [AuthActionTypes.SIGN_IN]({ commit }: AugmentedActionContext, payload: requestPayload): void;
  [AuthActionTypes.GET_DATA]({ commit }: AugmentedActionContext, payload: requestPayload): void;
}

export type Getters<S = UserStateInterface> = {
  getEmailAndPassword(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserStateInterface, RootStateInterface>, 'commit'>;
