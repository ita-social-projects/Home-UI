import { MutationTree } from 'vuex';
import { ApartmentsStateInterface, ApartmentsMutationsEnum, Mutations } from '@/apartment/store/apartments/types';
import { ApartmentModel } from '../../models/apartment.model';
import { OwnershipsModel } from '@/apartment/models/ownerships.model';

export const mutations: MutationTree<ApartmentsStateInterface> & Mutations = {
  [ApartmentsMutationsEnum.SET_APARTMENTS]: (state, payload) => {
    state.apartments = payload;
  },
  [ApartmentsMutationsEnum.SET_APARTMENT_BY_ID]: (state, payload) => {
    state.apartmentInfo = payload;
  },
  [ApartmentsMutationsEnum.EDIT_APARTMENT]: (state, payload) => {
    state.apartmentInfo = payload;
    state.apartments?.forEach((el: ApartmentModel) => {
      if (el.id === payload.id) {
        el.apartmentNumber = payload.apartmentNumber;
        el.apartmentArea = payload.apartmentArea;
        el.ownerships = payload.ownerships?.map((cur: OwnershipsModel) => cur);
      }
    });
  },
  [ApartmentsMutationsEnum.ADD_APARTMENT]: (state, payload) => {
    state.apartments?.push(payload);
  },
  [ApartmentsMutationsEnum.DELETE_APARTMENT]: (state, payload) => {
    const updateCont = state.apartments?.filter((el: ApartmentModel) => el.id !== payload);
    state.apartments = updateCont;
  },
};
