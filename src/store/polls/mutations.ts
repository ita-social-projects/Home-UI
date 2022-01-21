import { MutationTree } from 'vuex';
import { PollsStateInterface, PollsMutationEnum, Mutations } from '@/store/polls/types';

export const mutations: MutationTree<PollsStateInterface> & Mutations = {
  [PollsMutationEnum.SET_COOPERATION_POLLS]: (state, payload) => {
    state.cooperationPolls = payload;
  },

  [PollsMutationEnum.SET_POll_BY_ID]: (state, payload) => {
    state.selectedPoll = payload;
  },
};
