import { MutationTree } from 'vuex';
import { UserStateInterface, AuthMutationTypes } from '@/store/authorization/types';

export const mutations: MutationTree<UserStateInterface> = {
  [AuthMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [AuthMutationTypes.SET_TOKEN]: (state, payload) => {
    const currentUser = {
      id: payload.id,
      email: payload.email,
      token: window.btoa(`${payload.email}:${payload.password}`),
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
  },
};
