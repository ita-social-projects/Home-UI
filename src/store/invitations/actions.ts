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
import { InvitationDTOModel } from '@/store/invitations/models/invitationsDTO.model';

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
