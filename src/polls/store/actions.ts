import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollsActionEnum, PollsMutationEnum, Actions } from '@/polls/store/types';
import { HTTP } from '@/core/api/http-common';
import { PollModel, PollModelWithResults } from '@/polls/models/poll.model';
import { PollDTOModel, PollDTOModelWithResults } from '@/polls/models/pollDTO.model';
import { PostPollDTOModel } from '@/polls/models/put-pollDTO.model';

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
  [PollsActionEnum.SET_COOPERATION_POLLS_WITH_RESULTS]: async ({ commit }, payload) => {
    try {
      const url = `/cooperations/${payload}/polls`;

      const { data } = await HTTP.get(url, { params: { page_size: 10, sort: 'id,asc' } });
      const cooperationPolls: Array<PollModelWithResults> = data.map(
        (el: PollDTOModelWithResults) => new PollModelWithResults(el)
      );
      commit(PollsMutationEnum.SET_COOPERATION_POLLS_WITH_RESULTS, cooperationPolls);
    } catch (e: any) {
      console.log(e.response);
    }
  },

  [PollsActionEnum.SET_SELECTED_POLL]: ({ commit }, payload) => {
    commit(PollsMutationEnum.SET_SELECTED_POLL, payload);
  },

  [PollsActionEnum.ADD_COOPERATION_POLL]: async ({ commit }, payload) => {
    try {
      const body = new PollDTOModel(payload.body);
      const url = `/cooperations/${payload.cooperationId}/polls`;
      const { data } = await HTTP.post(url, body);

      const newPoll: PollModel = new PollModel(data);
      commit(PollsMutationEnum.ADD_COOPERATION_POLL, newPoll);
    } catch (e: any) {
      console.log(e.response);
    }
  },

  [PollsActionEnum.SET_POll_BY_ID]: async ({ commit }, payload) => {
    try {
      const url = `/polls/${payload}`;
      const { data } = await HTTP.get(url);
      const pollByID = new PollModel(data);
      commit(PollsMutationEnum.SET_POll_BY_ID, pollByID);
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
    console.log(payload);
    
    try {
      const pollToSend = new PostPollDTOModel(payload.poll);

      const url = `cooperations/${payload.ids.cooperationIdEdit}/polls/${payload.ids.pollId}`;
      const { data } = await HTTP.put(url, pollToSend);

      const poll = new PollModel(data);
      commit(PollsMutationEnum.UPDATE_POLL, { poll, ids: { pollId: payload.ids.pollId } });
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
