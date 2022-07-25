import { MutationTree } from 'vuex';
import { ErrorsStateInterface, ErrorsMutationEnum, Mutations } from '@/store/errors/types';

export const mutations: MutationTree<ErrorsStateInterface> & Mutations = {
  [ErrorsMutationEnum.SET_ERROR]: (state, payload) => {
    state.error = payload;
  },
  [ErrorsMutationEnum.RESET_ERROR]: (state) => {
    state.error.errorMessage = null;
    state.error.errorStatus = null;
  },
};
