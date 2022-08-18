import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationEnum, Mutations } from '@/user/store/user/types';

export const mutations: MutationTree<UserStateInterface> & Mutations = {
  [UserMutationEnum.SET_ERROR]: (state, errorMessage) => {
    state.error = errorMessage;
  },
  [UserMutationEnum.RESET_ERROR]: (state) => {
    state.error = null;
  },
  [UserMutationEnum.SET_SUCCESS]: (state, successMessage) => {
    state.success = successMessage;
  },
};
