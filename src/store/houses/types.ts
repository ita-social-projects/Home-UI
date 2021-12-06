import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HouseModel } from '@/shared/models/house.model';

export enum HousesMutationsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  ADD_HOUSE = 'ADD_HOUSE',
  SET_ADD_HOUSE_MODAL = 'SET_ADD_HOUSE_MODAL',
}

export enum HousesActionsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  ADD_HOUSE = 'ADD_HOUSE',
  SET_ADD_HOUSE_MODAL = 'SET_ADD_HOUSE_MODAL',
}

export interface AddressInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  houseBlock: string;
  houseNumber: string;
  zipCode: string;
}

export interface HouseInterface {
  flatQuantity: number;
  houseArea: number;
  adjoiningArea: number;
  id: number;
  address: AddressInterface;
}

export interface HousesStateInterface {
  houses: Array<HouseModel> | null;
  displayModal: boolean;
  displayAddHouseModal: boolean;
}

export type Mutations<S = HousesStateInterface> = {
  [HousesMutationsEnum.SET_HOUSES](state: S, payload: Array<HouseModel>): void;
  [HousesMutationsEnum.SET_MODAL_DISPLAY](state: S, payload: boolean): void;
  [HousesMutationsEnum.SET_ADD_HOUSE_MODAL](state: S, payload: boolean): void;
  [HousesMutationsEnum.ADD_HOUSE](state: S, payload: HouseModel): void;
};

export interface Actions {
  [HousesActionsEnum.SET_HOUSES]({ commit }: AugmentedActionContext): void;
  [HousesActionsEnum.SET_MODAL_DISPLAY]({ commit }: AugmentedActionContext, payload: boolean): void;
  [HousesActionsEnum.ADD_HOUSE]({ commit }: AugmentedActionContext, payload: HouseModel): void;
  [HousesActionsEnum.SET_ADD_HOUSE_MODAL]({ commit }: AugmentedActionContext, payload: boolean): void;
}

export type Getters<S = HousesStateInterface> = {
  getHousesData(state: S): Array<HouseModel> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<HousesStateInterface, RootStateInterface>, 'commit'>;
