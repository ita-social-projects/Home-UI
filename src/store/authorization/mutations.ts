import { MutationTree } from 'vuex';
import { AuthorizationStateInterface, AuthMutationEnum } from '@/store/authorization/types';

export const mutations: MutationTree<AuthorizationStateInterface> = {
  [AuthMutationEnum.SET_USER]: (state, payload) => {
    state.user = payload;
  },
};
