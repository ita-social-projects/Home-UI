import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  InvitationsActionsEnum,
  Actions,
  InvitationsMutationsEnum,
  InvitationsStateInterface,
} from '@/store/invitations/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<InvitationsStateInterface, RootStateInterface> & Actions = {
  [InvitationsActionsEnum.CREATE_INVITATION]: async ({ commit }, payload) => {
    try {
      //   const { data } = await HTTP.post(`/invitations/id/apartment`, payload);
      //   commit(InvitationsMutationsEnum.CREATE_INVITATION, data);
      console.log('invitation action');
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [InvitationsActionsEnum.GET_ALL_INVITATIONS]: async ({ commit }, payload) => {
    try {
      //   const { data } = await HTTP.post(`/invitations`, payload);
      //   commit(InvitationsMutationsEnum.GET_ALL_INVITATIONS, data);
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
