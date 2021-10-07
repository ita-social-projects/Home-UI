import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes } from '@/store/authorization/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    // console.log(payload)
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
