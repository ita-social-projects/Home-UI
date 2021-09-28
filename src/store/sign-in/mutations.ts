import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes } from '@/store/sign-in/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [UserMutationTypes.SET_TOKEN]: (state, payload) => {
    const encodedCredentials = window.btoa(`${payload.email}:${payload.password}`);
    const currentUser = {
      email: state.user?.email,
      token: `Basic ${encodedCredentials}`,
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
  },
};
