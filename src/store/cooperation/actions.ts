import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  CooperationStateInterface,
  CooperationActionEnum,
  CooperationMutationEnum,
  Actions,
} from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';
import { CooperationDTOModel } from '@/store/cooperation/models/cooperationDTO.model';
import { CooperationModel } from './models/cooperation.model';
import { CooperationPutDTOModel } from './models/put-cooperationDTO.model';

export const actions: ActionTree<CooperationStateInterface, RootStateInterface> & Actions = {
  [CooperationActionEnum.CREATE_COOPERATION]: async ({ commit }, payload) => {
    try {
      const response = await HTTP.post('/cooperations', {
        usreo: payload.data.edrpou,
        admin_email: payload.data.email,
      });
      payload.successCallback(response);
    } catch (e: any) {
      console.log(e.response);
      payload.errorCallback();
    }
  },
  [CooperationActionEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(CooperationMutationEnum.SET_MODAL_DISPLAY, payload);
  },

  [CooperationActionEnum.SET_USER_COOPERATIONS]: async ({ commit }) => {
    try {
      const { data } = await HTTP.get('/cooperations', {
        params: {
          page_size: 10,
          sort: 'id,asc',
        },
      });
      const cooperationData: Array<CooperationModel> = data.map((el: CooperationDTOModel) => new CooperationModel(el));

      commit(CooperationMutationEnum.SET_USER_COOPERATIONS, cooperationData);
      commit(CooperationMutationEnum.SET_SELECTED_COOPERATION, 0);
    } catch (err) {
      console.log('error SET_USER_COOPERATIONS', err);
    }
  },

  [CooperationActionEnum.SET_SELECTED_COOPERATION]: ({ commit }, payload) => {
    commit(CooperationMutationEnum.SET_SELECTED_COOPERATION, payload);
  },

  [CooperationActionEnum.SET_COOPERATION_UPDATE]: async ({ commit }, payload: CooperationModel) => {
    try {
      const payloadData = new CooperationPutDTOModel(payload);
      await HTTP.put(`/cooperations/${payloadData.id}`, payloadData);
      commit(CooperationMutationEnum.SET_COOPERATION_UPDATE, payload);
    } catch (err: any) {
      console.log('error SET_COOPERATION_UPDATE', err);
    }
  },
};
