import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { TariffStateInterface } from '@/finance/store/types';
import { actions } from '@/finance/store/actions';
import { mutations } from '@/finance/store/mutations';

export const state: TariffStateInterface = {
  tariffList: [],
  currentTariff: null,
};

export const tariffStore: Module<TariffStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters,
};
