import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { CooperationStateInterface, Getters } from '@/store/cooperation/types';

export const getters: GetterTree<CooperationStateInterface, RootStateInterface> & Getters = {
  getCooperationNameAndEdrpou: (state) => {
    return `Кооперацію ${state.name} зареєстровано з кодом ${state.erdpou}`;
  },
};
