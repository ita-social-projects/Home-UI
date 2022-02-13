import { MutationTree } from 'vuex';
import { HousesStateInterface, HousesMutationsEnum, Mutations, HouseInterface } from '@/houses/store/types';
import { HouseModel } from '@/houses/models/house.model';

export const mutations: MutationTree<HousesStateInterface> & Mutations = {
  [HousesMutationsEnum.SET_HOUSES]: (state, payload) => {
    state.houses = payload;
  },
  [HousesMutationsEnum.EDIT_HOUSE]: (state, payload) => {
    state.houseInfo = payload;
    state.houses?.forEach((el: HouseModel) => {
      if (el.id === payload.id) {
        el.flatQuantity = payload.flatQuantity;
        el.houseArea = payload.houseArea;
        el.adjoiningArea = payload.adjoiningArea;
        el.address = payload.address;
      }
    });
  },
  [HousesMutationsEnum.DELETE_HOUSE]: (state, payload) => {
    const updateCont = state.houses?.filter((el: HouseInterface) => el.id !== payload.id);
    state.houses = updateCont;
  },
  [HousesMutationsEnum.GET_HOUSE_BY_ID]: (state, payload) => {
    state.houseInfo = { ...payload };
  },
  [HousesMutationsEnum.ADD_HOUSE]: (state, payload) => {
    state.houses?.push(payload);
  },
};
