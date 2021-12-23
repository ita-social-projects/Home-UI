import { MutationTree } from 'vuex';
import { AuthorizationStateInterface, AuthMutationEnum, Mutations } from '@/store/authorization/types';

export const mutations: MutationTree<AuthorizationStateInterface> & Mutations = {
  [AuthMutationEnum.SET_USER]: (state, payload) => {
    state.user = payload;
  },

  [AuthMutationEnum.SET_FORM]: (state, payload) => {
    state.user = { ...state.user, ...payload };
  },

  [AuthMutationEnum.ADD_CONTACT]: (state, payload) => {
    if (state.user!.contacts !== undefined) {
      state.user!.contacts.push(payload);
    }
  },

  [AuthMutationEnum.UPDATE_CONTACT]: (state, payload) => {
    if (state.user!.contacts !== undefined) {
      const updateContacts = state.user!.contacts.filter((el) => el.id !== payload);
      state.user!.contacts = updateContacts;
    }
  },
};
