import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/store/authorization/types';
import { getters } from '@/store/authorization/getters';
import { mutations } from '@/store/authorization/mutations';
import { actions } from '@/store/authorization/actions';

export const state: UserStateInterface = {
  user: null,
};

export const userStore: Module<UserStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { UserStateInterface };
