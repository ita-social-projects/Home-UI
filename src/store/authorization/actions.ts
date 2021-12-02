import { ActionTree } from 'vuex';
import {
  AuthorizationStateInterface,
  AuthActionEnum,
  AuthMutationEnum,
  UserInterface,
  Actions,
  UpdateUserInterface,
  ContactInterface,
} from '@/store/authorization/types';
import { RootStateInterface } from '@/store/types';
import { HTTP } from '@/core/api/http-common';
import { AxiosError, AxiosResponse } from 'axios';
import { UpdateUserModel } from '@/store/models/update-user.model';
import { PostContactModel } from '@/store/models/post-contact.model';

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
  [AuthActionEnum.GET_DATA]: async ({ commit }, payload) => {
    await HTTP.get(`/users/${payload}`).then((r: AxiosResponse<UserInterface>) => {
      commit(AuthMutationEnum.SET_USER, r.data);
    });
  },

  [AuthActionEnum.SIGN_OUT]: ({ commit, dispatch }, payload) => {
    dispatch('localStorageStore/REMOVE', 'user', { root: true });
    commit(AuthMutationEnum.SET_USER, payload);
  },
  /////////// MY ACTIONS
  [AuthActionEnum.UPDATE_USER]: async ({ state, commit }, payload: UpdateUserInterface) => {
    const payloadData = new UpdateUserModel(payload);
    const userId = state.user!.id;
    await HTTP.put(`/users/${userId}`, payloadData);
  },

  [AuthActionEnum.DELETE_CONTACT]: async ({ state, commit, dispatch }, payload) => {
    const userId = state.user!.id;
    await HTTP.delete(`/users/${userId}/contacts/${payload}`);
    dispatch(AuthActionEnum.SET_CONTACT);
  },

  [AuthActionEnum.SET_CONTACT]: async ({ state, commit }) => {
    const userId = state.user!.id;
    await HTTP.get(`/users/${userId}/contacts`).then((r: AxiosResponse<ContactInterface>) => {
      commit(AuthMutationEnum.UPDATE_CONTACT, r.data);
    });
  },

  [AuthActionEnum.ADD_CONTACT]: async ({ state, commit, dispatch }, payload) => {
    const userId = state.user!.id;
    const payloadData = new PostContactModel(payload[0]);
    await HTTP.post(`/users/${userId}/contacts`, payloadData).catch((e) => {
      alert(e.response.data.error_message);
      dispatch(AuthActionEnum.SET_CONTACT);
    });
  },
};
