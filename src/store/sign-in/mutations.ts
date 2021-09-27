import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes, Mutations } from '@/store/sign-in/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
    // localStorage.setItem('token', JSON.stringify(user));
    // HTTP.defaults.headers.common.Authorization = `Basic ${user?.token}`;
  },
};
