import { createStore } from 'vuex';
import { cooperationModule } from '@/store/cooperationModule';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {},
  modules: {
    c: cooperationModule,
  },
});
