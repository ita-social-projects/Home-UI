import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentsStateInterface } from '@/apartment/store/apartments/types';
import { getters } from '@/apartment/store/apartments/getters';
import { actions } from '@/apartment/store/apartments/actions';
import { mutations } from '@/apartment/store/apartments/mutations';

export const state: ApartmentsStateInterface = {
  apartments: [],
  apartmentInfo: null,
};

export const apartmentsStore: Module<ApartmentsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
