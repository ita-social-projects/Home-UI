import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, Getters } from '@/store/houses/types';

export const getters: GetterTree<HousesStateInterface, RootStateInterface> & Getters = {
  getHousesData: (state) => {
    console.log(state.houses);
    return state.houses;
  },
};
