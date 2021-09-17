import { createStore } from 'vuex';
import { cooperationModule } from '@/store/cooperationModule';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules: {
    c: cooperationModule,
  },
});
