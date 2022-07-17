import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollsStateInterface, PollAcceptanceCriteriaEnum } from '@/store/polls/types';
import { getters } from '@/store/polls/getters';
import { mutations } from '@/store/polls/mutations';
import { actions } from '@/store/polls/actions';

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
