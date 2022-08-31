import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollAcceptanceCriteriaEnum } from '@/poll/store/types';
import { getters } from '@/poll/store/getters';
import { mutations } from '@/poll/store/mutations';
import { actions } from '@/poll/store/actions';

export const state: PollsStateInterface = {
  cooperationPolls: [],
  selectedPoll: {
    id: 0,
    header: '',
    description: 'Full description',
    creationDate: new Date(),
    completionDate: new Date(),
    polledHouses: [],
    status: 'active',
    type: '',
    acceptanceCriteria: PollAcceptanceCriteriaEnum.twoThirdsVoteOfOwnersQuestions,
  },
  displayModal: false,
  cooperationPollsWithResults: [],
};

export const pollsStore: Module<PollsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
