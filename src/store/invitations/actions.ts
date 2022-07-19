import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  InvitationsStateInterface,
  InvitationsMutationsEnum,
  InvitationsActionsEnum,
  Actions,
} from '@/store/invitations/types';
import { HTTP } from '@/core/api/http-common';
import { InvitationModel } from '@/store/invitations/models/invitations.model';
import { PostInvitationDTOModel } from './models/post-invitation.DTOmodel';
import { InvitationDTOModel } from '@/store/invitations/models/invitationsDTO.model';

export const actions: ActionTree<InvitationsStateInterface, RootStateInterface> & Actions = {
  [InvitationsActionsEnum.CREATE_INVITATION]: async ({ commit }, payload) => {
    try {
      const payloadToSend = new PostInvitationDTOModel(payload.data);
      const { data } = await HTTP.post(`/invitations/create-invitation`, payloadToSend);
      const receivedData = new InvitationModel(data);

      const newInvintation = {
        ...receivedData,
        ...payload.address,
      };

      commit(InvitationsMutationsEnum.CREATE_INVITATION, newInvintation);
    } catch (err: any) {
      console.log('error CREATE_INVITATION', err);
    }
  },
  [InvitationsActionsEnum.SET_APARTMENT_INVITATIONS]: async ({ commit }, payload) => {
    try {
      const params = payload ? { email: `*${payload}*` } : {};

      const response = await HTTP.get(`/invitations?type=apartment`, { params });

      const invitations: Array<InvitationModel> = response.data.map(
        (el: InvitationDTOModel) => new InvitationModel(el)
      );

      commit(InvitationsMutationsEnum.SET_APARTMENT_INVITATIONS, invitations);
    } catch (err: any) {
      console.log('error SET_APARTMENT_INVITATIONS', err);
    }
  },
  [InvitationsActionsEnum.DEL_INVITATION]: async ({ commit }, payload) => {
    try {
      await HTTP.delete(`/invitations/delete-invitations?invitation_id=${payload.id}`).then(() => {
        commit(InvitationsMutationsEnum.DEL_INVITATION, payload.id);
      });
    } catch (e) {
      console.log(e);
    }
  },
};
