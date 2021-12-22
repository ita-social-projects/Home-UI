import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HouseModel } from '@/shared/models/house.model';

export enum HousesMutationsEnum {
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  GET_HOUSE_BY_ID = 'GET_HOUSE_BY_ID',
  ADD_HOUSE = 'ADD_HOUSE',
}

export enum HousesActionsEnum {
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  GET_HOUSE_BY_ID = 'GET_HOUSE_BY_ID',
  ADD_HOUSE = 'ADD_HOUSE',
}

export interface AddressInterface {
  region: string;
  city: string;
  district: string;
  street: string;
  house_block: string;
  house_number: string;
  zip_code: string;
}

export interface HouseInterface {
  quantity_flat: number;
  house_area: number;
  adjoining_area: number;
  id: number;
  cooperationId: number;
  address: AddressInterface;
}

export interface HousesStateInterface {
  houses: Array<HouseInterface> | null;
  displayModal: boolean;
  houseInfo: HouseInterface | null;
}

export type Mutations<S = HousesStateInterface> = {
  [HousesMutationsEnum.SET_HOUSES](state: S, payload: Array<HouseInterface>): void;

  [HousesMutationsEnum.DELETE_HOUSE](state: any, payload: HouseInterface): void;
  [HousesMutationsEnum.EDIT_HOUSE](state: S, payload: HouseInterface): void;
  [HousesMutationsEnum.GET_HOUSE_BY_ID](state: S, payload: HouseInterface): void;
  [HousesMutationsEnum.ADD_HOUSE](state: S, payload: HouseInterface): void;
};

export interface Actions {
  [HousesActionsEnum.SET_HOUSES]({ commit }: AugmentedActionContext, payload: Array<HouseInterface>): void;
  [HousesActionsEnum.DELETE_HOUSE]({ commit }: AugmentedActionContext, payload: HouseInterface): void;
  [HousesActionsEnum.EDIT_HOUSE]({ commit }: AugmentedActionContext, payload: HouseInterface): void;
  [HousesActionsEnum.ADD_HOUSE]({ commit }: AugmentedActionContext, payload: HouseInterface): void;
  [HousesActionsEnum.GET_HOUSE_BY_ID]({ commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = HousesStateInterface> = {
  getHousesData(state: S): Array<HouseInterface> | null;
  getHouseInfo(state: S): HouseInterface | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<HousesStateInterface, RootStateInterface>, 'commit'>;
