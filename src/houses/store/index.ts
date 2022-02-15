import { Module } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface } from '@/houses/store/types';
import { getters } from '@/houses/store/getters';
import { actions } from '@/houses/store/actions';
import { mutations } from '@/houses/store/mutations';
import { HouseModel } from '@/houses/models/house.model';

export const state: HousesStateInterface = {
  houses: [],
  houseInfo: {} as HouseModel,
};

export const housesStore: Module<HousesStateInterface, RootStateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
