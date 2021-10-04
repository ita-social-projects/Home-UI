import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes } from '@/store/authorization/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [UserMutationTypes.SET_TOKEN]: (state, payload) => {
    const currentUser = {
      id: payload.id,
      email: payload.email,
      token: window.btoa(`${payload.email}:${payload.password}`),
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
  },
};
