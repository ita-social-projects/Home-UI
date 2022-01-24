import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';
import { UserModel } from './models/user.model';
import { UserContactInterface } from './../user/types';

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

export enum AuthGettersEnum {
  userData = 'userData',
  loggedIn = 'loggedIn',
}

export enum ContactTypeEnum {
  email = 'email',
  phone = 'phone',
}

export type ContactTypeEnumString = keyof typeof ContactTypeEnum;

export interface UserInterface {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  id: number;
  contacts?: UserContactInterface[];
  error?: string | null;
  success?: string;
}

export interface UpdateUserInterface {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  contacts: UserContactInterface[];
}


export interface UpdateUserFullNameInterface {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface UserCredentialInterface {
  email: string;
  token: string;
  id: number;
}

export interface UserLoginInterface {
  id: number;
  email: string;
  password: string;
}
export interface AuthorizationStateInterface {
  user: UserModel;
}

export type Mutations<S = AuthorizationStateInterface> = {
  [AuthMutationEnum.SET_USER](state: S, payload: UserModel): void;
  [AuthMutationEnum.SET_FORM](state: S, payload: UpdateUserFullNameInterface): void;
  [AuthMutationEnum.ADD_CONTACT](state: S, payload: UserContactInterface): void;
  [AuthMutationEnum.UPDATE_CONTACT](state: S, payload: number): void;
};

export interface Actions {
  [AuthActionEnum.SIGN_IN]({ commit }: AugmentedActionContext, payload: requestPayload<UserLoginInterface>): void;
  [AuthActionEnum.UPDATE_USER]({ commit }: AugmentedActionContext, payload: UpdateUserInterface): void;
  [AuthActionEnum.SIGN_OUT]({ commit }: AugmentedActionContext, payload: UserModel): void;
  [AuthActionEnum.GET_DATA]({ commit }: AugmentedActionContext, payload: string): void;
  [AuthActionEnum.DELETE_CONTACT]({ state, commit }: AugmentedActionContext, payload: number): void;
  [AuthActionEnum.ADD_CONTACT]({ state, commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = AuthorizationStateInterface> = {
  [AuthGettersEnum.loggedIn](state: S): boolean;
  [AuthGettersEnum.userData](state: S): UserModel;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AuthorizationStateInterface, RootStateInterface>, 'commit'>;
