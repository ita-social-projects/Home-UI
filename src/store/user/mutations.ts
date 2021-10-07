import { MutationTree } from 'vuex';
import { UserStateInterface, UserMutationTypes, Mutations } from '@/store/user/types';

export const mutations: MutationTree<UserStateInterface> & Mutations = {
  [UserMutationTypes.SET_ERROR]: (state, errorMessage) => {
    state.error = errorMessage;
  },
  [UserMutationTypes.SET_SUCCESS]: (state, successMessage) => {
    state.success = successMessage;
  },
};
