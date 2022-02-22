import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum LocalStorageMutationEnum {
  SET_TOKEN = 'SET_TOKEN',
  GET_TOKEN = 'GET_TOKEN',
  REMOVE_TOKEN = 'REMOVE_TOKEN',
  GET_USER_FROM_STORAGE = 'GET_USER_FROM_STORAGE',
}

export enum LocalStorageActionEnum {
  SET = 'SET',
  GET = 'GET',
  REMOVE = 'REMOVE',
  GET_USER_FROM_STORAGE = 'GET_USER_FROM_STORAGE',
}

export enum LocalStorageGettersEnum {
  isTokenExist = 'isTokenExist',
  getToken = 'getToken',
  getUserFromStorage = 'getUserFromStorage',
}

export interface TokenInterface {
  id: number;
  email: string;
  token: string;
}

export interface LocalStorageStateInterface {
  token: TokenInterface | null;
  user: TokenInterface;
}

export type Mutations<S = LocalStorageStateInterface> = {
  [LocalStorageMutationEnum.SET_TOKEN](state: S, payload: LocalStorageStateInterface): void;
  [LocalStorageMutationEnum.GET_TOKEN](state: S, payload: string): void;
  [LocalStorageMutationEnum.REMOVE_TOKEN](state: S, payload: string): void;
  [LocalStorageMutationEnum.GET_USER_FROM_STORAGE](state: S): void;
};

export type Getters<S = LocalStorageStateInterface> = {
  [LocalStorageGettersEnum.isTokenExist](): boolean;
  [LocalStorageGettersEnum.getToken](state: S): TokenInterface | null;
  [LocalStorageGettersEnum.getUserFromStorage](state: S): TokenInterface | null;
};

export interface Actions {
  [LocalStorageActionEnum.SET]({ commit }: AugmentedActionContext, payload: LocalStorageStateInterface): void;
  [LocalStorageActionEnum.GET]({ commit }: AugmentedActionContext, payload: string): void;
  [LocalStorageActionEnum.REMOVE]({ commit }: AugmentedActionContext, payload: string): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<LocalStorageStateInterface, RootStateInterface>, 'commit'>;
