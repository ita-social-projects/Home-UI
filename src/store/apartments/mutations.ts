import { MutationTree } from 'vuex';
import { ApartmentsStateInterface, ApartmentsMutationsEnum, Mutations } from '@/store/apartments/types';
import { ApartmentModel } from './models/apartment.model';
import { OwnerModel } from '@/shared/models/owner.model';

export const mutations: MutationTree<ApartmentsStateInterface> & Mutations = {
  [ApartmentsMutationsEnum.SET_APARTMENTS]: (state, payload) => {
    state.apartments = payload;
  },
  [ApartmentsMutationsEnum.GET_APARTMENT_BY_ID]: (state, payload) => {
    state.apartmentInfo = payload;
  },
  [ApartmentsMutationsEnum.EDIT_APARTMENT]: (state, payload) => {
    state.apartmentInfo = payload;
    state.apartments?.forEach((el: ApartmentModel) => {
      if (el.id === payload.id) {
        el.apartmentNumber = payload.apartmentNumber;
        el.apartmentArea = payload.apartmentArea;
        el.ownerships = payload.ownerships.map((el: OwnerModel) => el);
      }
    });
  },
};
