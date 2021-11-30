import { MutationTree } from 'vuex';
import { AuthorizationStateInterface, AuthMutationEnum, Mutations } from '@/store/authorization/types';

export const mutations: MutationTree<AuthorizationStateInterface> & Mutations = {
  [AuthMutationEnum.SET_USER]: (state, payload) => {
    state.user = payload;
  },

  [AuthMutationEnum.SET_FORM]: (state, payload) => {
    state.user = {
      ...state.user,
      ...payload,
    };
  },
  //
  // [AuthMutationEnum.UPDATE_NAME_USER]: (state, payload) => {
  //   state.user!.first_name = payload;
  // },
  //
  // [AuthMutationEnum.UPDATE_MIDDLE_NAME_USER]: (state, payload) => {
  //   state.user!.middle_name = payload;
  // },
  //
  // [AuthMutationEnum.UPDATE_LAST_NAME_USER]: (state, payload) => {
  //   state.user!.last_name = payload;
  // },
};
