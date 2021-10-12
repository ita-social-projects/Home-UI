import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TokenStateInterface } from '@/store/localstorage/types';
import { getters } from '@/store/localstorage/getters';
import { actions } from '@/store/localstorage/actions';
import { mutations } from '@/store/localstorage/mutations';

export const state: TokenStateInterface = {
  token: null,
};

export const localStorageStore: Module<TokenStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
