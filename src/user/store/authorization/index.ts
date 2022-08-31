import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface } from '@/user/store/authorization/types';
import { getters } from '@/user/store/authorization/getters';
import { mutations } from '@/user/store/authorization/mutations';
import { actions } from '@/user/store/authorization/actions';

export const state: AuthorizationStateInterface = {
  user: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    id: 0,
    contacts: [],
  },
};

export const authorizationStore: Module<AuthorizationStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
