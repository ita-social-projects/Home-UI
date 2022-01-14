import { createLogger, MutationTree } from "vuex";
import { PollsStateInterface, PollsMutationEnum, Mutations } from '@/store/polls/types';

export const mutations: MutationTree<PollsStateInterface> & Mutations = {
  [PollsMutationEnum.SET_COOPERATION_POLLS]: (state, payload) => {
    state.cooperationPolls = payload;
  },
  [PollsMutationEnum.SET_SELECTED_POLL]: (state, payload) => {
    const index = state.cooperationPolls.findIndex((el) => el.id === payload);
    state.selectedPoll = state.cooperationPolls[index];
  },

  [PollsMutationEnum.GET_POll_BY_ID]: (state, payload) => {
    state.cooperationPolls = payload
  },
};
