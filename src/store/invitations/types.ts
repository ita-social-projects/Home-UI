import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';

export enum InvitationsMutationsEnum {
  GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS',
  DEL_INVITATION = 'DEL_INVITATION'
}

export enum InvitationsActionsEnum {
  GET_ALL_INVITATIONS = 'GET_ALL_INVITATIONS',
  DEL_INVITATION = 'DEL_INVITATION'
}

export interface InvitationInterface {
  email: string;
  address: string;
  status: string;
  id: number;
}

// export interface AddressInterface {
//   street: string;
//   houseBlock: string;
//   houseNumber: string;
// }

export interface InvitationsStateInterface {
  invitations: Array<InvitationInterface> | null;
}

export type Mutations<S = InvitationsStateInterface> = {
  [InvitationsMutationsEnum.GET_ALL_INVITATIONS](state: S, payload: Array<InvitationInterface>): void;
  [InvitationsMutationsEnum.DEL_INVITATION](state: S, payload: number): void;
};

export interface Actions {
  [InvitationsActionsEnum.GET_ALL_INVITATIONS](
    { commit }: AugmentedActionContext,
    payload: Array<InvitationInterface>
  ): void;
}

export type Getters<S = InvitationsStateInterface> = {
  getInvitationData(state: S): Array<InvitationInterface> | null;
};

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<InvitationsStateInterface, RootStateInterface>, 'commit'>;
