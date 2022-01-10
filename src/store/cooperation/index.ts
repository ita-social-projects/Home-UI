import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { CooperationStateInterface } from '@/store/cooperation/types';
import { getters } from '@/store/cooperation/getters';
import { mutations } from '@/store/cooperation/mutations';
import { actions } from '@/store/cooperation/actions';

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
