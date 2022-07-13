import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, Getters } from '@/store/polls/types';

export const getters: GetterTree<PollsStateInterface, RootStateInterface> & Getters = {
  getPolls: (state) => {
    return state.cooperationPolls;
  },
  getPollsWithResults: (state) => {
    return state.cooperationPollsWithResults;
  },
  getSelectedPoll: (state) => {
    return state.selectedPoll;
  },
};
