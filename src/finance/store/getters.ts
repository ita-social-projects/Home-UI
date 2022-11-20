import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifStateInterface, Getters } from '@/finance/store/types';

export const getters: GetterTree<TarrifStateInterface, RootStateInterface> & Getters = {
  getTariffs: (state) => {
    return state.tarrifList;
  },
};
