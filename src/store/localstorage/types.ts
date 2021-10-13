import { ActionContext, DispatchOptions } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum LocalStorageMutationEnum {
  SET_TOKEN = 'SET_TOKEN',
  GET_TOKEN = 'GET_TOKEN',
  REMOVE_TOKEN = 'REMOVE_TOKEN',
}

export enum LocalStorageActionEnum {
  SET = 'SET',
  GET = 'GET',
  REMOVE = 'REMOVE',
}

export interface TokenInterface {
  id: number;
  email: string;
  token: string;
}

export interface LocalStorageStateInterface {
  token: TokenInterface | null;
}

export type Mutations<S = LocalStorageStateInterface> = {
  [LocalStorageMutationEnum.SET_TOKEN](state: S, payload: LocalStorageStateInterface): void;
  [LocalStorageMutationEnum.GET_TOKEN](state: S, payload: string): void;
  [LocalStorageMutationEnum.REMOVE_TOKEN](state: S, payload: string): void;
};

export interface Actions {
  [LocalStorageActionEnum.SET]({ commit }: AugmentedActionContext, payload: LocalStorageStateInterface): void;
  [LocalStorageActionEnum.GET]({ commit }: AugmentedActionContext, payload: string): void;
  [LocalStorageActionEnum.REMOVE]({ commit }: AugmentedActionContext, payload: string): void;
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & Omit<ActionContext<LocalStorageStateInterface, RootStateInterface>, 'commit' | 'dispatch'>;
