import { ActionTree } from 'vuex';
import { UserStateInterface, UserActionTypes, UserMutationTypes } from '@/store/sign-in/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosResponse } from 'axios';
import router from '@/router';
import { Routes } from '@/router/types';

export const actions: ActionTree<UserStateInterface, RootStateInterface> = {
  [UserActionTypes.SIGN_IN]: ({ commit }, payload) => {
    HTTP.get('/users', { params: { email: payload.userData.email } })
      .then((r: AxiosResponse) => {
        payload.successCallback(r);
        if (r.data.length !== 0) {
          router.push(Routes.UserProfile);
          commit(UserMutationTypes.SET_USER, r.data[0]);
          commit(UserMutationTypes.SET_TOKEN, payload.userData);
        }
      })
      .catch((r: AxiosResponse) => {
        payload.errorCallback(r);
      });
  },
};
