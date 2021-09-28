import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes } from '@/store/sign-in/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
  },
  [UserMutationTypes.SET_TOKEN]: (state, payload) => {
    const encodedCredentials = window.btoa(`${payload.email}:${payload.password}`);
    const AUTH = `Basic ${encodedCredentials}`;
    localStorage.setItem('email', JSON.stringify(state.user?.email));
    localStorage.setItem('token', JSON.stringify(AUTH));
  },
};
