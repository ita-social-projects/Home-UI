import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { LocalStorageStateInterface } from '@/store/localstorage/types';
import { getters } from '@/store/localstorage/getters';
import { actions } from '@/store/localstorage/actions';
import { mutations } from '@/store/localstorage/mutations';

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
