import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';
import { AddApartmentModel } from '@/store/apartments/models/add-apartment.model';

export interface ApartmentsStateInterface {
  apartments: Array<ApartmentModel> | null;
}

export enum ApartmentsMutationsEnum {
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  ADD_APARTMENT = 'ADD_APARTMENT',
}

export enum ApartmentsActionsEnum {
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  ADD_APARTMENT = 'ADD_APARTMENT',
}

export type Mutations<S = ApartmentsStateInterface> = {
  [ApartmentsMutationsEnum.SET_APARTMENTS](state: S, payload: Array<ApartmentModel>): void;
  [ApartmentsMutationsEnum.ADD_APARTMENT](state: S, payload: AddApartmentModel): void;
};

export interface Actions {
  [ApartmentsActionsEnum.SET_APARTMENTS]({ commit }: AugmentedActionContext, payload: number): void;
  [ApartmentsActionsEnum.ADD_APARTMENT]({ commit }: AugmentedActionContext, payload: AddApartmentModel): void;
}

export type Getters<S = ApartmentsStateInterface> = {
  getApartmentsData(state: S): Array<ApartmentModel> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ApartmentsStateInterface, RootStateInterface>, 'commit'>;
