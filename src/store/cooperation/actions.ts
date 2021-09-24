import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import {
  CooperationInterface,
  CooperationActionTypes,
  CooperationMutationTypes,
  Actions,
} from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<CooperationInterface, RootStateInterface> & Actions = {
  [CooperationActionTypes.IS_COOPERATION_REGISTERED]: ({ commit }, payload) => {
    HTTP.get('/cooperations', { params: { usreo: payload.params.edrpou } })
      .then((r: AxiosResponse) => {
        payload.successCallback(r);
      })
      .catch((e) => {
        payload.errorCallback(e);
      });
  },
  [CooperationActionTypes.SET_EDRPOU]: ({ commit }, payload) => {
    commit(CooperationMutationTypes.SET_EDRPOU, payload);
  },
};
