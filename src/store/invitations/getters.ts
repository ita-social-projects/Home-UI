import { GetterTree } from 'vuex';
import { InvitationsStateInterface, Getters } from '@/store/invitations/types';
import { RootStateInterface } from '@/store/types';

export const getters: GetterTree<InvitationsStateInterface, RootStateInterface> & Getters = {
  getInvitationData: (state) => {
    return state.invitations;
  },
};
