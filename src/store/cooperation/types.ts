import { ActionContext } from 'vuex';
import { requestPayload, RootStateInterface } from '@/store/types';
import { CooperationModel } from '@/store/cooperation/models/cooperation.model';
import { HouseModel } from '../../shared/models/house.model';

export enum CooperationMutationEnum {
  SET_USER_COOPERATIONS = 'SET_USER_COOPERATIONS',
  SET_SELECTED_COOPERATION = 'SET_SELECTED_COOPERATION',
  SET_COOPERATION_UPDATE = 'SET_COOPERATION_UPDATE',
  SET_IS_COOPERATIONS_LOADED = 'SET_IS_COOPERATIONS_LOADED',
}

export enum CooperationActionEnum {
  SET_USER_COOPERATIONS = 'SET_USER_COOPERATIONS',
  SET_SELECTED_COOPERATION = 'SET_SELECTED_COOPERATION',
  CREATE_COOPERATION = 'CREATE_COOPERATION',
  SET_COOPERATION_UPDATE = 'SET_COOPERATION_UPDATE',
}

export interface CooperationStateInterface {
  userCooperations: Array<CooperationModel>;
  selectedCooperation: null | CooperationModel;
}

export type Mutations<S = CooperationStateInterface> = {
  [CooperationMutationEnum.SET_USER_COOPERATIONS](state: S, payload: Array<CooperationModel>): void;
  [CooperationMutationEnum.SET_SELECTED_COOPERATION](state: S, payload: number): void;
  [CooperationMutationEnum.SET_COOPERATION_UPDATE](state: S, payload: CooperationModel): void;
};

export interface Actions {
  [CooperationActionEnum.CREATE_COOPERATION](
    { commit }: AugmentedActionContext,
    payload: requestPayload<CooperationRegistrationInterface>
  ): void;
  [CooperationActionEnum.SET_USER_COOPERATIONS]({ commit }: AugmentedActionContext): void;
  [CooperationActionEnum.SET_SELECTED_COOPERATION]({ commit }: AugmentedActionContext, payload: number): void;
  [CooperationActionEnum.SET_COOPERATION_UPDATE]({ commit }: AugmentedActionContext, payload: CooperationModel): void;
}

export type Getters<S = CooperationStateInterface> = {
  getCooperationNameAndEdrpou(state: S): string;
  getSelectedCooperationId(state: S): number;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<CooperationStateInterface, RootStateInterface>, 'commit'>;

export interface CooperationRegistrationInterface {
  edrpou: string;
  email: string;
}

export interface CooperationInterface {
  id: number;
  name: string;
  edrpou: string;
  iban: string;
  houses: HouseModel[];
  contacts: CooperationContactsInterface[];
  address: CooperationAddressInterface;
}

export interface CooperationAddressInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  houseBlock: string;
  houseNumber: string;
  zipCode: string;
}

export interface CooperationContactsInterface {
  type: string;
  main: boolean;
  phone: string;
  email: string;
}
