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
import { AxiosError, AxiosResponse } from 'axios';

export const actions: ActionTree<AuthorizationStateInterface, RootStateInterface> & Actions = {
  [AuthActionEnum.SIGN_IN]: ({ commit, dispatch }, payload) => {
    const token = {
      email: payload.data.email,
      token: window.btoa(`${payload.data.email}:${payload.data.password}`),
    };
    dispatch('localStorageStore/SET', token, { root: true });
    HTTP.get('/users', { params: { email: payload.data.email } })
      .then((r: AxiosResponse<UserInterface[]>) => {
        if (r.data.length !== 0) {
          const user = r.data[0];
          commit(AuthMutationEnum.SET_USER, user);
          const currentToken = {
            email: payload.data.email,
            token: window.btoa(`${payload.data.email}:${payload.data.password}`),
            id: user.id,
          };
          dispatch('localStorageStore/SET', currentToken, { root: true });
        }
        payload.successCallback(r);
      })
      .catch((r: AxiosError) => {
        return payload.errorCallback(r);
      });
  },
  [AuthActionEnum.GET_DATA]: ({ commit }, payload) => {
    HTTP.get(`/users/${payload}`).then((r: AxiosResponse<UserInterface>) => {
      commit(AuthMutationEnum.SET_USER, r.data);
    });
  },
  [AuthActionEnum.TEST]: ({ commit }, payload) => {
    const a = {
      first_name: 'XXX',
      middle_name: 'XXX',
      last_name: 'XXX',
      email: 'admin@example.com',
      contacts: [
        {
          type: 'email',
          main: false,
          id: 4,
          email: 'admin@example.com',
        },
      ],
      id: 3,
    };

    commit(AuthMutationEnum.SET_USER, a);
  },
  [AuthActionEnum.SIGN_OUT]: ({ commit, dispatch }, payload) => {
    dispatch('localStorageStore/REMOVE', 'user', { root: true });
    commit(AuthMutationEnum.SET_USER, payload);
  },
};
