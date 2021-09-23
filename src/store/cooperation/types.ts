import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AxiosError, AxiosResponse } from 'axios';

export enum CooperationMutationTypes {
  IS_COOPERATION_REGISTERED = 'IS_COOPERATION_REGISTERED',
  SET_EDRPOU = 'SET_EDRPOU',
}

export enum CooperationActionTypes {
  IS_COOPERATION_REGISTERED = 'IS_COOPERATION_REGISTERED',
  SET_EDRPOU = 'SET_EDRPOU',
}

export interface CooperationInterface {
  erdpou: string;
  name: string;
}

export type Mutations<S = CooperationInterface> = {
  [CooperationMutationTypes.IS_COOPERATION_REGISTERED](state: S, payload: requestPayload): void;
  [CooperationMutationTypes.SET_EDRPOU](state: S, payload: string): void;
};

export interface Actions {
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]({ commit }: AugmentedActionContext, payload: requestPayload): void;
  [CooperationActionTypes.SET_EDRPOU]({ commit }: AugmentedActionContext, payload: string): void;
}

export type Getters<S = CooperationInterface> = {
  getCooperationNameAndEdrpou(state: S): string;
};

type requestPayload = {
  params: { [key: string]: string | number | boolean };
  successCallback(response: AxiosResponse): void;
  errorCallback(error?: AxiosError): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationInterface, RootStateInterface>, 'commit'>;
