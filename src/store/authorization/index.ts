import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { AuthorizationStateInterface, UserInterface } from "@/store/authorization/types";
import { getters } from '@/store/authorization/getters';
import { mutations } from '@/store/authorization/mutations';
import { actions } from '@/store/authorization/actions';

export const defaultUser: UserInterface = {
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  id: 0,
  contacts: [],
};

export const state: AuthorizationStateInterface = {
  user: null
};

export const authorizationStore: Module<AuthorizationStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
