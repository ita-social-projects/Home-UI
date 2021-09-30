import { createStore } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { cooperationStore } from '@/store/cooperation';
import { userStore } from '@/store/auth';

const state: RootStateInterface = {
  hello: 'hello',
  world: 'world',
};

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cooperationStore,
    userStore,
  },
});
