import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface } from '@/store/houses/types';
import { getters } from '@/store/houses/getters';
import { actions } from '@/store/houses/actions';
import { mutations } from '@/store/houses/mutations';

export const state: HousesStateInterface = {
  houses: null,
};

export const housesStore: Module<HousesStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
