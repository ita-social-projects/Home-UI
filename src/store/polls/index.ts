import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollsStateInterface } from '@/store/polls/types';
import { getters } from '@/store/polls/getters';
import { mutations } from '@/store/polls/mutations';
import { actions } from '@/store/polls/actions';

export const state: PollsStateInterface = {
  cooperationPolls: [],
  selectedPoll: null,
  getPollById: {
    id: 0,
    header: '',
    creationDate: '',
    completionDate: '',
    polledHouses: [],
    status: 'active',
    type: '',
  },
  displayModal: false,
};

export const pollsStore: Module<PollsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
