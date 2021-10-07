import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';

export enum CooperationMutationTypes {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_USER_COOPERATIONS='SET_USER_COOPERATIONS',
  SET_SELECTED_COOPERATION ='SET_SELECTED_COOPERATION',
  // SET_COOPERATION_UPDATE_INFO = 'SET_COOPERATION_UPDATE_INFO',
}

export enum CooperationActionTypes {
  IS_COOPERATION_REGISTERED = 'IS_COOPERATION_REGISTERED',
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_USER_COOPERATIONS = 'SET_USER_COOPERATIONS',
  SET_SELECTED_COOPERATION ='SET_SELECTED_COOPERATION',
  // SET_COOPERATION_UPDATE_INFO = 'SET_COOPERATION_UPDATE_INFO',
}

export interface CooperationStateInterface {
  userCooperations: Array<Cooperation>;
  selectedCooperation: null | Cooperation;
  displayModal: boolean;
}

export type Cooperation = {
  id: number;
  name: string;  
  erdpou: string;
  iban: string;
  houses: string[];// create new Interface
  contacts: string[];// create new Interface
  address: string[];  // create new Interface
}

export type Mutations<S = CooperationStateInterface> = {
  [CooperationMutationTypes.SET_MODAL_DISPLAY](state: S, payload: boolean): void;
  [CooperationMutationTypes.SET_USER_COOPERATIONS](state: S, payload: CooperationStateInterface['userCooperations']): void;
  [CooperationMutationTypes.SET_SELECTED_COOPERATION](state: S, payload: CooperationStateInterface): void;
  // [CooperationMutationTypes.SET_COOPERATION_UPDATE_INFO](state: S, payload: CooperationStateInterface): void;
}

export interface Actions {
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]({ commit }: AugmentedActionContext, payload: requestPayload): void;
  [CooperationActionTypes.SET_MODAL_DISPLAY]({ commit }: AugmentedActionContext, payload: boolean): void;
  [CooperationActionTypes.SET_USER_COOPERATIONS]({ commit }: AugmentedActionContext): void;
  [CooperationActionTypes.SET_SELECTED_COOPERATION]({ commit }: AugmentedActionContext): void;
  // [CooperationActionTypes.SET_COOPERATION_UPDATE_INFO]({ commit }: AugmentedActionContext, payload: CooperationStateInterface): void;
};

export type Getters<S = CooperationStateInterface> = {
  getCooperationNameAndEdrpou(state: S): string;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationStateInterface, RootStateInterface>, 'commit'>;
