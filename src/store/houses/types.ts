import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum HousesMutationsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  SET_SELECTED_HOUSE_ID = 'SET_SELECTED_HOUSE_ID',
}

export enum HousesActionsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_HOUSES = 'SET_HOUSES',
  EDIT_HOUSE = 'EDIT_HOUSE',
  DELETE_HOUSE = 'DELETE_HOUSE',
  SET_SELECTED_HOUSE_ID = 'SET_SELECTED_HOUSE_ID',
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
  selected_house_id: number | null;
}

export type Mutations<S = HousesStateInterface> = {
  [HousesMutationsEnum.SET_HOUSES](state: S, payload: Array<HouseInterface>): void;
};

export interface Actions {
  [HousesActionsEnum.SET_HOUSES]({ commit }: AugmentedActionContext, payload: Array<HouseInterface>): void;
}

export type Getters<S = HousesStateInterface> = {
  getHousesData(state: S): Array<HouseInterface> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<HousesStateInterface, RootStateInterface>, 'commit'>;
