import { ActionTree } from 'vuex';
import { ApartmentModel } from '@/store/apartments/models/apartment.model';
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
  [ApartmentsActionsEnum.SET_MODAL_DISPLAY]: ({ commit }, payload) => {
    commit(ApartmentsMutationsEnum.SET_MODAL_DISPLAY, payload);
  },
};
