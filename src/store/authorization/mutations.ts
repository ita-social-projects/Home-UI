import { MutationTree } from 'vuex';
import { AuthorizationStateInterface, AuthMutationEnum, Mutations } from '@/store/authorization/types';

export const mutations: MutationTree<AuthorizationStateInterface> & Mutations = {
  [AuthMutationEnum.SET_USER]: (state, payload) => {
    state.user = payload;
  },
};
