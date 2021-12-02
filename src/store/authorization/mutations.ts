import { MutationTree } from 'vuex';
import { AuthorizationStateInterface, AuthMutationEnum, Mutations } from '@/store/authorization/types';

export const mutations: MutationTree<AuthorizationStateInterface> & Mutations = {
  [AuthMutationEnum.SET_USER]: (state, payload) => {
    state.user = payload;
  },

  [AuthMutationEnum.SET_FORM]: (state, payload) => {
    state.user = { ...state.user, ...payload };
  },

  [AuthMutationEnum.UPDATE_CONTACT]: (state, payload) => {
    state.user!.contacts = payload;
    console.log(state.user);
  },
};
