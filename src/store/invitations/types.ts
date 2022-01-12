import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationModel } from '@/store/invitations/models/invitations.model';

export enum InvitationsMutationsEnum {
  CREATE_INVITATION = 'CREATE_INVITATION',
  SET_APARTMENT_INVITATIONS = 'SET_APARTMENT_INVITATIONS',
}

export enum InvitationsActionsEnum {
  CREATE_INVITATION = 'CREATE_INVITATION',
  SET_APARTMENT_INVITATIONS = 'SET_APARTMENT_INVITATIONS',
}

export enum InvitationsGettersEnum {
  getInvitations = 'getInvitations',
}

export enum InvitationTypesEnum {
  cooperation = 'cooperation',
  apartment = 'apartment',
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
  invitations: Array<InvitationModel> | null;
}

export interface PostInvitationInterface {
  type: string;
  email: string;
  status: string;
  id: number;
  role: string;
  cooperationId: number;
  apartmentId: number;
}

export type Mutations<S = InvitationsStateInterface> = {
  [InvitationsMutationsEnum.CREATE_INVITATION](state: S, payload: InvitationModel): void;
  [InvitationsMutationsEnum.SET_APARTMENT_INVITATIONS](state: S, payload: Array<InvitationModel>): void;
};

export interface Actions {
  [InvitationsActionsEnum.SET_APARTMENT_INVITATIONS](
    { commit }: AugmentedActionContext,
    payload: Array<InvitationModel>
  ): void;
  [InvitationsActionsEnum.CREATE_INVITATION](
    { commit }: AugmentedActionContext,
    payload: PostInvitationInterface
  ): void;
}

export type Getters<S = InvitationsStateInterface> = {
  [InvitationsGettersEnum.getInvitations](state: S): Array<InvitationModel> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<InvitationsStateInterface, RootStateInterface>, 'commit'>;
