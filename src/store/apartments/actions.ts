import { ActionTree } from 'vuex';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';
import { AddApartmentModel } from '@/store/apartments/models/add-apartment.model';
import { ApartmentDTOModel } from '@/store/apartments/models/apartmentDTO.model';
import { RootStateInterface } from '@/store/types';
import {
  ApartmentsStateInterface,
  ApartmentsMutationsEnum,
  ApartmentsActionsEnum,
  Actions,
} from '@/store/apartments/types';
import { HTTP } from '@/core/api/http-common';

export const actions: ActionTree<ApartmentsStateInterface, RootStateInterface> & Actions = {
  [ApartmentsActionsEnum.SET_APARTMENTS]: async ({ commit }, payload) => {
    try {
      const url = `/houses/${payload}/apartments`;
      const { data } = await HTTP.get(url);
      const apartments: Array<ApartmentModel> = data.map((el: ApartmentDTOModel) => new ApartmentModel(el));
      commit(ApartmentsMutationsEnum.SET_APARTMENTS, apartments);
    } catch (e: any) {
      console.log(e.response);
    }
  },

  [ApartmentsActionsEnum.GET_APARTMENT_BY_ID]: async ({ commit }, payload) => {
    try {
      const url = `/houses/${payload.houseId}/apartments/${payload.apartmentId}`;
      const { data } = await HTTP.get(url);
      const apartment: ApartmentModel = new ApartmentModel(data);
      commit(ApartmentsMutationsEnum.GET_APARTMENT_BY_ID, apartment);
    } catch (e: any) {
      console.log(e.response);
    }
  },

  [ApartmentsActionsEnum.EDIT_APARTMENT]: async ({ commit }, payload) => {
    try {
      const url = `/houses/${payload.houseId}/apartments/${payload.apartmentId}`;
      const { data } = await HTTP.put(url, payload.payloadData);
      const apartment: ApartmentModel = new ApartmentModel(data);
      commit(ApartmentsMutationsEnum.EDIT_APARTMENT, apartment);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [ApartmentsActionsEnum.ADD_APARTMENT]: async ({ commit }, payload) => {
    try {
      await HTTP.post(`/houses/${payload.id}/apartments`, payload).then((r) => {
        const data = new AddApartmentModel(r.data);
        commit(ApartmentsMutationsEnum.ADD_APARTMENT, data);
      });
    } catch (e: any) {
      console.log(e.response);
    }
  },
};
