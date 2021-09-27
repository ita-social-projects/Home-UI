import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum UserMutationTypes {
  SET_USER = 'SET_USER',
}

export enum UserActionTypes {
  IS_USER_REGISTERED = 'IS_USER_REGISTERED',
  SET_USER = 'SET_USER',
}

export interface UserInterface {
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

export type Mutations<S = UserInterface> = {
  [UserMutationTypes.SET_USER](state: S, payload: string): void;
};

export interface Actions {
  [UserActionTypes.IS_USER_REGISTERED]({ commit }: AugmentedActionContext, payload: requestPayload): void;
  [UserActionTypes.SET_USER]({ commit }: AugmentedActionContext, payload: string): void;
}

export type Getters<S = UserInterface> = {
  getCooperationNameAndEdrpou(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserInterface, RootStateInterface>, 'commit'>;
