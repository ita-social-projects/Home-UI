import { ActionTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import {
  ApartmentsStateInterface,
  ApartmentsMutationsEnum,
  ApartmentsActionsEnum,
  Actions,
} from '@/store/apartments/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<ApartmentsStateInterface, RootStateInterface> & Actions = {
  [ApartmentsActionsEnum.SET_APARTMENTS]: ({ commit }, payload) => {
    HTTP.get(`/houses/${payload}/apartments`).then((r) => {
      commit(ApartmentsMutationsEnum.SET_APARTMENTS, r.data);
    });
  },
  [ApartmentsActionsEnum.DELETE_APARTMENT]: ({ commit }, payload) => {
    HTTP.delete(`/houses/${payload.house_id}/apartments/${payload.apartment_id}`).then(() => {
      commit(ApartmentsMutationsEnum.SET_APARTMENTS);
    });
  },
  [ApartmentsActionsEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(ApartmentsMutationsEnum.SET_MODAL_DISPLAY, payload);
  },
};
