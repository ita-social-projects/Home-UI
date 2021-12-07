import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, HousesMutationsEnum, HousesActionsEnum, Actions } from '@/store/houses/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<HousesStateInterface, RootStateInterface> & Actions = {
  [HousesActionsEnum.SET_HOUSES]: ({ commit }) => {
    HTTP.get(`/cooperations/1/houses`).then((r) => {
      commit(HousesMutationsEnum.SET_HOUSES, r.data);
    });
  },
  [HousesActionsEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(HousesMutationsEnum.SET_MODAL_DISPLAY, payload);
  },
  [HousesActionsEnum.ADD_HOUSE]: async ({ commit }, payload) => {
    try {
      const { data } = await HTTP.post(`/cooperations/${payload.cooperationId}/houses`, payload);
      commit(HousesMutationsEnum.ADD_HOUSE, data);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [HousesActionsEnum.SET_ADD_HOUSE_MODAL]: ({ commit }, payload) => {
    commit(HousesMutationsEnum.SET_ADD_HOUSE_MODAL, payload);
  },
};
