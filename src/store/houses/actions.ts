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
        commit(HousesMutationsEnum.SET_HOUSES, r.data);
      });
    } catch (err: any) {
      console.log('error EDIT_HOUSE', err);
    }
  },
  [HousesActionsEnum.DELETE_HOUSE]: async ({ dispatch }, payload) => {
    try {
      await HTTP.delete(`/cooperations/1/houses/${payload}`).then(() => {
        dispatch('SET_HOUSES'); //removed 'housesStore/...' from  dispatch
      });
    } catch (err: any) {
      console.log('error DELETE_HOUSE', err);
    }
  },
};

// нужно НЕ делать диспатч в экшене, а в then  передавать response в мутацию DELETE_HOUSE,
// а там посмотреть что приходит и в этой мутации вызвать SET_HOUSES
// попробовать слушать изменение в сторе через watch
