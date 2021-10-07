import { ActionTree } from 'vuex';
import {
  AuthorizationStateInterface,
  AuthActionEnum,
  AuthMutationEnum,
  UserInterface,
  Actions,
} from '@/store/authorization/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<AuthorizationStateInterface, RootStateInterface> & Actions = {
  [AuthActionEnum.SIGN_IN]: ({ commit }, payload) => {
    HTTP.get('/users', { params: { email: payload.data.email } })
      .then((r: AxiosResponse<UserInterface[]>) => {
        if (r.data.length !== 0) {
          const user = r.data[0];
          commit(AuthMutationEnum.SET_TOKEN, { ...payload.data, id: user.id });
          commit(AuthMutationEnum.SET_USER, user);
        }
        payload.successCallback(r);
      })
      .catch(() => {
        payload.errorCallback();
      });
  },
  [AuthActionEnum.GET_DATA]: ({ commit }, payload) => {
    HTTP.get(`/users/${payload}`).then((r: AxiosResponse<UserInterface>) => {
      commit(AuthMutationEnum.SET_USER, r.data);
    });
  },
  [AuthActionEnum.SIGN_OUT]: ({ commit }, payload) => {
    commit(AuthMutationEnum.SET_USER, payload);
    localStorage.removeItem('user');
  },
};
