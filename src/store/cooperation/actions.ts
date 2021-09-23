import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { CooperationInterface, CooperationMutationTypes, Actions } from '@/store/cooperation/types';
import { CooperationActionTypes } from '@/store/cooperation/types';

export const actions: ActionTree<CooperationInterface, RootStateInterface> & Actions = {
  [CooperationActionTypes.SAY_HELLO]: ({ commit }) => {
    commit(CooperationMutationTypes.SAY_HELLO, 'hello');
  },
};
