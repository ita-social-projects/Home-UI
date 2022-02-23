import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentsStateInterface, Getters } from '@/apartment/store/apartments/types';

export const getters: GetterTree<ApartmentsStateInterface, RootStateInterface> & Getters = {
  getApartmentsData: (state) => {
    return state.apartments;
  },
  getApartmentInfo: (state) => {
    return state.apartmentInfo;
  },
};
