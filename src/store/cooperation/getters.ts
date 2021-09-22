import { GetterTree } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { CooperationInterface } from '@/store/cooperation/types';

export type Getters<S = CooperationInterface> = {
  getHelloWorldTwice(state: S): string;
};

export const getters: GetterTree<CooperationInterface, RootStateInterface> & Getters = {
  getHelloWorldTwice: (state) => {
    return `${state.helloWorld}, ${state.helloWorld}`;
  },
};
