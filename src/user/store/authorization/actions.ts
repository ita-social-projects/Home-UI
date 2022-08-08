import { ActionTree } from 'vuex';
import {
  AuthorizationStateInterface,
  AuthActionEnum,
  AuthMutationEnum,
  Actions,
} from '@/user/store/authorization/types';
import { RootStateInterface, StoreModuleEnum } from '@/store/types';
// <<<<<<< HEAD:src/user/store/authorization/actions.ts
import { HTTP, HTTP_AUTH } from '@/core/api/http-common';
import { UpdateUserModel } from '@/user/models/update-user.model';
import { PostContactModel } from '@/user/models/post-contact.model';
import { UserDTOModel } from '../../models/userDTO.model';
import { UserModel } from '../../models/user.model';

export const actions: ActionTree<AuthorizationStateInterface, RootStateInterface> & Actions = {
  [AuthActionEnum.SIGN_IN]: async ({ commit, dispatch }, payload) => {
    try {
      const authResponse = await HTTP_AUTH.post('/login', {
        email: payload.data.email,
        password: payload.data.password,
      });
      const token = {
        email: payload.data.email,
        token: authResponse.data.access_token,
        refreshToken: authResponse.data.refresh_token,
      };

      dispatch(`${StoreModuleEnum.localStorageStore}/SET`, token, { root: true });
      const response = await HTTP.get('/users', { params: { email: payload.data.email } });

      if (response.data.length !== 0) {
        const user: Array<UserModel> = response.data.map((el: UserDTOModel) => new UserModel(el));
        commit(AuthMutationEnum.SET_USER, user[0]);
        dispatch(`${StoreModuleEnum.localStorageStore}/SET`, { ...token, id: user[0].id }, { root: true });
      }

      payload.successCallback(response);
    } catch (err: any) {
      payload.errorCallback(err);
    }
  },
  [AuthActionEnum.GET_DATA]: async ({ commit }, payload) => {
    const { data } = await HTTP.get(`/users/${payload}`);
    const user: UserModel = new UserModel(data);

    commit(AuthMutationEnum.SET_USER, user);
  },

  [AuthActionEnum.SIGN_OUT]: ({ commit, dispatch }, payload) => {
    dispatch(`${StoreModuleEnum.localStorageStore}/REMOVE`, 'user', { root: true });
    commit(AuthMutationEnum.SET_USER, payload);
  },

  [AuthActionEnum.UPDATE_USER]: async ({ state, commit }, payload) => {
    const payloadData = new UpdateUserModel(payload);
    const userId = state.user!.id;

    const { data } = await HTTP.put(`/users/${userId}`, payloadData);
    const user: UserModel = new UserModel(data);

    commit(AuthMutationEnum.SET_USER, user);
  },

  [AuthActionEnum.DELETE_CONTACT]: async ({ state, commit }, payload) => {
    try {
      const userId = state.user!.id;
      await HTTP.delete(`/users/${userId}/contacts/${payload}`).then(() => {
        commit(AuthMutationEnum.UPDATE_CONTACT, payload);
      });
    } catch (e: any) {
      console.log(e.response.data.error_message);
    }
  },

  [AuthActionEnum.ADD_CONTACT]: async ({ state, commit }, payload) => {
    try {
      const userId = state.user!.id;
      const payloadData = new PostContactModel(payload[0]);
      const { data } = await HTTP.post(`/users/${userId}/contacts`, payloadData);

      commit(AuthMutationEnum.ADD_CONTACT, data);
    } catch (e: any) {
      console.log(e.response.data.error_message);
    }
  },
};
