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
