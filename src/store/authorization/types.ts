import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';
import { UserModel } from './models/user.model';

export enum AuthMutationEnum {
  SET_USER = 'SET_USER',
  SET_FORM = 'SET_FORM',
  UPDATE_CONTACT = 'UPDATE_CONTACT',
  ADD_CONTACT = 'ADD_CONTACT',
}

export enum AuthActionEnum {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  GET_DATA = 'GET_DATA',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_CONTACT = 'DELETE_CONTACT',
  ADD_CONTACT = 'ADD_CONTACT',
}

export enum ContactTypeEnum {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export interface UserInterface {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  id: number;
  contacts: ContactInterface[];
  error: string | null;
  success: string;
}

export interface UpdateUserInterface {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  contacts: ContactInterface[];
}

export interface ContactInterface {
  type: ContactTypeEnum;
  main: boolean;
  email?: string;
  phone?: number;
  id?: number;
}

export interface AuthorizationStateInterface {
  user: UserModel | null;
}

export type Mutations<S = AuthorizationStateInterface> = {
  [AuthMutationEnum.SET_USER](state: S, payload: UserModel | null): void;
  [AuthMutationEnum.SET_FORM](state: S, payload: any): void;
  [AuthMutationEnum.ADD_CONTACT](state: S, payload: ContactInterface): void;
  [AuthMutationEnum.UPDATE_CONTACT](state: S, payload: UserModel | null): void;
};

export interface Actions {
  [AuthActionEnum.SIGN_IN]({ commit }: AugmentedActionContext, payload: requestPayload<UserLoginInterface>): void;
  [AuthActionEnum.UPDATE_USER]({ commit }: AugmentedActionContext, payload: UpdateUserInterface): void;
  [AuthActionEnum.SIGN_OUT]({ commit }: AugmentedActionContext, payload: null): void;
  [AuthActionEnum.GET_DATA]({ commit }: AugmentedActionContext, payload: string): void;
}

export type Getters<S = AuthorizationStateInterface> = {
  loggedIn(state: S): boolean;
  userData(state: S): UserModel | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthorizationStateInterface, RootStateInterface>, 'commit'>;

export interface UserLoginInterface {
  id: number;
  email: string;
  password: string;
}
