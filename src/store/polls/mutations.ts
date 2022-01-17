import { createLogger, MutationTree } from 'vuex';
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
    state.pollById = payload;
  },

  [PollsMutationEnum.CLEAR_POll_BY_ID]: (state) => {
    state.pollById = {
      id: 0,
      header: '',
      creationDate: '',
      completionDate: '',
      polledHouses: [],
      status: 'active',
      type: '',
    };
  },
};
