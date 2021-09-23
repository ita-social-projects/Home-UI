import { MutationTree } from 'vuex';
import { CooperationInterface, CooperationMutationTypes, Mutations } from '@/store/cooperation/types';

export const mutations: MutationTree<CooperationInterface> & Mutations = {
  [CooperationMutationTypes.SET_EDRPOU]: (state: CooperationInterface, payload) => {
    state.erdpou = payload;
  },
};
