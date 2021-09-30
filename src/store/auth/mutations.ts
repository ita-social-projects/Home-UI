import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes } from '@/store/auth/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [UserMutationTypes.SET_TOKEN]: (state, payload) => {
    const currentUser = {
      email: state.user?.email,
      token: window.btoa(`${payload.email}:${payload.password}`),
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
  },
};
