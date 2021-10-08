import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum AuthMutationEnum {
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN',
}

export enum AuthActionEnum {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  GET_DATA = 'GET_DATA',
}

export interface UserInterface {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  contacts: ContactInterface[];
}

export interface ContactInterface {
  type: string;
  main: boolean;
  id: number;
  email: string;
}

export interface AuthorizationStateInterface {
  user: UserInterface | null;
}

export type Mutations<S = AuthorizationStateInterface> = {
  [AuthMutationEnum.SET_USER](state: S, payload: UserInterface | null): void;
  [AuthMutationEnum.SET_TOKEN](state: S, payload: UserLoginInterface): void;
};

export interface Actions {
  [AuthActionEnum.SIGN_IN]({ commit }: AugmentedActionContext, payload: requestPayload<UserLoginInterface>): void;
  [AuthActionEnum.SIGN_OUT]({ commit }: AugmentedActionContext, payload: null): void;
  [AuthActionEnum.GET_DATA]({ commit }: AugmentedActionContext, payload: string): void;
}

export type Getters<S = AuthorizationStateInterface> = {
  loggedIn(state: S): boolean;
  userData(state: S): UserInterface | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthorizationStateInterface, RootStateInterface>, 'commit'>;

export interface UserLoginInterface {
  id: number;
  email: string;
  password: string;
}
