import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface, Getters } from '@/store/invitations/types';

export const getters: GetterTree<InvitationsStateInterface, RootStateInterface> & Getters = {
  getInvitations: (state) => {
    return state.invitations;
  },
};
