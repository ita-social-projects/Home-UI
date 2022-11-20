import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TarrifStateInterface } from './types';

export const state: TarrifStateInterface = {
  tarrifList: [],
  newTarrif: null,
};

export const tarrifStore: Module<TarrifStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  // mutations,
  // actions,
  getters,
};
