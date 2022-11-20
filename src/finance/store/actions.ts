import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifStateInterface, TarrifActionEnum, TarrifMutationEnum, Actions } from '@/finance/store/types';

import { TarrifModel } from '@/finance/models/tarrif.model';

export const actions: ActionTree<TarrifStateInterface, RootStateInterface> & Actions = {
  [TarrifActionEnum.SET_CURRENT_TARRIF]: ({ commit }, payload) => {
    const newTarrif: TarrifModel = new TarrifModel(payload);
    commit(TarrifMutationEnum.SET_CURRENT_TARRIF, newTarrif);
  },
};
