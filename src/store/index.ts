import { createStore } from 'vuex';
import { cooperationStore } from '@/store/cooperation';
import { authorizationStore } from '@/store/authorization';
import { userStore } from '@/store/user';
import { localStorageStore } from '@/store/localstorage';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cooperationStore,
    authorizationStore,
    userStore,
    localStorageStore,
  },
});
