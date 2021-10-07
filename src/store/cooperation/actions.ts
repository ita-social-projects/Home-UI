import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import {
  CooperationStateInterface,
  CooperationActionTypes,
  CooperationMutationTypes,
  Actions,
} from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosError, AxiosResponse } from 'axios';

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
  [CooperationActionTypes.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(CooperationMutationTypes.SET_MODAL_DISPLAY, payload);
  },

  [CooperationActionTypes.SET_USER_COOPERATIONS]: ({ commit }) => {
    HTTP.get('/cooperations')
      .then((r: AxiosResponse) => {
        commit(CooperationMutationTypes.SET_USER_COOPERATIONS, r.data);
      })
      .catch((err: AxiosError) => {
        console.log('error SET_USER_COOPERATIONS', err.response);
      });
  },

  [CooperationActionTypes.SET_SELECTED_COOPERATION]: ({ commit }) => {
    // commit(CooperationMutationTypes.SET_SELECTED_COOPERATION);
  },
};
