import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, Getters } from '@/houses/store/types';

export const getters: GetterTree<HousesStateInterface, RootStateInterface> & Getters = {
  getHousesData: (state) => {
    return state.houses;
  },
  getHouseInfo: (state) => {
    return state.houseInfo;
  },
};
