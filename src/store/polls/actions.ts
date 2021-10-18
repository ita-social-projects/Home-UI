import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollsActionEnum, PollsMutationEnum, Actions } from '@/store/polls/types';
import { HTTP } from '@/core/api/http-common';
// import { AxiosError, AxiosResponse } from 'axios';

export const actions: ActionTree<PollsStateInterface, RootStateInterface> & Actions = {
  [PollsActionEnum.SET_COOPERATION_POLLS]: async ({ commit }) => {
    try {
      const response = await HTTP.get('/cooperations/52/polls');
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  },
  [PollsActionEnum.SET_SELECTED_POLL]: ({ commit }, payload) => {
    commit(PollsMutationEnum.SET_SELECTED_POLL, payload);
  },
  [PollsActionEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(PollsMutationEnum.SET_MODAL_DISPLAY, payload);
  },
  [PollsActionEnum.CREATE_POLL]: async ({ commit }, payload) => {
    try {
      const response = await HTTP.post('/cooperations', {
        // usreo: payload.data.edrpou,
        // admin_email: payload.data.email,
      });
      // payload.successCallback(response);
    } catch (e: any) {
      console.log(e.response);
      // payload.errorCallback();
    }
  },
};
