import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface } from '@/store/authorization/types';
import { getters } from '@/store/authorization/getters';
import { mutations } from '@/store/authorization/mutations';
import { actions } from '@/store/authorization/actions';

export const DefaultStateInterface = {
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  password: '',
  contacts: [],
};

export const state: AuthorizationStateInterface = {
  user: DefaultStateInterface,
};

export const authorizationStore: Module<AuthorizationStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
