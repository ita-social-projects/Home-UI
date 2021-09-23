import { MutationTree } from 'vuex';
import { CooperationInterface, CooperationMutationTypes, Mutations } from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

/**
 * объект мутаций имеет тип MutationTree & Mutations (определен выше)
 * в объекте определены сами мутации
 * у самих мутаций название должно соответствовать названию в типе
 * объект mutations будет использован в создании CooperationStore
 * */
// mutation definition
export const mutations: MutationTree<CooperationInterface> & Mutations = {
  [CooperationMutationTypes.SAY_HELLO](state: CooperationInterface, payload) {
    state.helloWorld = payload;
    console.log(state.helloWorld);
  },
  [CooperationMutationTypes.IS_COOPERATION_REGISTERED](state: CooperationInterface, payload) {
    HTTP.get('/cooperations', { params: { usreo: payload.params.edrpou } })
      .then((r: AxiosResponse) => {
        payload.successCallback(r);
      })
      .catch((e) => {
        payload.errorCallback(e);
      });
  },
};
