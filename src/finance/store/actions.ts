import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TariffStateInterface, TariffActionEnum, TariffMutationEnum, Actions } from '@/finance/store/types';

import { TariffModel } from '@/finance/models/tariff.model';

export const actions: ActionTree<TariffStateInterface, RootStateInterface> & Actions = {
  [TariffActionEnum.SET_CURRENT_TARIFF]: ({ commit }, payload) => {
    const newTariff: TariffModel = new TariffModel(payload);
    commit(TariffMutationEnum.SET_CURRENT_TARIFF, newTariff);
  },
  [TariffActionEnum.CLEAR_CURRENT_TARIFF]: ({ commit }) => {
    commit(TariffMutationEnum.CLEAR_CURRENT_TARIFF, '');
  },
  [TariffActionEnum.CREATE_TARIFF]: ({ commit, state }) => {
    try {
      const currentTariff = state.currentTariff;
      // TODO when endpoints will exist for finance section, create request to backend -> POST axios
      commit(TariffMutationEnum.CREATE_TARIFF, currentTariff);
    } catch (error: any) {
      console.log(error);
    }
  },
};
