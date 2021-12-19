import { MutationTree } from 'vuex';
import { HousesStateInterface, HousesMutationsEnum, Mutations, HouseInterface } from '@/store/houses/types';

export const mutations: MutationTree<HousesStateInterface> & Mutations = {
  [HousesMutationsEnum.SET_HOUSES]: (state, payload) => {
    state.houses = payload;
  },
  [HousesMutationsEnum.EDIT_HOUSE]: (state, payload) => {
    state.houses?.forEach((el: HouseInterface) => {
      if (el.id === payload.id) {
        el.quantity_flat = payload.quantity_flat;
        el.house_area = payload.house_area;
        el.adjoining_area = payload.adjoining_area;
        el.address = payload.address;
      }
    });
  },
  [HousesMutationsEnum.DELETE_HOUSE]: (state, payload) => {
    const updateCont = state.houses?.filter((el: HouseInterface) => el.id !== payload.id);
    state.houses = updateCont;
  },
  [HousesMutationsEnum.GET_HOUSE_BY_ID]: (state, payload) => {
    state.houseInfo = payload;
  },
  [HousesMutationsEnum.ADD_HOUSE]: (state, payload) => {
    state.houses?.push(payload);
  },
};
