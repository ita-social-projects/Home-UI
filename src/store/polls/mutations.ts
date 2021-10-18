import { MutationTree } from 'vuex';
import { PollsStateInterface, PollsMutationEnum, Mutations } from '@/store/polls/types';

export const mutations: MutationTree<PollsStateInterface> & Mutations = {
  [PollsMutationEnum.SET_COOPERATION_POLLS]: (state, payload) => {
    state.cooperationPolls = payload;
  },
  [PollsMutationEnum.SET_SELECTED_POLL]: (state, payload) => {
    state.selectedPoll = state.cooperationPolls[payload];
  },
  [PollsMutationEnum.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
};
