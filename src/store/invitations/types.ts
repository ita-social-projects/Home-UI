import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationModel } from './models/invitation.model';
import { InvitationDTOModel } from './models/invitationDTO.model';

export enum InvitationsMutationsEnum {
  GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS',
  CREATE_INVITATION = 'CREATE_INVITATION',
}

export enum InvitationsActionsEnum {
  GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS',
  CREATE_INVITATION = 'CREATE_INVITATION',
}

export interface InvitationInterface {
  email: string;
  address: string;
  status: string;
  id: number;
}

export interface AddressInterface {
  street: string;
  houseBlock: string;
  houseNumber: string;
}

export interface InvitationsStateInterface {
  invitations: Array<InvitationModel> | null;
}

export type Mutations<S = InvitationsStateInterface> = {
  [InvitationsMutationsEnum.GET_ALL_INVITATIONS](state: S, payload: Array<InvitationModel>): void;
  [InvitationsMutationsEnum.CREATE_INVITATION](state: S, payload: InvitationModel): void;
};

export interface Actions {
  [InvitationsActionsEnum.GET_ALL_INVITATIONS](
    { commit }: AugmentedActionContext,
    payload: Array<InvitationModel>
  ): void;
  [InvitationsActionsEnum.CREATE_INVITATION]({ commit }: AugmentedActionContext, payload: InvitationModel): void;
}

export type Getters<S = InvitationsStateInterface> = {
  getInvitations(state: S): Array<InvitationModel> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<InvitationsStateInterface, RootStateInterface>, 'commit'>;
