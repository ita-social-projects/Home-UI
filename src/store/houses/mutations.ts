import { MutationTree } from 'vuex';
import { HousesStateInterface, HousesMutationsEnum, Mutations } from '@/store/houses/types';

export const mutations: MutationTree<HousesStateInterface> & Mutations = {
  [HousesMutationsEnum.SET_HOUSES]: (state, payload) => {
    state.houses = payload;
  },
  [HousesMutationsEnum.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
  [HousesMutationsEnum.EDIT_HOUSE]: (state, payload) => {
    state.houses = payload;
  },
  [HousesMutationsEnum.DELETE_HOUSE]: (state, payload) => {
    // const myarray: any = state.houses;
    // myarray.pop();
    // console.log(myarray);
    // state.houses?.pop()
  },
};
