import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { cooperationStore } from '@/store/cooperation';
import { authorizationStore } from '@/store/authorization';

const state: RootStateInterface = {
  hello: 'hello',
  world: 'world',
};

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cooperationStore,
    authorizationStore,
  },
});
