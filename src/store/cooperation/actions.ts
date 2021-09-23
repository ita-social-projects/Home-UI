import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import {
  CooperationInterface,
  CooperationActionTypes,
  CooperationMutationTypes,
  Actions,
} from '@/store/cooperation/types';

export const actions: ActionTree<CooperationInterface, RootStateInterface> & Actions = {
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]: ({ commit }, payload) => {
    commit(CooperationMutationTypes.IS_COOPERATION_REGISTERED, payload);
  },
  [CooperationActionTypes.SET_EDRPOU]: ({ commit }, payload) => {
    commit(CooperationMutationTypes.SET_EDRPOU, payload);
  },
};
