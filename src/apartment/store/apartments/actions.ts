import { ActionTree } from 'vuex';
import { ApartmentModel } from '@/apartment/models/apartment.model';
import { AddApartmentDTOModel } from '@/apartment/models/add-apartmentDTO.model';
import { ApartmentDTOModel } from '@/apartment/models/apartmentDTO.model';
import { RootStateInterface } from '@/store/types';
import {
  ApartmentsStateInterface,
  ApartmentsMutationsEnum,
  ApartmentsActionsEnum,
  Actions,
} from '@/apartment/store/apartments/types';
import { HTTP } from '@/core/api/http-common';
import { UpdateApartmentDTOModel } from '../../models/update-upartmentDTO.model';

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

  [ApartmentsActionsEnum.SET_APARTMENT_BY_ID]: async ({ commit }, payload) => {
    try {
      const url = `/houses/${payload.houseId}/apartments/${payload.apartmentId}`;
      const { data } = await HTTP.get(url);
      const apartment: ApartmentModel = new ApartmentModel(data);
      commit(ApartmentsMutationsEnum.SET_APARTMENT_BY_ID, apartment);
    } catch (e: any) {
      console.log(e.response);
    }
  },

  [ApartmentsActionsEnum.EDIT_APARTMENT]: async ({ commit }, payload) => {
    try {
      const url = `/houses/${payload.houseId}/apartments/${payload.apartmentId}`;
      const body = new UpdateApartmentDTOModel(payload.body);
      const { data } = await HTTP.put(url, body);
      const apartment: ApartmentModel = new ApartmentModel(data);
      commit(ApartmentsMutationsEnum.EDIT_APARTMENT, apartment);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [ApartmentsActionsEnum.ADD_APARTMENT]: async ({ commit }, payload) => {
    try {
      const url = `/houses/${payload.houseId}/apartments`;
      const body = new AddApartmentDTOModel(payload.body);
      const { data } = await HTTP.post(url, body);
      const apartment: ApartmentModel = new ApartmentModel(data);
      commit(ApartmentsMutationsEnum.ADD_APARTMENT, apartment);
    } catch (e: any) {
      console.log(e.response);
    }
  },
  [ApartmentsActionsEnum.DELETE_APARTMENT]: async ({ commit }, payload) => {
    try {
      await HTTP.delete(`/houses/${payload.houseId}/apartments/${payload.apartmentId}`);
      commit(ApartmentsMutationsEnum.DELETE_APARTMENT, payload.apartmentId);
    } catch (err: any) {
      console.log('error DELETE_APARTMENT', err);
    }
  },
};
