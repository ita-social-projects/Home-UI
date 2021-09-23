import { MutationTree } from 'vuex';
import { CooperationInterface, CooperationMutationTypes, Mutations } from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const mutations: MutationTree<CooperationInterface> & Mutations = {
  [CooperationMutationTypes.IS_COOPERATION_REGISTERED]: (state: CooperationInterface, payload) => {
    HTTP.get('/cooperations', { params: { usreo: payload.params.edrpou } })
      .then((r: AxiosResponse) => {
        payload.successCallback(r);
      })
      .catch((e) => {
        payload.errorCallback(e);
      });
  },
  [CooperationMutationTypes.SET_EDRPOU]: (state: CooperationInterface, payload) => {
    state.erdpou = payload;
  },
};
