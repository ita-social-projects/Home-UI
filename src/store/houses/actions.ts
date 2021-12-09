import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { HousesStateInterface, HousesMutationsEnum, HousesActionsEnum, Actions } from '@/store/houses/types';
import { HTTP } from '@/core/api/http-common';
import { HouseDTOModel } from '@/shared/models/houseDTO.model';

export const actions: ActionTree<HousesStateInterface, RootStateInterface> & Actions = {
  [HousesActionsEnum.SET_HOUSES]: ({ commit }) => {
    HTTP.get(`/cooperations/1/houses`).then((r) => {
      commit(HousesMutationsEnum.SET_HOUSES, r.data);
    });
  },
  [HousesActionsEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(HousesMutationsEnum.SET_MODAL_DISPLAY, payload);
  },
  [HousesActionsEnum.EDIT_HOUSE]: async ({ commit }, payload) => {
    try {
      const payloadtoSend: HouseDTOModel = {
        quantity_flat: payload.quantity_flat,
        house_area: payload.house_area,
        adjoining_area: payload.adjoining_area,
        address: payload.address,
      };
      await HTTP.put(`/cooperations/1/houses/${payload.id}`, payloadtoSend).then((r) => {
        console.log(r.data);
        commit(HousesMutationsEnum.EDIT_HOUSE, r.data);
      });
    } catch (err: any) {
      console.log('error EDIT_HOUSE', err);
    }
  },
  [HousesActionsEnum.DELETE_HOUSE]: async ({ commit }, payload) => {
    try {
      await HTTP.delete(`/cooperations/1/houses/${payload.id}`).then(() => {
        commit(HousesMutationsEnum.DELETE_HOUSE, payload);
      });
    } catch (err: any) {
      console.log('error DELETE_HOUSE', err);
    }
  },
};
