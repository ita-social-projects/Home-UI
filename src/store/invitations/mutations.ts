import { MutationTree } from 'vuex';
import { Mutations } from '@/store/invitations/types';
import { InvitationsMutationsEnum, InvitationsStateInterface } from '@/store/invitations/types';

export const mutations: MutationTree<InvitationsStateInterface> & Mutations = {
  [InvitationsMutationsEnum.GET_ALL_INVITATIONS]: (state, payload) => {
    state.invitations = payload;
  },
  [InvitationsMutationsEnum.CREATE_INVITATION]: (state, payload) => {
    console.log('payload', payload);
    state.invitations?.push(payload);
  },
};
