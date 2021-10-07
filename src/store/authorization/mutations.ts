import { MutationTree } from 'vuex';
import { AuthorizationStateInterface, AuthMutationEnum } from '@/store/authorization/types';

export const mutations: MutationTree<AuthorizationStateInterface> = {
  [AuthMutationEnum.SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [AuthMutationEnum.SET_TOKEN]: (state, payload) => {
    const currentUser = {
      id: payload.id,
      email: payload.email,
      token: window.btoa(`${payload.email}:${payload.password}`),
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
  },
};
