import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum CooperationMutationTypes {
  SET_EDRPOU = 'SET_EDRPOU',
}

export enum CooperationActionTypes {
  // IS_COOPERATION_REGISTERED = 'IS_COOPERATION_REGISTERED',
  CREATE_COOPERATION = 'CREATE_COOPERATION',
  SET_EDRPOU = 'SET_EDRPOU',
}

export interface CooperationStateInterface {
  erdpou: string;
  name: string;
}

export type Mutations<S = CooperationStateInterface> = {
  [CooperationMutationTypes.SET_EDRPOU](state: S, payload: string): void;
};

export interface Actions {
  // [CooperationActionTypes.IS_COOPERATION_REGISTERED]
  // ({ commit }: AugmentedActionContext, payload: requestPayload): void;
  [CooperationActionTypes.CREATE_COOPERATION]({ commit }: AugmentedActionContext, payload: requestPayload): void;
  [CooperationActionTypes.SET_EDRPOU]({ commit }: AugmentedActionContext, payload: string): void;
}

export type Getters<S = CooperationStateInterface> = {
  getCooperationNameAndEdrpou(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationStateInterface, RootStateInterface>, 'commit'>;
