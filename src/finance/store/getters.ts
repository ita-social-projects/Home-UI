import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';

import { TariffStateInterface, Getters } from '@/finance/store/types';
import { TariffModel } from '@/finance/models/tariff.model';

export const getters: GetterTree<TariffStateInterface, RootStateInterface> & Getters = {
  getCurrentTariff: (state): TariffModel | null => {
    return state.currentTariff;
  },
};
