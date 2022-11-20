import { MutationTree } from 'vuex';
import { TarrifStateInterface, TariffMutationsEnum, Mutations } from '@/finance/store/types';

export const mutations: MutationTree<TarrifStateInterface> & Mutations = {
  [TariffMutationsEnum.DEL_TARIFF]: (state, payload) => {
    if (state.tarrifList !== null) {
      state.tarrifList = state.tarrifList.filter((el) => el.id !== payload);
    }
  },
};
