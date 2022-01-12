import { GetterTree } from 'vuex';
<<<<<<< HEAD
import { InvitationsStateInterface, Getters } from '@/store/invitations/types';
import { RootStateInterface } from '@/store/types';

export const getters: GetterTree<InvitationsStateInterface, RootStateInterface> & Getters = {
  getInvitationData: (state) => {
=======
import { RootStateInterface } from '@/store/types';
import { InvitationsStateInterface, Getters } from '@/store/invitations/types';

export const getters: GetterTree<InvitationsStateInterface, RootStateInterface> & Getters = {
  getInvitations: (state) => {
>>>>>>> feature_121/invitation_section
    return state.invitations;
  },
};
