import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { CooperationInterface, Getters } from '@/store/cooperation/types';

export const getters: GetterTree<CooperationInterface, RootStateInterface> & Getters = {
  getHelloWorldTwice: (state) => {
    return `${state.helloWorld}, ${state.helloWorld}`;
  },
};
