import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';

export interface ApartmentsStateInterface {
  apartments: Array<ApartmentModel> | null;
  displayModal: boolean;
}

export enum ApartmentsMutationsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
}

export enum ApartmentsActionsEnum {
  SET_MODAL_DISPLAY = 'SET_MODAL_DISPLAY',
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
}

export type Mutations<S = ApartmentsStateInterface> = {
  [ApartmentsMutationsEnum.SET_APARTMENTS](state: S, payload: Array<ApartmentModel>): void;
};

export interface Actions {
  [ApartmentsActionsEnum.SET_APARTMENTS]({ commit }: AugmentedActionContext, payload: number): void;
}

export type Getters<S = ApartmentsStateInterface> = {
  getApartmentsData(state: S): Array<ApartmentModel> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ApartmentsStateInterface, RootStateInterface>, 'commit'>;
