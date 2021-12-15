import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  InvitationsActionsEnum,
  Actions,
  InvitationsMutationsEnum,
  InvitationsStateInterface,
} from '@/store/invitations/types';
// import { HTTP } from '@/core/api/http-common';
import { InvitationDTOModel } from './models/invitationDTO.model';
import { InvitationModel } from './models/invitation.model';

export const actions: ActionTree<InvitationsStateInterface, RootStateInterface> & Actions = {
  [InvitationsActionsEnum.CREATE_INVITATION]: async ({ commit }, payload) => {
    try {
      const payloadToSend = new InvitationDTOModel(payload);
      //   const { data } = await HTTP.post(`/invitations/`, payloadToSend);
      // Mock data
      const receiveData: InvitationDTOModel = {
        id: 1300,
        email: payload.email,
        status: 'запрошення створено',
        address: payload.address,
        invitation_type: payload.invitationType,
      };
      const data = new InvitationModel(receiveData);
      commit(InvitationsMutationsEnum.CREATE_INVITATION, data);
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
