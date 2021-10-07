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
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]: ({ commit }, payload) => {
    HTTP.get('/cooperations', { params: { usreo: payload.params.edrpou } })
      .then((r: AxiosResponse) => {
        // console.log(r);
        // console.log(r.config.headers.Authorization);
        payload.successCallback(r);
      })
      .catch(() => {
        payload.errorCallback();
      });
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
    commit(CooperationMutationTypes.SET_SELECTED_COOPERATION);
  },

  // [CooperationActionTypes.SET_COOPERATION_UPDATE_INFO]: ({ commit }, payload) => {
  //   commit(CooperationMutationTypes.SET_COOPERATION_UPDATE_INFO, payload);

  //   HTTP.put('/cooperations', payload.id)
  //     .then((r: AxiosResponse) => {
  //       console.log(r); // [{...}]
  //       commit(CooperationMutationTypes.SET_COOPERATION_INFO, r.data);
  //     })
  //     .catch(() => {
  //       console.log("error");
  //     });
  // },
};
