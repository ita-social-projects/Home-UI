import { createStore } from 'vuex';

import { RootStateInterface } from '@/store/types';
import { cooperationStore, CooperationStore, CooperationInterface } from '@/store/cooperation';

const state: RootStateInterface = {
  hello: 'hello',
  world: 'world',
};

export type Store = CooperationStore<CooperationInterface>;

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cooperationStore,
  },
});
