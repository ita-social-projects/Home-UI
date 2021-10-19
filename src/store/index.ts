import { createStore } from 'vuex';
import { cooperationStore } from '@/store/cooperation';
import { authorizationStore } from '@/store/authorization';
import { userStore } from '@/store/user';
import { RootStateInterface } from '@/store/types';
import { localStorageStore } from '@/store/localstorage';

export default createStore<RootStateInterface>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    cooperationStore,
    authorizationStore,
    userStore,
    localStorageStore,
  },
});
