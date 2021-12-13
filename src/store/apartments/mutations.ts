import { MutationTree } from 'vuex';
import { ApartmentsStateInterface, ApartmentsMutationsEnum, Mutations } from '@/store/apartments/types';

export const mutations: MutationTree<ApartmentsStateInterface> & Mutations = {
  [ApartmentsMutationsEnum.SET_APARTMENTS]: (state, payload) => {
    state.apartments = payload;
  },
  [ApartmentsMutationsEnum.GET_APARTMENT_BY_ID]: (state, payload) => {
    state.apartmentInfo = payload;
  },
};
