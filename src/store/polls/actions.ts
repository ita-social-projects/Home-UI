import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollsActionEnum, PollsMutationEnum, Actions } from '@/store/polls/types';
import { HTTP } from '@/core/api/http-common';
import { PollModel } from '@/store/polls/models/poll.model';
import { PollDTOModel } from '@/store/polls/models/pollDTO.model';

export const actions: ActionTree<PollsStateInterface, RootStateInterface> & Actions = {
  [PollsActionEnum.SET_COOPERATION_POLLS]: async ({ commit }, payload) => {
    try {
      const url = `/cooperations/${payload}/polls`;

      const { data } = await HTTP.get(url, { params: { page_size: 10, sort: 'id,asc' } });
      const cooperationPolls: Array<PollModel> = data.map((el: PollDTOModel) => new PollModel(el));
      commit(PollsMutationEnum.SET_COOPERATION_POLLS, cooperationPolls);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [PollsActionEnum.SET_SELECTED_POLL]: ({ commit }, payload) => {
    commit(PollsMutationEnum.SET_SELECTED_POLL, payload);
  },
  [PollsActionEnum.ADD_COOPERATION_POLL]: async ({ commit }, payload) => {
    try {
      // const body = new PollDTOModel(payload.body);

      //mock request
      const body = {
        header: payload.body.header,
        completion_date: payload.body.completionDate,
        houses: payload.body.polledHouses,
        type: 'simple',
      };
      const url = `/cooperations/${payload.cooperationId}/polls`;
      const { data } = await HTTP.post(url, body);

      const newPoll: PollModel = new PollModel(data);
      commit(PollsMutationEnum.ADD_COOPERATION_POLL, newPoll);
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
