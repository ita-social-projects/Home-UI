import { createStore } from 'vuex';
import { cooperationStore } from '@/store/cooperation';
import { userStore } from '@/store/user';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cooperationStore,
    userStore,
  },
});
