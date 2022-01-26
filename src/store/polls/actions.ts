import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollsActionEnum, PollsMutationEnum, Actions } from '@/store/polls/types';
import { HTTP } from '@/core/api/http-common';
import { PollModel } from '@/store/polls/models/poll.model';
import { PollDTOModel } from '@/store/polls/models/pollDTO.model';
import { PostPollDTOModel } from './models/put-pollDTO.model';

export const actions: ActionTree<PollsStateInterface, RootStateInterface> & Actions = {
  [PollsActionEnum.SET_COOPERATION_POLLS]: async ({ commit }) => {
    try {
      const url = `/cooperations/1/polls`;

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

  [PollsActionEnum.GET_POll_BY_ID]: async ({ commit }, payload) => {
    try {
      const url = `/polls/${payload}`;
      const { data } = await HTTP.get(url);
      const pollByID = new PollModel(data);
      commit(PollsMutationEnum.GET_POll_BY_ID, pollByID);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [PollsActionEnum.DELETE_POLL]: async ({ commit }, payload) => {
    try {
      const url = `cooperations/${payload.cooperationId}/polls/${payload.pollId}`;
      await HTTP.delete(url);
      commit(PollsMutationEnum.DELETE_POLL, payload.pollId);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [PollsActionEnum.UPDATE_POLL]: async ({ commit }, payload) => {
    try {
      const pollToSend = new PostPollDTOModel(payload.data);
      const url = `cooperations/${payload.ids.cooperationId}/polls/${payload.ids.pollId}`;
      const { data } = await HTTP.put(url, pollToSend);

      // const mockData = {
      //   id: data.id,
      //   header: data.header,
      //   description: payload.data.description,
      //   creation_date: payload.data.creationDate,
      //   completion_date: payload.data.completionDate,
      //   polled_houses: payload.data.polledHouses,
      //   status: data.status,
      //   type: data.type,
      // };

      const poll = new PollModel(data);

      commit(PollsMutationEnum.UPDATE_POLL, { poll, pollId: payload.ids.pollId });
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
