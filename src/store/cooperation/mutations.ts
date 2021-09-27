import { MutationTree } from 'vuex';
import { CooperationStateInterface, CooperationMutationTypes, Mutations } from '@/store/cooperation/types';

export const mutations: MutationTree<CooperationStateInterface> & Mutations = {
  [CooperationMutationTypes.SET_EDRPOU]: (state, payload) => {
    state.erdpou = payload;
  },
};
