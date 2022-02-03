import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { getters } from '@/store/ownerships/getters';
import { actions } from '@/store/ownerships/actions';
import { mutations } from '@/store/ownerships/mutations';
import { OwnershipsStateInterface } from './types';

export const state: OwnershipsStateInterface = {
  ownerships: [],
};

export const ownershipsStore: Module<OwnershipsStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
