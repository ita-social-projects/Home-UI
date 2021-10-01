import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum UserMutationTypes {}
// SET_REGISTRATION_TOKEN = 'SET_REGISTRATION_TOKEN',
// SET_FIRST_NAME = 'SET_FIRST_NAME',
// SET_MIDLE_NAME = 'SET_MIDLE_NAME',
// SET_LAST_NAME = 'SET_LAST_NAME',
// SET_EMAIL = 'SET_EMAIL',
// SET_PASSWORD = 'SET_PASSWORD',
// SET_CONTACTS = 'SET_CONTACTS',

export enum UserActionTypes {
  SET_USER_INFO = 'SET_USER_INFO',
  // SET_EMAIL = 'SET_EMAIL',
  // SET_FIRST_NAME = 'SET_FIRST_NAME',
  // SET_MIDLE_NAME = 'SET_MIDLE_NAME',
  // SET_LAST_NAME = 'SET_LAST_NAME',
}

export interface UserStateInterface {
  registration_token: string;
  first_name: string;
  midle_name: string;
  last_name: string;
  email: string;
  password: string;
  contacts: Contact[];
}

export interface Contact {
  type: string;
  main: boolean;
  id: number;
  email: string;
}

export type Mutations<S = UserStateInterface> = {
  // [UserMutationTypes.SET_EDRPOU](state: S, payload: string): void;
  // [UserMutationTypes.SET_EMAIL](state: S, payload: string): void;
  // [UserMutationTypes.SET_FIRST_NAME](state: S, payload: string): void;
  // [UserMutationTypes.SET_MIDLE_NAME](state: S, payload: string): void;
  // [UserMutationTypes.SET_LAST_NAME](state: S, payload: string): void;
  // [UserMutationTypes.SET_PASSWORD](state: S, payload: string): void;
  // [UserMutationTypes.SET_CONTACTS](state: S, payload: string): void;
};

export interface Actions {
  [UserActionTypes.SET_USER_INFO]({ commit }: AugmentedActionContext, payload: requestPayload): void;
}

export type Getters<S = UserStateInterface> = {
  //ssss
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserStateInterface, RootStateInterface>, 'commit'>;
