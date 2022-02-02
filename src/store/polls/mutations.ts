import { MutationTree } from 'vuex';
import { PollsStateInterface, PollsMutationEnum, Mutations } from '@/store/polls/types';

export const mutations: MutationTree<PollsStateInterface> & Mutations = {
  [PollsMutationEnum.SET_COOPERATION_POLLS]: (state, payload) => {
    state.cooperationPolls = payload;
  },

  [PollsMutationEnum.SET_SELECTED_POLL]: (state, payload) => {
    const index = state.cooperationPolls.findIndex((el) => el.id === payload);
    state.selectedPoll = state.cooperationPolls[index];
  },

  [PollsMutationEnum.ADD_COOPERATION_POLL]: (state, payload) => {
    state.cooperationPolls = [...state.cooperationPolls, payload];
  },

  [PollsMutationEnum.DELETE_POLL]: (state, payload) => {
    const updatePolls = state.cooperationPolls?.filter((el) => el.id !== payload);
    state.cooperationPolls = updatePolls;
  },

  [PollsMutationEnum.UPDATE_POLL]: (state, payload) => {
    state.cooperationPolls?.forEach((el) => {
      if (el.id === payload.ids.pollId) {
        el.header = payload.poll.header;
        el.description = payload.poll.description;
        el.creationDate = payload.poll.creationDate;
        el.completionDate = payload.poll.completionDate;
        el.polledHouses = payload.poll.polledHouses;
      }
    });
  },

  [PollsMutationEnum.SET_POll_BY_ID]: (state, payload) => {
    state.selectedPoll = payload;
  },
};
