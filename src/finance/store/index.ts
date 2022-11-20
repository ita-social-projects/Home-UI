import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifStateInterface } from '@/finance/store/types';
import { actions } from '@/finance/store/actions';
import { mutations } from '@/finance/store/mutations';

export const state: TarrifStateInterface = {
  tarrifList: [],
  currentTarrif: null,
};

export const tarrifStore: Module<TarrifStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters,
};
