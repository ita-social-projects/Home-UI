import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum HousesMutationsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  GET_HOUSE_BY_ID = 'GET_HOUSE_BY_ID',
}

export enum HousesActionsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  GET_HOUSE_BY_ID = 'GET_HOUSE_BY_ID',
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
  address: AddressInterface;
}

export interface HousesStateInterface {
  houses: Array<HouseInterface> | null;
  displayModal: boolean;
  houseInfo: HouseInterface | null;
}

export type Mutations<S = HousesStateInterface> = {
  [HousesMutationsEnum.SET_HOUSES](state: S, payload: Array<HouseInterface>): void;
  [HousesMutationsEnum.GET_HOUSE_BY_ID](state: S, payload: HouseInterface): void;
};

export interface Actions {
  [HousesActionsEnum.SET_HOUSES]({ commit }: AugmentedActionContext, payload: Array<HouseInterface>): void;
  [HousesActionsEnum.GET_HOUSE_BY_ID]({ commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = HousesStateInterface> = {
  getHousesData(state: S): Array<HouseInterface> | null;
  getHouseInfo(state: S): HouseInterface | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<HousesStateInterface, RootStateInterface>, 'commit'>;
