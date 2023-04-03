import { MutationTree } from 'vuex';
import { TariffStateInterface, TariffMutationEnum, Mutations } from '@/finance/store/types';

export const mutations: MutationTree<TariffStateInterface> & Mutations = {
  [TariffMutationEnum.SET_CURRENT_TARIFF]: (state, payload) => {
    state.currentTariff = payload;
  },
  [TariffMutationEnum.CLEAR_CURRENT_TARIFF]: (state) => {
    state.currentTariff = null;
  },
  [TariffMutationEnum.CREATE_TARIFF]: (state, payload) => {
    console.table(payload);
  },

  [TariffMutationEnum.SET_TARIFF_LIST]: (state, payload) => {
    state.tariffList = payload;
  },
};
