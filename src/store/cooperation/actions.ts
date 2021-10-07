import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import {
  CooperationStateInterface,
  CooperationActionTypes,
  CooperationMutationTypes,
  Actions,
} from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<CooperationStateInterface, RootStateInterface> & Actions = {
  [CooperationActionTypes.CREATE_COOPERATION]: async ({ commit }, payload) => {
    try {
      const response = await HTTP.post('/cooperations', {
        usreo: payload.data.edrpou,
        admin_email: payload.data.email,
      });
      payload.successCallback(response);
    } catch (e: any) {
      console.log(e.response);
      payload.errorCallback();
    }
  },
  [CooperationActionTypes.SET_EDRPOU]: ({ commit }, payload) => {
    commit(CooperationMutationTypes.SET_EDRPOU, payload);
  },
};
