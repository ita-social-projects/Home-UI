import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, Getters } from '@/store/polls/types';

export const getters: GetterTree<PollsStateInterface, RootStateInterface> & Getters = {
  getPolls: (state) => {
    return state.cooperationPolls;
  },
  getSelectedPoll: (state) => {
    return state.selectedPoll;
  },
  getPollByID: (state) => {
    return state.pollById;
  },
};
