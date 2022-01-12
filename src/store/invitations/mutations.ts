import { MutationTree } from 'vuex';
import { InvitationsStateInterface, InvitationsMutationsEnum, Mutations } from '@/store/invitations/types';

export const mutations: MutationTree<InvitationsStateInterface> & Mutations = {
  [InvitationsMutationsEnum.SET_APARTMENT_INVITATIONS]: (state, payload) => {
    state.invitations = payload;
  },
  [InvitationsMutationsEnum.GET_ALL_INVITATIONS]: (state, payload) => {
    state.invitations = payload;
  },

  [InvitationsMutationsEnum.DEL_INVITATION]: (state, payload) => {
    if (state.invitations !== null) {
      state.invitations = state.invitations.filter((el) => el.id !== payload);
    }
  },
};
