import { MutationTree } from 'vuex';
import { HousesStateInterface, HousesMutationsEnum, Mutations, HouseInterface } from '@/store/houses/types';

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
    const updateCont = state.houses?.filter((el: HouseInterface) => el.id !== payload.id);

    console.log('state before MUT', state.houses);
    console.log('updateCont', updateCont);
    state.houses = updateCont;
    console.log('state after MUT', state.houses);
  },
};
