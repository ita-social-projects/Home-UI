import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  InvitationsStateInterface,
  InvitationsMutationsEnum,
  InvitationsActionsEnum,
  Actions,
} from '@/store/invitations/types';
import { HTTP } from '@/core/api/http-common';
import { InvitationDTOModel } from './models/invitationsDTO.model';
import { InvitationModel } from '@/store/invitations/models/invitations.model';
import { PostInvitationDTOModel } from './models/post-invitation.DTOmodel';

export const actions: ActionTree<InvitationsStateInterface, RootStateInterface> & Actions = {
  [InvitationsActionsEnum.CREATE_INVITATION]: async ({ commit }, payload) => {
    try {
      const payloadToSend = new PostInvitationDTOModel(payload);
      const { data } = await HTTP.post(`/invitations/create-invitation`, payloadToSend);
      // const receivedData = new InvitationModel(data);

      // const newInvintation = {
      //   ...receivedData,
      //   ...payload[1],
      // };

      // commit(InvitationsMutationsEnum.CREATE_INVITATION, newInvintation);
    } catch (err: any) {
      console.log('error CREATE_INVITATION', err);
    }
  },
  [InvitationsActionsEnum.SET_APARTMENT_INVITATIONS]: async ({ commit }) => {
    try {
      const { data } = await HTTP.get(`/invitations?type=apartment`);
      const invitations: Array<InvitationModel> = data.map((el: InvitationDTOModel) => new InvitationModel(el));

      commit(InvitationsMutationsEnum.SET_APARTMENT_INVITATIONS, invitations);
    } catch (err: any) {
      console.log('error SET_APARTMENT_INVITATIONS', err);
    }
  },
};
