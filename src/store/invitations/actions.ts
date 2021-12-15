import { ActionTree } from 'vuex';
import {
  InvitationsActionsEnum,
  InvitationsMutationsEnum,
  InvitationsStateInterface,
  Actions,
  InvitationInterface,
} from '@/store/invitations/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<InvitationsStateInterface, RootStateInterface> & Actions = {
  [InvitationsActionsEnum.GET_ALL_INVITATIONS]: async ({ commit }) => {
    try {
      await HTTP.get(`url`).then((r: AxiosResponse<InvitationInterface[]>) => {
        commit(InvitationsMutationsEnum.GET_ALL_INVITATIONS, r.data);
      });
    } catch (e) {
      console.log(e);
    }
  },

  [InvitationsActionsEnum.DEL_INVITATION]: async ({ commit }, payload) => {
    // try {
    //   await HTTP.delete('url').then(() => {
    //     commit(InvitationsMutationsEnum.DEL_INVITATION, payload.id);
    //   });
    // } catch (e) {
    //   console.log(e);
    // }
    commit(InvitationsMutationsEnum.DEL_INVITATION, payload.id)
  },
};
