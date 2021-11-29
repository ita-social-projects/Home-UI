import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export interface ApartmentOwnerContacts {
  id: number;
  type: string;
  main: boolean;
  email?: string;
  phone?: string;
}

export interface ApartmentOwnerInterface {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  contacts: Array<ApartmentOwnerContacts>;
}

export interface ApartmentOwnershipsInterface {
  id: number;
  owner: ApartmentOwnerInterface;
  ownership_part: number;
}

export interface ApartmentInterface {
  id: number;
  apartment_number: string;
  apartment_area: number;
  ownerships: Array<ApartmentOwnershipsInterface>;
}

export interface ApartmentsStateInterface {
  apartments: Array<ApartmentInterface> | null;
  displayModal: boolean;
  house_id: number;
  quantity_flat: number;
  selected_apartment_id: number | null;
}

export enum ApartmentsMutationsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  SET_SELECTED_APARTMENT_ID = 'SET_SELECTED_APARTMENT_ID',
}

export enum ApartmentsActionsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  SET_SELECTED_APARTMENT_ID = 'SET_SELECTED_APARTMENT_ID',
}

export type Mutations<S = ApartmentsStateInterface> = {
  [ApartmentsMutationsEnum.SET_APARTMENTS](state: S, payload: Array<ApartmentInterface>): void;
};

export interface Actions {
  [ApartmentsMutationsEnum.SET_APARTMENTS](
    { commit }: AugmentedActionContext,
    payload: Array<ApartmentInterface>
  ): void;
}

export type Getters<S = ApartmentsStateInterface> = {
  getApartmentsData(state: S): Array<ApartmentInterface> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ApartmentsStateInterface, RootStateInterface>, 'commit'>;
