import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentModel } from '@/apartment/models/apartment.model';
import { OwnershipsInterface } from '../ownerships/types';

export interface ApartmentsStateInterface {
  apartments: Array<ApartmentModel>;
  apartmentInfo: ApartmentModel | null;
}

export interface ApartmentInterface {
  id: number;
  apartmentNumber: string;
  apartmentArea: number;
  ownerships: Array<OwnershipsInterface>;
}

export enum ApartmentsMutationsEnum {
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  SET_APARTMENT_BY_ID = 'SET_APARTMENT_BY_ID',
  ADD_APARTMENT = 'ADD_APARTMENT',
}

export enum ApartmentsActionsEnum {
  SET_APARTMENTS = 'SET_APARTMENTS',
  EDIT_APARTMENT = 'EDIT_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  SET_APARTMENT_BY_ID = 'SET_APARTMENT_BY_ID',
  ADD_APARTMENT = 'ADD_APARTMENT',
}

export enum ApartmentsGettersEnum {
  getApartmentsData = 'getApartmentsData',
  getApartmentInfo = 'getApartmentInfo',
}

export type Mutations<S = ApartmentsStateInterface> = {
  [ApartmentsMutationsEnum.SET_APARTMENTS](state: S, payload: Array<ApartmentModel>): void;
  [ApartmentsMutationsEnum.SET_APARTMENT_BY_ID](state: S, payload: ApartmentModel): void;
  [ApartmentsMutationsEnum.ADD_APARTMENT](state: S, payload: ApartmentModel): void;
  [ApartmentsMutationsEnum.DELETE_APARTMENT](state: S, payload: number): void;
  [ApartmentsMutationsEnum.EDIT_APARTMENT](state: S, payload: ApartmentModel): void;
};

export interface Actions {
  [ApartmentsActionsEnum.SET_APARTMENTS]({ commit }: AugmentedActionContext, payload: number): void;
  [ApartmentsActionsEnum.SET_APARTMENT_BY_ID](
    { commit }: AugmentedActionContext,
    payload: Record<string, unknown>
  ): void;
  [ApartmentsActionsEnum.ADD_APARTMENT]({ commit }: AugmentedActionContext, payload: Record<string, any>): void;
  [ApartmentsActionsEnum.DELETE_APARTMENT]({ commit }: AugmentedActionContext, payload: Record<string, number>): void;
  [ApartmentsActionsEnum.EDIT_APARTMENT]({ commit }: AugmentedActionContext, payload: Record<string, any>): void;
}

export type Getters<S = ApartmentsStateInterface> = {
  [ApartmentsGettersEnum.getApartmentsData](state: S): Array<ApartmentModel> | [];
  [ApartmentsGettersEnum.getApartmentInfo](state: S): ApartmentModel | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ApartmentsStateInterface, RootStateInterface>, 'commit'>;
