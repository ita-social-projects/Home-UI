import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum InvitationsMutationsEnum {
  SET_APARTMENT_INVITATIONS = 'SET_APARTMENT_INVITATIONS',
}

export enum InvitationsActionsEnum {
  SET_APARTMENT_INVITATIONS = 'SET_APARTMENT_INVITATIONS',
}

export enum InvitationsGettersEnum {
  getInvitations = 'getInvitations',
}

export interface InvitationInterface {
  type: string;
  email: string;
  status: string;
  id: number;
  apartment: ApartmentInterface;
}

export interface ApartmentInterface {
  apartmentNumber: string;
  address: AddressInterface;
  id: number;
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

export interface InvitationsStateInterface {
  invitations: Array<InvitationInterface>;
}

export type Mutations<S = InvitationsStateInterface> = {
  [InvitationsMutationsEnum.SET_APARTMENT_INVITATIONS](state: S, payload: Array<InvitationInterface>): void;
};

export interface Actions {
  [InvitationsActionsEnum.SET_APARTMENT_INVITATIONS](
    { commit }: AugmentedActionContext,
    payload: Array<InvitationInterface>
  ): void;
}

export type Getters<S = InvitationsStateInterface> = {
  [InvitationsGettersEnum.getInvitations](state: S): Array<InvitationInterface> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<InvitationsStateInterface, RootStateInterface>, 'commit'>;
