import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentsStateInterface } from '@/store/apartments/types';
import { getters } from '@/store/apartments/getters';
import { actions } from '@/store/apartments/actions';
import { mutations } from '@/store/apartments/mutations';

export const state: ApartmentsStateInterface = {
  apartments: [],
};

export const apartmentsStore: Module<ApartmentsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
