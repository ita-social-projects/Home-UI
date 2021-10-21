import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollsActionEnum, PollsMutationEnum, Actions } from '@/store/polls/types';
import { HTTP } from '@/core/api/http-common';
import { PollModel } from '@/store/polls/models/poll.model';
import { PollDTOModel } from '@/store/polls/models/pollDTO.model';

// import { AxiosError, AxiosResponse } from 'axios';

export const actions: ActionTree<PollsStateInterface, RootStateInterface> & Actions = {
  [PollsActionEnum.SET_COOPERATION_POLLS]: async ({ commit, rootGetters }) => {
    try {
      const cooperationId = rootGetters['cooperationStore/getSelectedCooperationId'];
      const url = `/cooperations/${cooperationId}/polls`;

      const { data } = await HTTP.get(url, { params: { page_size: 10, sort: 'id,asc' } });
      const cooperationPolls: Array<PollModel> = data.map((el: PollDTOModel) => new PollModel(el));
      commit(PollsMutationEnum.SET_COOPERATION_POLLS, cooperationPolls);
    } catch (e) {
      console.log(e.response);
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
