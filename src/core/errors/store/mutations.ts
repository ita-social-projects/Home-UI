import { MutationTree } from 'vuex';
import { ErrorsStateInterface, ErrorsMutationEnum, Mutations } from '@/core/errors/store/types';

export const mutations: MutationTree<ErrorsStateInterface> & Mutations = {
  [ErrorsMutationEnum.SET_ERROR]: (state, payload) => {
    state.errorsList = [
      ...state.errorsList,
      { errorMessage: payload.response?.data.error_message, errorStatus: payload.response?.status },
    ];
  },
};
