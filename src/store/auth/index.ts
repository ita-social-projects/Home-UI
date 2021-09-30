import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/store/auth/types';
import { getters } from '@/store/auth/getters';
import { mutations } from '@/store/auth/mutations';
import { actions } from '@/store/auth/actions';

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
