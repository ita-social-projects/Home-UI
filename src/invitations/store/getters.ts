import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface, Getters } from '@/invitations/store/types';

export const getters: GetterTree<InvitationsStateInterface, RootStateInterface> & Getters = {
  getInvitations: (state) => {
    return state.invitations;
  },
};
