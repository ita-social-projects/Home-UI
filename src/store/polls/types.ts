import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum PollsMutationEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
}

export enum PollsActionEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  CREATE_POLL = 'CREATE_POLL',
}

export interface PollsStateInterface {
  cooperationPolls: Array<PollInterface>;
  selectedPoll: null | PollInterface;
  displayModal: boolean;
}

export type Mutations<S = PollsStateInterface> = {
  [PollsMutationEnum.SET_COOPERATION_POLLS](state: S, payload: Array<PollInterface>): void;
  [PollsMutationEnum.SET_SELECTED_POLL](state: S, payload: number): void;
  [PollsMutationEnum.SET_MODAL_DISPLAY](state: S, payload: boolean): void;
};

export interface Actions {
  [PollsActionEnum.SET_COOPERATION_POLLS]({ commit }: AugmentedActionContext): void;
  [PollsActionEnum.SET_SELECTED_POLL]({ commit }: AugmentedActionContext, payload: number): void;
  [PollsActionEnum.SET_MODAL_DISPLAY]({ commit }: AugmentedActionContext, payload: boolean): void;
  [PollsActionEnum.CREATE_POLL]({ commit }: AugmentedActionContext, payload: string): void;
}

export type Getters<S = PollsStateInterface> = {
  getPolls(state: S): string;
};

export interface PollInterface {
  id: number;
  header: string;
  creationDate: string;
  completionDate: string;
  status: PollStatusType;
  type: string;
  polledHouses: Array<PolledHouseInterface>;
}

export interface PolledHouseInterface {
  flatQuantity: number;
  houseArea: number;
  adjoiningArea: number;
  address: PolledHouseAddressInterface;
}

export interface PolledHouseAddressInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  houseBlock: string;
  houseNumber: string;
  zipCode: string;
}

export interface GetPolledHouseAddressInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  house_block: string;
  house_number: string;
  zip_code: string;
}

export type PollStatusType = 'draft' | 'active' | 'completed' | 'suspended';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PollsStateInterface, RootStateInterface>, 'commit'>;
