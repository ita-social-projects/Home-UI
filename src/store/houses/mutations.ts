import { MutationTree } from 'vuex';
import { HousesStateInterface, HousesMutationsEnum, Mutations } from '@/store/houses/types';

export const mutations: MutationTree<HousesStateInterface> & Mutations = {
  [HousesMutationsEnum.SET_HOUSES]: (state, payload) => {
    state.houses = payload;
  },
  [HousesMutationsEnum.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
  [HousesMutationsEnum.SET_ADD_HOUSE_MODAL]: (state, payload) => {
    state.displayAddHouseModal = payload;
  },
  [HousesMutationsEnum.ADD_HOUSE]: (state, payload) => {
    state.houses?.push(payload);
  },
};
