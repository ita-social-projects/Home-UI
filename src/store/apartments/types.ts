import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';

export interface ApartmentsStateInterface {
  apartments: Array<ApartmentModel> | null;
  apartmentInfo: ApartmentModel | null;
}

export enum ApartmentsMutationsEnum {
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  GET_APARTMENT_BY_ID = 'GET_APARTMENT_BY_ID',
}

export enum ApartmentsActionsEnum {
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  GET_APARTMENT_BY_ID = 'GET_APARTMENT_BY_ID',
}

export type Mutations<S = ApartmentsStateInterface> = {
  [ApartmentsMutationsEnum.SET_APARTMENTS](state: S, payload: Array<ApartmentModel>): void;
  [ApartmentsMutationsEnum.GET_APARTMENT_BY_ID](state: S, payload: ApartmentModel): void;
};

export interface Actions {
  [ApartmentsActionsEnum.SET_APARTMENTS]({ commit }: AugmentedActionContext, payload: number): void;
  [ApartmentsActionsEnum.GET_APARTMENT_BY_ID](
    { commit }: AugmentedActionContext,
    payload: Record<string, unknown>
  ): void;
}

export type Getters<S = ApartmentsStateInterface> = {
  getApartmentsData(state: S): Array<ApartmentModel> | null;
  getApartmentInfo(state: S): ApartmentModel | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ApartmentsStateInterface, RootStateInterface>, 'commit'>;
