import { MutationTree } from 'vuex';
import { TarrifStateInterface, TarrifMutationEnum, Mutations } from '@/finance/store/types';

export const mutations: MutationTree<TarrifStateInterface> & Mutations = {
  [TarrifMutationEnum.SET_CURRENT_TARRIF]: (state, payload) => {
    state.currentTarrif = payload;
  },
};
