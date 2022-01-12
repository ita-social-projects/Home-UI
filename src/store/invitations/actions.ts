import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  InvitationsActionsEnum,
  Actions,
  InvitationsMutationsEnum,
  InvitationsStateInterface,
} from '@/store/invitations/types';
import { HTTP } from '@/core/api/http-common';
import { InvitationDTOModel } from './models/invitationDTO.model';
import { InvitationModel } from './models/invitation.model';

export const actions: ActionTree<InvitationsStateInterface, RootStateInterface> & Actions = {
  [InvitationsActionsEnum.CREATE_INVITATION]: async ({ commit }, payload) => {
    try {
      const payloadToSend = new InvitationDTOModel(payload);
      console.log('payloadToSend', payloadToSend);
      const { data } = await HTTP.post(`/invitations/create-invitation`, payloadToSend);

      console.log('data', data);
      const receivedData = new InvitationModel(data);
      console.log('receivedData', receivedData);
      commit(InvitationsMutationsEnum.CREATE_INVITATION, receivedData);
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
