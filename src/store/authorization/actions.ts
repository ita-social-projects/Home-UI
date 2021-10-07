import { ActionTree } from 'vuex';
import { UserStateInterface, AuthActionTypes, AuthMutationTypes, User } from '@/store/authorization/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';

export const actions: ActionTree<UserStateInterface, RootStateInterface> = {
  [AuthActionTypes.SIGN_IN]: ({ commit }, payload) => {
    HTTP.get('/users', { params: { email: payload.userData.email } })
      .then((r: AxiosResponse<User[]>) => {
        if (r.data.length !== 0) {
          const user = r.data[0];
          commit(AuthMutationTypes.SET_TOKEN, { ...payload.userData, id: user.id });
          commit(AuthMutationTypes.SET_USER, user);
        }
        payload.successCallback(r);
      })
      .catch(() => {
        payload.errorCallback();
      });
  },
  [AuthActionTypes.GET_DATA]: ({ commit }, payload) => {
    HTTP.get(`/users/${payload}`).then((r: AxiosResponse<User>) => {
      commit(AuthMutationTypes.SET_USER, r.data);
    });
  },
};
