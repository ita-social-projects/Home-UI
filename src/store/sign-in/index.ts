import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { UserStateInterface } from '@/store/sign-in/types';
import { getters } from '@/store/sign-in/getters';
import { mutations } from '@/store/sign-in/mutations';
import { actions } from '@/store/sign-in/actions';

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
