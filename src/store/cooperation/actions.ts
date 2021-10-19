import { ActionTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import {
  CooperationStateInterface,
  CooperationActionEnum,
  CooperationMutationEnum,
  Actions,
} from '@/store/cooperation/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosError, AxiosResponse } from 'axios';

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
    return HTTP.get('/cooperations', {
      params: {
        page_size: 10,
        sort: 'id,asc',
      },
    })
      .then((r: AxiosResponse) => {
        // console.log(r.data);
        commit(CooperationMutationEnum.SET_USER_COOPERATIONS, r.data);
      })
      .then(() => {
        commit(CooperationMutationEnum.SET_SELECTED_COOPERATION, 0);
      })
      .catch((err: AxiosError) => {
        console.log('error SET_USER_COOPERATIONS', err.response);
      });
  },

  [CooperationActionEnum.SET_SELECTED_COOPERATION]: ({ commit }, payload) => {
    commit(CooperationMutationEnum.SET_SELECTED_COOPERATION, payload);
  },

  [CooperationActionEnum.SET_COOPERATION_UPDATE]: async ({ commit }, payload) => {
    try {
      const response = await HTTP.put(`/cooperations/${payload.id}`, {
        name: payload.name,
        usreo: payload.edrpou,
        iban: payload.iban,
        address: payload.address,
        contacts: payload.contacts,
      });
      console.log(response);
    } catch (err: any) {
      console.log('error SET_COOPERATION_UPDATE', err.response);
    }
  },
};
