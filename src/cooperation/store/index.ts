import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { CooperationStateInterface } from '@/cooperation/store/types';
import { getters } from '@/cooperation/store/getters';
import { mutations } from '@/cooperation/store/mutations';
import { actions } from '@/cooperation/store/actions';

export const state: CooperationStateInterface = {
  userCooperations: [],
  selectedCooperation: null,
};

export const cooperationStore: Module<CooperationStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
