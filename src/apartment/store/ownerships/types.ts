import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { OwnershipsModel } from '@/apartment/models/ownerships.model';
import { UserContactInterface } from '@/user/store/user/types';

export interface OwnerInterface {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  contacts: Array<UserContactInterface>;
}

export interface OwnershipsInterface {
  id: number;
  owner: OwnerInterface;
  ownershipPart: string;
}

export enum OwnershipsActionEnum {
  SET_OWNERSHIPS = 'SET_OWNERSHIPS',
  EDIT_OWNER = 'EDIT_OWNER',
  DELETE_OWNER = 'DELETE_OWNER',
}

export enum OwnershipsGettersEnum {
  getOwnershipsData = 'getOwnershipsData',
}

export enum OwnershipsMutationEnum {
  SET_OWNERSHIPS = 'SET_OWNERSHIPS',
  EDIT_OWNER = 'EDIT_OWNER',
  DELETE_OWNER = 'DELETE_OWNER',
}

export interface OwnershipsStateInterface {
  ownerships: Array<OwnershipsModel> | [];
}

export interface Actions {
  [OwnershipsActionEnum.SET_OWNERSHIPS]({ commit }: AugmentedActionContext, payload: number): void;
  [OwnershipsActionEnum.DELETE_OWNER]({ commit }: AugmentedActionContext, payload: Record<string, number>): void;
  [OwnershipsActionEnum.EDIT_OWNER]({ commit }: AugmentedActionContext, payload: any): void;
}

export type Mutations<S = OwnershipsStateInterface> = {
  [OwnershipsMutationEnum.SET_OWNERSHIPS](state: S, payload: Array<OwnershipsModel>): void;
  [OwnershipsMutationEnum.DELETE_OWNER](state: S, id: number): void;
  [OwnershipsMutationEnum.EDIT_OWNER](state: S, payload: OwnershipsModel): void;
};

export type Getters<S = OwnershipsStateInterface> = {
  [OwnershipsGettersEnum.getOwnershipsData](state: S): Array<OwnershipsModel> | [];
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<OwnershipsStateInterface, RootStateInterface>, 'commit'>;
