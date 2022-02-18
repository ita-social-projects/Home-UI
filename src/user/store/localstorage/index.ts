import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { LocalStorageStateInterface } from '@/user/store/localstorage/types';
import { getters } from '@/user/store/localstorage/getters';
import { actions } from '@/user/store/localstorage/actions';
import { mutations } from '@/user/store/localstorage/mutations';

export const state: LocalStorageStateInterface = {
  token: null,
};

export const localStorageStore: Module<LocalStorageStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
