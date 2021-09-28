import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes } from '@/store/sign-in/types';

export const mutations: MutationTree<UserStateInterface> = {
  [UserMutationTypes.SET_USER]: (state, payload) => {
    state.user = payload;
    console.log(payload);
    localStorage.setItem('email', JSON.stringify(state.user?.email));
  },
};
