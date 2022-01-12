import { MutationTree } from 'vuex';
import { InvitationsStateInterface, InvitationsMutationsEnum, Mutations } from '@/store/invitations/types';

export const mutations: MutationTree<InvitationsStateInterface> & Mutations = {
  [InvitationsMutationsEnum.GET_ALL_INVITATIONS]: (state, payload) => {
    state.invitations = payload;
  },
  [InvitationsMutationsEnum.CREATE_INVITATION]: (state, payload) => {
    state.invitations?.push(payload);
  },
  [InvitationsMutationsEnum.SET_APARTMENT_INVITATIONS]: (state, payload) => {
    state.invitations = payload;
  },
};
