import { MutationTree } from 'vuex';
import { ApartmentsStateInterface, ApartmentsMutationsEnum, Mutations } from '@/store/apartments/types';

export const mutations: MutationTree<ApartmentsStateInterface> & Mutations = {
  [ApartmentsMutationsEnum.SET_APARTMENTS]: (state, payload) => {
    state.apartments = payload;
  },
  [ApartmentsMutationsEnum.SET_MODAL_DISPLAY]: (state, payload) => {
    state.displayModal = payload;
  },
  [ApartmentsMutationsEnum.SET_SELECTED_APARTMENT_ID]: (state, payload) => {
    state.selected_apartment_id = payload;
  },
};
